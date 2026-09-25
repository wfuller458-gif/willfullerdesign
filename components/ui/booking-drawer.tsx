'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSound } from '@/contexts/sound-context';
import type { BookingDay, Slot } from '@/lib/booking';

// Left drawer for booking a call — styled to match the PIN pad drawer

interface BookingDrawerProps {
  onClose: () => void;
}

type Step = 'date' | 'time' | 'details' | 'done';

const COLS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// YYYY-MM-DD helpers, done in UTC so they're independent of the visitor's timezone
const parseKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const toKey = (date: Date) => date.toISOString().slice(0, 10);
const formatDay = (key: string, opts: Intl.DateTimeFormatOptions) =>
  parseKey(key).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts });

// Corner radius for a cell in a grid so the outer corners are rounded like the PIN pad
const cornerRadius = (i: number, count: number, cols: number) => {
  const rows = Math.ceil(count / cols);
  const row = Math.floor(i / cols);
  const col = i % cols;
  const r = '30px';
  const tl = row === 0 && col === 0 ? r : '0';
  const tr = row === 0 && col === cols - 1 ? r : '0';
  const bl = row === rows - 1 && col === 0 ? r : '0';
  const br = row === rows - 1 && col === cols - 1 ? r : '0';
  return `${tl} ${tr} ${br} ${bl}`;
};

// Time grid: only the top row is rounded — the back button closes off the bottom
const topCorners = (i: number) => (i === 0 ? '30px 0 0 0' : i === 2 ? '0 30px 0 0' : '0');

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="bk-btn-wrap">
      <span className="bk-btn-label">{children}</span>
      <span className="bk-btn-label-dup" aria-hidden>{children}</span>
    </span>
  );
}

