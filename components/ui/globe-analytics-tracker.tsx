'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const API_KEY = 'ga_cam3oT_I7v5cuubloj6ZOeMZbaSslGFr';
const ENDPOINT = 'https://globe-analytics-90h6dus5o-will-fullers-projects.vercel.app/api/track';
const SESSION_KEY = '_ga_sid';
const SESSION_TS_KEY = '_ga_ts';
const SESSION_TTL = 30 * 60 * 1000;

function getSessionId(): string {
  const now = Date.now();
  const ts = parseInt(localStorage.getItem(SESSION_TS_KEY) || '0', 10);
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid || now - ts > SESSION_TTL) {
    sid = Math.random().toString(36).slice(2) + now.toString(36);
    localStorage.setItem(SESSION_KEY, sid);
  }
  localStorage.setItem(SESSION_TS_KEY, String(now));
  return sid;
}

export function GlobeAnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: API_KEY,
        sessionId: getSessionId(),
        page: pathname,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
