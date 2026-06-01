import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const auth = req.cookies.get('analytics-auth');
  if (auth?.value !== 'granted') return NextResponse.json({ ok: false }, { status: 401 });

  const { sessionId } = await req.json();
  if (!sessionId || !process.env.KV_REST_API_URL) return NextResponse.json({ ok: false });

  const { kv } = await import('@vercel/kv');
  await kv.del(`session:${sessionId}`);
  await kv.zrem('sessions', sessionId);

  return NextResponse.json({ ok: true });
}
