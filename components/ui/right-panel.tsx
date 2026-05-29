'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSound } from '@/contexts/sound-context';

interface RightPanelProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export function RightPanel({ title, onClose, children }: RightPanelProps) {
  const { playSelect } = useSound();
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = () => { playSelect(); onClose(); };

  const updateThumb = useCallback(() => {
    const scroll = scrollRef.current;
    const thumb = thumbRef.current;
    const panel = panelRef.current;
    if (!scroll || !thumb || !panel) return;
    const panelH = panel.clientHeight;
    const { scrollTop, scrollHeight, clientHeight } = scroll;
    const thumbH = Math.max((clientHeight / scrollHeight) * panelH, 32);
    const maxScroll = scrollHeight - clientHeight;
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * (panelH - thumbH) : 0;
    thumb.style.height = `${thumbH}px`;
    thumb.style.top = `${thumbTop}px`;
    thumb.style.opacity = scrollHeight > clientHeight ? '1' : '0';
  }, []);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    updateThumb();
    scroll.addEventListener('scroll', updateThumb, { passive: true });
    const ro = new ResizeObserver(updateThumb);
    ro.observe(scroll);
    if (scrollRef.current) ro.observe(scrollRef.current.firstElementChild as Element);
    return () => { scroll.removeEventListener('scroll', updateThumb); ro.disconnect(); };
  }, [updateThumb]);

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
        .right-panel-scroll::-webkit-scrollbar { display: none; }
        .right-panel-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        @media (max-width: 768px) {
          .right-panel { width: 100% !important; }
          .right-panel-fixed-header { padding-top: max(32px, env(safe-area-inset-top, 32px)) !important; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000 }}
        onClick={handleOverlayClick}
      />

      {/* Panel */}
      <div ref={panelRef} className="right-panel" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '45%',
        height: '100vh',
        backgroundColor: 'rgba(30, 30, 28, 0.7)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 10001,
        overflow: 'hidden',
      }}>
        {/* Fixed header — lives outside the scroll container */}
        <div className="right-panel-fixed-header" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 10,
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

        {/* Scroll container — native scrollbar hidden, mask clips content at header line */}
        <div
          ref={scrollRef}
          className="right-panel-scroll"
          style={{
            position: 'absolute', inset: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            zIndex: 9,
            maskImage: 'linear-gradient(to bottom, transparent 96px, black 112px)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 96px, black 112px)',
          }}
        >
          <div style={{ padding: '131px 32px 48px 32px' }}>
            {children}
          </div>
        </div>

        {/* Custom scrollbar — full panel height, above mask and header */}
        <div style={{
          position: 'absolute',
          top: 0, right: '4px',
          width: '3px',
          height: '100%',
          zIndex: 20,
          pointerEvents: 'none',
        }}>
          <div
            ref={thumbRef}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '3px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255,255,255,0.25)',
              opacity: 0,
              transition: 'opacity 150ms ease',
            }}
          />
        </div>
      </div>
    </>
  );
}
