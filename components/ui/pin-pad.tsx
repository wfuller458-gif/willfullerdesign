'use client';

import { useState, useEffect, useCallback } from 'react';

interface PinPadProps {
  projectTitle: string;
  correctPin: string;
  onSuccess: () => void;
  onClose: () => void;
}

const BUTTONS = ['1','2','3','4','5','6','7','8','9','clr','0','del'];

export function PinPad({ projectTitle, correctPin, onSuccess, onClose }: PinPadProps) {
  const [entered, setEntered] = useState('');
  const [shake, setShake] = useState(false);
  const [solved, setSolved] = useState(false);
  const pinLength = correctPin.length;

  const press = useCallback((val: string) => {
    if (shake || solved) return;
    if (val === 'clr') { setEntered(''); return; }
    if (val === 'del') { setEntered(e => e.slice(0, -1)); return; }
    if (entered.length >= pinLength) return;
    const next = entered + val;
    setEntered(next);
    if (next.length === pinLength) {
      if (next === correctPin) {
        setSolved(true);
        setTimeout(onSuccess, 500);
      } else {
        setShake(true);
        setTimeout(() => { setEntered(''); setShake(false); }, 550);
      }
    }
  }, [entered, shake, solved, pinLength, correctPin, onSuccess]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') press(e.key);
      else if (e.key === 'Backspace') press('del');
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [press, onClose]);

  return (
    <>
      <style>{`
        .pin-btn {
          cursor: pointer;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: white;
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 200ms ease;
          user-select: none;
          -webkit-user-select: none;
        }
        .pin-btn:hover { background-color: rgba(255,255,255,0.08); }
        .pin-btn:active { background-color: rgba(255,255,255,0.18); }
        .pin-btn-action { color: rgba(255,255,255,0.45) !important; font-size: 16px !important; letter-spacing: 0.05em; }

        @keyframes pin-shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          35% { transform: translateX(10px); }
          55% { transform: translateX(-10px); }
          75% { transform: translateX(8px); }
        }
        .pin-shake { animation: pin-shake 0.5s ease; }

        @keyframes pin-in {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .pin-panel { animation: pin-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 200 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div className="pin-panel" style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '420px',
        height: '100vh',
        backgroundColor: 'rgba(30, 30, 28, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px 40px 56px',
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '18px', cursor: 'pointer', padding: 0, lineHeight: 1, marginBottom: '56px', display: 'block' }}
          >
            ✕
          </button>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '13px', margin: '0 0 10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Enter PIN to access
          </p>
          <h2 style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '30px', margin: 0, lineHeight: 1.15 }}>
            {projectTitle}
          </h2>
        </div>

        {/* PIN dots */}
        <div
          className={shake ? 'pin-shake' : ''}
          style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
        >
          {Array.from({ length: pinLength }).map((_, i) => (
            <div key={i} style={{
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              backgroundColor: i < entered.length
                ? solved ? '#008E24' : 'white'
                : 'transparent',
              border: `1.5px solid ${i < entered.length ? (solved ? '#008E24' : 'white') : 'rgba(255,255,255,0.3)'}`,
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
            }} />
          ))}
        </div>

        {/* Number grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', justifyItems: 'center' }}>
          {BUTTONS.map((btn) => (
            <button
              key={btn}
              className={`pin-btn${btn === 'clr' || btn === 'del' ? ' pin-btn-action' : ''}`}
              onClick={() => press(btn)}
            >
              {btn === 'del' ? '⌫' : btn === 'clr' ? 'CLR' : btn}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