export function BookingDrawer({ onClose }: BookingDrawerProps) {
  const { playHover, playSelect, playPinSuccess, playPinError } = useSound();
  const [step, setStep] = useState<Step>('date');
  const [days, setDays] = useState<BookingDay[] | null>(null);
  const [today, setToday] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const res = await fetch('/api/booking/availability', { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDays(data.days);
      setToday(data.today);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const byDate = useMemo(() => new Map((days ?? []).map(d => [d.date, d.slots])), [days]);

  // Mon–Sat calendar cells from this week's Monday to the last bookable day
  const cells = useMemo(() => {
    if (!today) return [];
    const start = parseKey(today);
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    const last = days?.length ? parseKey(days[days.length - 1].date) : parseKey(today);
    const out: string[] = [];
    for (const d = new Date(start); d <= last || out.length % 6 !== 0; d.setUTCDate(d.getUTCDate() + 1)) {
      if (d.getUTCDay() !== 0) out.push(toKey(d));
    }
    return out;
  }, [today, days]);

  const monthRange = useMemo(() => {
    if (!cells.length) return '';
    const first = formatDay(cells[0], { month: 'long' });
    const last = formatDay(cells[cells.length - 1], { month: 'long' });
    return first === last ? first : `${first} – ${last}`;
  }, [cells]);

  const slots = date ? byDate.get(date) ?? [] : [];

  const go = (next: Step) => { setError(null); setStep(next); };

  const fail = (message: string) => {
    playPinError();
    setError(message);
    setShake(true);
    setTimeout(() => setShake(false), 550);
  };

  const submit = async () => {
    if (submitting || !slot) return;
    if (!name.trim()) return fail('Please add your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return fail('Please add a valid email address.');
    if (!note.trim()) return fail('Please tell me a little about your project.');
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start: slot.start, name, email, note, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) {
          setSlot(null);
          setStep('time');
          load();
        }
        fail(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      playPinSuccess();
      setStep('done');
    } catch {
      fail('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const eyebrow = {
    date: 'Step 1 of 3 · Choose a day',
    time: 'Step 2 of 3 · Choose a time',
    details: 'Step 3 of 3 · Your details',
    done: 'Booked',
  }[step];

  const summary = date
    ? `${formatDay(date, { weekday: 'long', day: 'numeric', month: 'long' })}${slot && step !== 'time' ? `, ${slot.label}` : ''}`
    : '';

  return (
    <>
      <style>{`
        .bk-btn {
          cursor: pointer;
          width: 100%;
          height: 72px;
          border-radius: 0;
          border: 0.5px solid rgba(255, 255, 255, 0.35);
          background: transparent;
          color: white;
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 200ms ease, color 200ms ease;
          user-select: none;
          -webkit-user-select: none;
          box-sizing: border-box;
          padding: 0;
        }
        .bk-btn:hover:not(:disabled) { background-color: rgba(255,255,255,0.08); }
        .bk-btn:active:not(:disabled) { background-color: rgba(255,255,255,0.18); }
        .bk-btn:disabled { cursor: default; color: rgba(255,255,255,0.2); }
        .bk-btn-selected, .bk-btn-selected:hover:not(:disabled) { background-color: white; color: #1e1e1c; }
        .bk-btn-action { color: rgba(255,255,255,0.45); font-size: 16px; letter-spacing: 0.05em; }
        .bk-btn-primary { font-size: 18px; }

        .bk-btn-wrap { position: relative; overflow: hidden; display: inline-block; line-height: 1.1; }
        .bk-btn-label { display: block; transition: transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1); }
        .bk-btn-label-dup {
          position: absolute; top: 0; left: 0; right: 0; text-align: center;
          transform: translateY(100%);
          transition: transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1);
        }
        .bk-btn:hover:not(:disabled) .bk-btn-label { transform: translateY(-100%); }
        .bk-btn:hover:not(:disabled) .bk-btn-label-dup { transform: translateY(0); }

        .bk-col-head {
          color: rgba(255,255,255,0.45);
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-align: center;
          padding-bottom: 10px;
        }

        .bk-field {
          width: 100%;
          box-sizing: border-box;
          border: 0.5px solid rgba(255, 255, 255, 0.35);
          background: transparent;
          color: white;
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 20px;
          padding: 22px 28px;
          outline: none;
          border-radius: 0;
          transition: background-color 200ms ease;
          resize: none;
        }
        .bk-field::placeholder { color: rgba(255,255,255,0.45); }
        .bk-field:focus { background-color: rgba(255,255,255,0.08); }
        .bk-field:-webkit-autofill {
          -webkit-text-fill-color: white;
          transition: background-color 5000s ease-in-out 0s;
        }

        .bk-muted {
          color: rgba(255,255,255,0.45);
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.5;
          margin: 0;
        }

        @keyframes bk-shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          35% { transform: translateX(10px); }
          55% { transform: translateX(-10px); }
          75% { transform: translateX(8px); }
        }
        .bk-shake { animation: bk-shake 0.5s ease; }

        @keyframes bk-in {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes bk-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bk-panel { animation: bk-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .bk-step { animation: bk-fade 0.35s ease; }

        @media (max-width: 560px) {
          .bk-panel { width: 100% !important; padding: 24px 16px !important; }
          .bk-btn { height: 60px; font-size: 18px; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200 }}
        onClick={() => { playSelect(); onClose(); }}
      />

      {/* Panel */}
      <div className="bk-panel" role="dialog" aria-label="Book a free call" style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '531px',
        height: '100dvh',
        backgroundColor: 'rgba(30, 30, 28, 0.7)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '32px',
        padding: '32px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '13px', margin: '0 0 10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {eyebrow}
            </p>
            <h2 style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '30px', margin: 0, lineHeight: 1.15 }}>
              {step === 'done' ? "You're booked in" : 'Book a free call'}
            </h2>
          </div>
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

        {/* Middle — context for the current step */}
        <div key={`ctx-${step}`} className="bk-step" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {step === 'date' && (
            <>
              <p style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '24px', lineHeight: 1.3, margin: 0 }}>
                A 30 minute video call on Google Meet to talk through your project.
              </p>
              <p className="bk-muted">
                {loadError ? "Couldn't load availability." : !days ? 'Checking availability…' : days.length ? 'Pick a day that suits you.' : 'No times available right now. Please check back soon.'}
              </p>
            </>
          )}
          {(step === 'time' || step === 'details') && (
            <>
              <p style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '24px', lineHeight: 1.3, margin: 0 }}>
                {summary}
              </p>
              <p className="bk-muted">30 minutes · Google Meet · Times in UK time</p>
            </>
          )}
          {step === 'done' && (
            <>
              <p style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '24px', lineHeight: 1.3, margin: 0 }}>
                {summary}
              </p>
              <p className="bk-muted">
                A calendar invite with the Google Meet link is on its way to {email.trim()}. Looking forward to speaking with you.
              </p>
            </>
          )}
        </div>

        {/* Bottom — interactive grid for the current step */}
        <div key={`grid-${step}`} className={`bk-step${shake ? ' bk-shake' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <p className="bk-muted" style={{ color: '#FF8A7A' }} role="alert">{error}</p>
          )}

          {step === 'date' && (
            <div>
              <p className="bk-col-head" style={{ textAlign: 'left', paddingBottom: '16px' }}>{monthRange}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {COLS.map(c => <div key={c} className="bk-col-head">{c}</div>)}
                {loadError ? (
                  <button
                    className="bk-btn bk-btn-action"
                    style={{ gridColumn: '1 / -1', borderRadius: '30px' }}
                    onMouseEnter={playHover}
                    onClick={() => { playSelect(); load(); }}
                  >
                    <Label>TRY AGAIN</Label>
                  </button>
                ) : (cells.length ? cells : Array.from({ length: 24 }, (_, i) => `loading-${i}`)).map((key, i, all) => {
                  const loading = key.startsWith('loading');
                  const available = !loading && byDate.has(key);
                  const dayNum = loading ? '' : String(parseKey(key).getUTCDate());
                  return (
                    <button
                      key={key}
                      className={`bk-btn${date === key ? ' bk-btn-selected' : ''}`}
                      style={{ borderRadius: cornerRadius(i, all.length, 6) }}
                      disabled={!available}
                      aria-label={loading ? undefined : formatDay(key, { weekday: 'long', day: 'numeric', month: 'long' })}
                      onMouseEnter={available ? playHover : undefined}
                      onClick={() => { playSelect(); setDate(key); setSlot(null); go('time'); }}
                    >
                      <Label>{dayNum}</Label>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'time' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {slots.map((s, i) => (
                <button
                  key={s.start}
                  className={`bk-btn${slot?.start === s.start ? ' bk-btn-selected' : ''}`}
                  style={{ borderRadius: topCorners(i) }}
                  onMouseEnter={playHover}
                  onClick={() => { playSelect(); setSlot(s); go('details'); }}
                >
                  <Label>{s.label}</Label>
                </button>
              ))}
              {/* Pad the last row so the back button spans a full row */}
              {Array.from({ length: 3 - (slots.length % 3 || 3) }).map((_, i) => (
                <div key={`pad-${i}`} className="bk-btn" style={{ cursor: 'default', borderRadius: topCorners(slots.length + i) }} />
              ))}
              <button
                className="bk-btn bk-btn-action"
                style={{ gridColumn: '1 / -1', borderRadius: '0 0 30px 30px' }}
                onMouseEnter={playHover}
                onClick={() => { playSelect(); go('date'); }}
              >
                <Label>BACK</Label>
              </button>
            </div>
          )}

          {step === 'details' && (
            <form
              onSubmit={e => { e.preventDefault(); playSelect(); submit(); }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <input
                className="bk-field"
                style={{ borderRadius: '30px 30px 0 0' }}
                placeholder="Your name"
                aria-label="Your name"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={100}
                autoFocus
              />
              <input
                className="bk-field"
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                maxLength={200}
              />
              <textarea
                className="bk-field"
                rows={3}
                placeholder="What would you like to talk about?"
                aria-label="What would you like to talk about?"
                value={note}
                onChange={e => setNote(e.target.value)}
                maxLength={2000}
              />
              {/* Honeypot */}
              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={company}
                onChange={e => setCompany(e.target.value)}
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
                <button
                  type="button"
                  className="bk-btn bk-btn-action"
                  style={{ borderRadius: '0 0 0 30px' }}
                  onMouseEnter={playHover}
                  onClick={() => { playSelect(); go('time'); }}
                >
                  <Label>BACK</Label>
                </button>
                <button
                  type="submit"
                  className="bk-btn bk-btn-primary"
                  style={{ borderRadius: '0 0 30px 0' }}
                  disabled={submitting}
                  onMouseEnter={playHover}
                >
                  <Label>{submitting ? 'Booking…' : 'Book call'}</Label>
                </button>
              </div>
            </form>
          )}

          {step === 'done' && (
            <button
              className="bk-btn bk-btn-action"
              style={{ borderRadius: '30px' }}
              onMouseEnter={playHover}
              onClick={() => { playSelect(); onClose(); }}
            >
              <Label>CLOSE</Label>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
