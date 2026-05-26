'use client';

import { useEffect } from 'react';
import { useSound } from '@/contexts/sound-context';

interface RightPanelProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export function RightPanel({ title, onClose, children }: RightPanelProps) {
  const { playSelect } = useSound();

  const handleOverlayClick = () => { playSelect(); onClose(); };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes panel-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .right-panel { animation: panel-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200 }}
        onClick={handleOverlayClick}
      />

      {/* Panel */}
      <div className="right-panel" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '45%',
        height: '100vh',
        backgroundColor: 'rgba(30, 30, 28, 0.7)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 201,
        overflow: 'hidden',
      }}>
        {/* Fixed header — lives outside the scroll container */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 10,
          backgroundColor: 'rgba(30, 30, 28, 0.95)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          padding: '32px 32px 0 32px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '32px' }}>
            <h2 style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '30px', margin: 0, lineHeight: 1.15 }}>
              {title}
            </h2>
            <button
              onClick={() => { playSelect(); onClose(); }}
              style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              aria-label="Close"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--brand-white)' }}>
                <path d="M24 8L8 24M8 8L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.25)', margin: 0 }} />
        </div>

        {/* Scroll container — starts below the fixed header */}
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overscrollBehavior: 'contain', zIndex: 11 }}>
          <div style={{ padding: '112px 32px 48px 32px' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
