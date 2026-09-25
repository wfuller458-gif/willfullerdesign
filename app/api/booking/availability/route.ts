import { NextResponse } from 'next/server';
import { BOOKING, generateSlots, todayKey, windowEnd } from '@/lib/booking';
import { calendarMode, missingCalendarKeys, getBusy } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = Date.now();
  const mode = calendarMode();
  if (mode === 'unconfigured') {
    const missing = missingCalendarKeys();
    console.error(`Call booking: missing env vars ${missing.join(', ')}`);
    return NextResponse.json({ error: 'Booking is temporarily unavailable.', missing }, { status: 503 });
  }
  const demo = mode === 'demo';
  try {
    const busy = demo ? [] : await getBusy(now, windowEnd(now));
    return NextResponse.json({
      today: todayKey(now),
      durationMin: BOOKING.durationMin,
      days: generateSlots(now, busy),
      demo,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Could not load availability' }, { status: 500 });
  }
}
