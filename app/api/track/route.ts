import { NextRequest, NextResponse } from 'next/server';
import type { Session } from '@/lib/types';

async function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  const { kv } = await import('@vercel/kv');
  return kv;
}

async function geolocate(req: NextRequest) {
  // 1. Try Vercel's built-in geo headers
  const cityRaw = req.headers.get('x-vercel-ip-city');
  const countryCode = req.headers.get('x-vercel-ip-country') || '';
  const lat = parseFloat(req.headers.get('x-vercel-ip-latitude') || '0');
  const lng = parseFloat(req.headers.get('x-vercel-ip-longitude') || '0');

  if (cityRaw && countryCode && lat !== 0) {
    return {
      city: decodeURIComponent(cityRaw),
      country: req.headers.get('x-vercel-ip-country-region') || countryCode,
      countryCode,
      lat,
      lng,
    };
  }

  // 2. Fall back to ipwho.is using the client IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
             req.headers.get('x-real-ip') || '';
  const isLocal = !ip || ip === '127.0.0.1' || ip === '::1';

  if (!isLocal) {
    try {
      const r = await fetch(`https://ipwho.is/${ip}`);
      const d = await r.json();
      if (d.success) {
        return {
          city: d.city || 'Unknown',
          country: d.country || 'Unknown',
          countryCode: d.country_code || '',
          lat: d.latitude || 0,
          lng: d.longitude || 0,
        };
      }
    } catch {}
  }

  return { city: 'Unknown', country: 'Unknown', countryCode: '', lat: 0, lng: 0 };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, page, referrer, device } = body;
    if (!sessionId) return NextResponse.json({ ok: false });

    const kv = await getKv();
    if (!kv) return NextResponse.json({ ok: true });

    const key = `session:${sessionId}`;
    const existing = await kv.get<Session>(key);

    if (existing) {
      const pages = existing.pages.includes(page)
        ? existing.pages
        : [...existing.pages, page];
      await kv.set(key, { ...existing, lastSeen: Date.now(), pages });
      await kv.zadd('sessions', { score: Date.now(), member: sessionId });
    } else {
      const geo = await geolocate(req);
      const session: Session = {
        id: sessionId,
        startedAt: Date.now(),
        lastSeen: Date.now(),
        ...geo,
        pages: [page],
        device: device || 'unknown',
        referrer: referrer || '',
      };
      await kv.set(key, session, { ex: 60 * 60 * 24 * 30 });
      await kv.zadd('sessions', { score: Date.now(), member: sessionId });
      await kv.zremrangebyrank('sessions', 0, -501);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[track]', err);
    return NextResponse.json({ ok: false });
  }
}
