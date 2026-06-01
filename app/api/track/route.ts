import { NextRequest, NextResponse } from 'next/server';
import type { Session } from '@/lib/types';

async function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  const { kv } = await import('@vercel/kv');
  return kv;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, page, referrer, device } = body;
    if (!sessionId) return NextResponse.json({ ok: false });

    const kv = await getKv();
    if (!kv) return NextResponse.json({ ok: true }); // dev: silently succeed

    const key = `session:${sessionId}`;
    const existing = await kv.get<Session>(key);

    if (existing) {
      const pages = existing.pages.includes(page)
        ? existing.pages
        : [...existing.pages, page];
      await kv.set(key, { ...existing, lastSeen: Date.now(), pages });
      await kv.zadd('sessions', { score: Date.now(), member: sessionId });
    } else {
      // Vercel injects geo headers automatically — no external API needed
      const cityRaw = req.headers.get('x-vercel-ip-city');
      const geo = {
        city: cityRaw ? decodeURIComponent(cityRaw) : 'Unknown',
        country: req.headers.get('x-vercel-ip-country-region') || req.headers.get('x-vercel-ip-country') || 'Unknown',
        countryCode: req.headers.get('x-vercel-ip-country') || '',
        lat: parseFloat(req.headers.get('x-vercel-ip-latitude') || '0'),
        lng: parseFloat(req.headers.get('x-vercel-ip-longitude') || '0'),
      };

      const session: Session = {
        id: sessionId,
        startedAt: Date.now(),
        lastSeen: Date.now(),
        ...geo,
        pages: [page],
        device: device || 'unknown',
        referrer: referrer || '',
      };

      await kv.set(key, session, { ex: 60 * 60 * 24 * 30 }); // 30-day TTL
      await kv.zadd('sessions', { score: Date.now(), member: sessionId });
      await kv.zremrangebyrank('sessions', 0, -501); // keep last 500
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[track]', err);
    return NextResponse.json({ ok: false });
  }
}
