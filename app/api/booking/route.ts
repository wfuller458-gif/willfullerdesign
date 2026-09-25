import { NextRequest, NextResponse } from 'next/server';
import { generateSlots, windowEnd } from '@/lib/booking';
import { calendarMode, missingCalendarKeys, createCallEvent, getBusy } from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const note = String(body?.note ?? '').trim();
  const start = String(body?.start ?? '');

  // Honeypot — real users never fill this in
  if (body?.company) return NextResponse.json({ ok: true });

  if (!name || name.length > 100 || !EMAIL.test(email) || email.length > 200 || !note || note.length > 2000) {
    return NextResponse.json({ error: 'Please add your name, email and what you’d like to talk about.' }, { status: 400 });
  }

  const mode = calendarMode();
  if (mode === 'unconfigured') {
    const missing = missingCalendarKeys();
    console.error(`Call booking: missing env vars ${missing.join(', ')}`);
    return NextResponse.json({ error: 'Booking is temporarily unavailable.', missing }, { status: 503 });
  }
  const demo = mode === 'demo';
  const now = Date.now();

  try {
    // Re-check against live availability so a slot can't be double-booked
    const busy = demo ? [] : await getBusy(now, windowEnd(now));
    const available = generateSlots(now, busy).some(d => d.slots.some(s => s.start === start));
    if (!available) {
      return NextResponse.json({ error: 'Sorry, that time has just been taken. Please pick another.' }, { status: 409 });
    }

    if (demo) return NextResponse.json({ ok: true, demo: true });

    const { meetLink } = await createCallEvent({ start: Date.parse(start), name, email, note });
    return NextResponse.json({ ok: true, meetLink });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong booking your call. Please try again.' }, { status: 500 });
  }
}
