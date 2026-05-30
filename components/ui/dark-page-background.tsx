'use client';

import { useEffect } from 'react';

export function DarkPageBackground() {
  useEffect(() => {
    document.body.style.backgroundColor = '#1e1e1c';
    document.documentElement.style.backgroundColor = '#1e1e1c';
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return null;
}
