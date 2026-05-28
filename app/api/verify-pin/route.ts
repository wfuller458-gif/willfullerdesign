import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { pin } = await req.json();
  const correct = process.env.PROJECT_PIN;
  if (!correct) return NextResponse.json({ ok: false }, { status: 500 });
  if (pin !== correct) return NextResponse.json({ ok: false }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  // Session-only cookie — no maxAge/expires means it's deleted when the browser closes
  res.cookies.set('tp-auth', 'granted', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });
  return res;
}
