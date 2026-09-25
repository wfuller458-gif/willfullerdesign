import { NextResponse } from 'next/server';
import { BOOKING, generateSlots, todayKey, windowEnd } from '@/lib/booking';
import { calendarMode, getBusy } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = Date.now();
  const mode = calendarMode();
  if (mode === 'unconfigured') {
    console.error('Call booking: GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN not set');
    return NextResponse.json({ error: 'Booking is temporarily unavailable.' }, { status: 503 });
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
