'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getSessionId(): string {
  let id = localStorage.getItem('_wf_sid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('_wf_sid', id);
  }
  return id;
}

export function PageTracker() {
  const pathname = usePathname();
  const tracked = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (pathname.startsWith('/analytics')) return;
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    const sessionId = getSessionId();
    const device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, page: pathname, referrer: document.referrer || '', device }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
