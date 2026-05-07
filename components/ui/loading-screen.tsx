'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/contexts/loading-context';

const NAME = 'Will Fuller';
const STAGGER = 0.07;       // delay between each letter (s)
const LETTER_DUR = 0.6;     // each letter's rise duration (s)
const HOLD = 600;            // ms to hold after all letters visible
const EXIT_DUR = 1.0;        // screen slide-up duration (s)

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const { triggerAnimateIn } = useLoading();

  // Shuffle evenly-spaced delays so order is random but coverage is uniform
  const delays = useMemo(() => {
    const arr = NAME.split('').map((_, i) => i * STAGGER);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  useEffect(() => {
    // Last letter (rightmost) has delay 0, first letter has max delay
    const maxDelay = (NAME.length - 1) * STAGGER;
    const allVisibleMs = (maxDelay + LETTER_DUR) * 1000;
    const t = setTimeout(() => setExiting(true), allVisibleMs + HOLD);
    return () => clearTimeout(t);
  }, []);

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
              setVisible(false);
              triggerAnimateIn();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000000',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Letter row */}
          <div style={{ display: 'flex' }}>
            {NAME.split('').map((letter, i) => (
                <div
                  key={i}
                  style={{ overflow: 'hidden', display: 'inline-block', lineHeight: 1.15 }}
                >
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: delays[i],
                      duration: LETTER_DUR,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      display: 'inline-block',
                      color: '#ffffff',
                      fontSize: '96px',
                      lineHeight: 1.15,
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 500,
                      whiteSpace: 'pre',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {letter}
                  </motion.span>
                </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
