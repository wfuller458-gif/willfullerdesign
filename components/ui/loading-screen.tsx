'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/loading-context';

const WORDS = ['Will', 'Fuller'];
const WORD_DELAY = 0.35;
const WORD_DUR = 0.4;
const HOLD = 700;
const EXIT_DUR = 1.0;

// Persists for the lifetime of the JS session — resets only on hard refresh
let played = false;

export function LoadingScreen() {
  const pathname = usePathname();
  const { triggerAnimateIn } = useLoading();

  const [visible, setVisible] = useState(() => {
    if (played) return false;
    return pathname === '/';
  });
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(0);

  // If not showing animation, trigger page animations immediately
  useEffect(() => {
    if (!visible) triggerAnimateIn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll lock + exit timer — only runs when animation is active
  useEffect(() => {
    if (!visible) return;
    played = true;
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const allVisibleMs = (WORD_DELAY + WORD_DUR) * 1000;
    const t = setTimeout(() => setExiting(true), allVisibleMs + HOLD);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Counter 0 → 100
  useEffect(() => {
    if (!visible) return;
    const totalMs = (WORD_DELAY + WORD_DUR) * 1000;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / totalMs, 1);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={exiting ? { y: '-100%' } : { y: 0 }}
          transition={exiting
            ? { duration: EXIT_DUR, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (exiting) {
              document.body.style.overflow = '';
              document.documentElement.style.overflow = '';
              setVisible(false);
              triggerAnimateIn();
            }
          }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: '#000000',
            zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Bottom right — counter */}
          <span style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '42px',
            lineHeight: 1,
            color: 'rgba(255, 255, 255, 0.6)',
          }}>
            {count}
          </span>

          {/* Name */}
          <div style={{ display: 'flex', gap: '26px' }}>
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * WORD_DELAY, duration: WORD_DUR, ease: 'easeInOut' }}
                style={{
                  display: 'inline-block',
                  color: '#ffffff',
                  fontSize: '96px',
                  lineHeight: 1.15,
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
