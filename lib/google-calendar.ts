// Minimal Google Calendar client (REST + OAuth refresh token). Server-only.
import { BOOKING, type Busy } from './booking';

const cfg = () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
});

export const isCalendarConfigured = () => {
  const c = cfg();
  return Boolean(c.clientId && c.clientSecret && c.refreshToken);
};

// Demo mode (fake bookings) is only allowed locally; in production missing keys are an error
export const calendarMode = (): 'live' | 'demo' | 'unconfigured' =>
  isCalendarConfigured() ? 'live' : process.env.NODE_ENV === 'production' ? 'unconfigured' : 'demo';

let cached: { token: string; expires: number } | null = null;

async function accessToken() {
  if (cached && cached.expires > Date.now() + 60_000) return cached.token;
  const c = cfg();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: c.clientId!,
      client_secret: c.clientSecret!,
      refresh_token: c.refreshToken!,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) throw new Error(`Google token refresh failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  cached = { token: data.access_token, expires: Date.now() + data.expires_in * 1000 };
  return cached.token;
}

export async function getBusy(timeMin: number, timeMax: number): Promise<Busy[]> {
  const res = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timeMin: new Date(timeMin).toISOString(),
      timeMax: new Date(timeMax).toISOString(),
      items: [{ id: cfg().calendarId }],
    }),
  });
  if (!res.ok) throw new Error(`Google freeBusy failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const calendars = Object.values(data.calendars ?? {}) as { busy?: { start: string; end: string }[] }[];
  return calendars.flatMap(c => c.busy ?? []).map(b => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}

export async function createCallEvent(opts: { start: number; name: string; email: string; note: string }) {
  const end = opts.start + BOOKING.durationMin * 60 * 1000;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cfg().calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      summary: `Intro call: ${opts.name} × Will Fuller`,
      description: [
        `Booked via the freelance booking page`,
        `Name: ${opts.name}`,
        `Email: ${opts.email}`,
        opts.note ? `\n${opts.note}` : '',
      ].join('\n'),
      start: { dateTime: new Date(opts.start).toISOString(), timeZone: BOOKING.timeZone },
      end: { dateTime: new Date(end).toISOString(), timeZone: BOOKING.timeZone },
      attendees: [{ email: opts.email, displayName: opts.name }],
      conferenceData: {
        createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Google event insert failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { meetLink: data.hangoutLink as string | undefined };
}
