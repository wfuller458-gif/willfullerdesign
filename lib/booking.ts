// Call booking rules and slot generation. All wall-clock times are UK time.

export const BOOKING = {
  timeZone: 'Europe/London',
  durationMin: 30,
  bufferMin: 15,
  minNoticeHours: 24,
  maxDaysAhead: 28,
  // Day of week (0 = Sun … 6 = Sat) → [first start, last end] in minutes after midnight
  hours: {
    1: [17 * 60, 21 * 60],
    2: [17 * 60, 21 * 60],
    3: [17 * 60, 21 * 60],
    4: [17 * 60, 21 * 60],
    5: [17 * 60, 21 * 60],
    6: [9 * 60, 12 * 60],
  } as Record<number, [number, number]>,
};

export interface Slot {
  start: string; // ISO UTC
  label: string; // e.g. "5:30pm"
}

export interface BookingDay {
  date: string; // YYYY-MM-DD (UK)
  slots: Slot[];
}

export interface Busy {
  start: number; // epoch ms
  end: number;
}

const partsFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: BOOKING.timeZone,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hourCycle: 'h23',
});

function zonedParts(ts: number) {
  const p: Record<string, number> = {};
  for (const { type, value } of partsFormatter.formatToParts(new Date(ts))) {
    if (type !== 'literal') p[type] = Number(value);
  }
  return { y: p.year, m: p.month, d: p.day, hour: p.hour, minute: p.minute, second: p.second };
}

function offsetMs(ts: number) {
  const p = zonedParts(ts);
  return Date.UTC(p.y, p.m - 1, p.d, p.hour, p.minute, p.second) - Math.floor(ts / 1000) * 1000;
}

// UK wall-clock time → epoch ms (handles BST/GMT)
function zonedToUtc(y: number, m: number, d: number, minutes: number) {
  const guess = Date.UTC(y, m - 1, d, 0, minutes);
  const utc = guess - offsetMs(guess);
  return guess - offsetMs(utc);
}

const pad = (n: number) => String(n).padStart(2, '0');

function formatLabel(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h % 12 || 12}:${pad(m)}${h < 12 ? 'am' : 'pm'}`;
}

export function todayKey(now: number) {
  const p = zonedParts(now);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`;
}

export function windowEnd(now: number) {
  return now + (BOOKING.maxDaysAhead + 1) * 24 * 60 * 60 * 1000;
}

export function generateSlots(now: number, busy: Busy[]): BookingDay[] {
  const earliest = now + BOOKING.minNoticeHours * 60 * 60 * 1000;
  const buffer = BOOKING.bufferMin * 60 * 1000;
  const duration = BOOKING.durationMin * 60 * 1000;
  const today = zonedParts(now);
  const days: BookingDay[] = [];

  for (let i = 0; i <= BOOKING.maxDaysAhead; i++) {
    const day = new Date(Date.UTC(today.y, today.m - 1, today.d + i));
    const hours = BOOKING.hours[day.getUTCDay()];
    if (!hours) continue;
    const [y, m, d] = [day.getUTCFullYear(), day.getUTCMonth() + 1, day.getUTCDate()];
    const slots: Slot[] = [];

    for (let mins = hours[0]; mins + BOOKING.durationMin <= hours[1]; mins += BOOKING.durationMin) {
      const start = zonedToUtc(y, m, d, mins);
      if (start < earliest) continue;
      const clash = busy.some(b => start - buffer < b.end && start + duration + buffer > b.start);
      if (!clash) slots.push({ start: new Date(start).toISOString(), label: formatLabel(mins) });
    }

    if (slots.length) days.push({ date: `${y}-${pad(m)}-${pad(d)}`, slots });
  }

  return days;
}
