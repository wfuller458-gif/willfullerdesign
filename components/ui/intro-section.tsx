'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/contexts/sound-context';

interface Slide {
  stat: string;
  label: string;
}

const slides: Slide[] = [
  { stat: '6+',      label: 'Years of turning complexity into clarity across automotive, healthcare, hospitality and non-profit.' },
  { stat: '100k+',   label: 'Vehicles across 120+ countries shipped with my design every year.' },
  { stat: '30k+',    label: 'Clinicians trained every year through a platform I designed.' },
  { stat: 'Millions',label: 'of customer reviews from Bill\'s, The Alchemist, Giggling Squid and more land in one inbox I designed.' },
  { stat: '1,000+',  label: 'missionaries across 20+ African countries managed through a platform I designed.' },
];

const QUOTE = 'Complex products deserve design as considered as the problem they\'re solving.';
const AUTHOR = 'Will Fuller';
const ROLE = 'Product Designer';

const DURATION = 5000;

const pad = (n: number) => String(n + 1).padStart(2, '0');

export function IntroSection() {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const { playHover } = useSound();

  const next = useCallback(() => setActive(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [active, next]);

  const slide = slides[active];

  return (
    <>
      <style>{`
        @keyframes is-fill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes is-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .is-right-content {
          animation: is-fade-in 0.4s ease forwards;
        }

        .is-wrap {
          display: flex;
          gap: 80px;
          padding: 150px 25px;
          background-color: var(--brand-off-white-100);
          align-items: flex-start;
        }

        .is-left {
          flex-shrink: 0;
          width: 300px;
          display: flex;
          flex-direction: column;
        }

        .is-bar-track {
          width: 100%;
          height: 0.5px;
          background-color: #D9D9D9;
          position: relative;
          border-radius: 1px;
        }

        .is-bar-fill {
          position: absolute;
          top: -0.75px;
          left: 0;
          height: 2px;
          background-color: var(--brand-black);
          animation: is-fill ${DURATION}ms linear forwards;
          border-radius: 1px;
        }

        .is-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
        }

        .is-arrows {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .is-arrow {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--brand-black);
          font-size: 16px;
          line-height: 1;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .is-arrow:hover { opacity: 1; }

        .is-counter {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--brand-black);
          letter-spacing: 0.02em;
        }

        .is-stat {
          font-family: DM Sans, sans-serif;
          font-weight: 400;
          font-size: 64px;
          line-height: 1.3;
          color: var(--brand-black);
          margin: 40px 0 0;
        }

        .is-label {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.5;
          color: var(--brand-black);
          margin: 8px 0 0;
        }

        .is-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
        }

        .is-right-inner {
          max-width: 640px;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .is-quote {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 42px;
          line-height: 1.3;
          color: var(--brand-black);
          margin: 0;
        }

        .is-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .is-photo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #D9D9D9;
          flex-shrink: 0;
          object-fit: cover;
        }

        .is-author-name {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          color: var(--brand-black);
          margin: 0;
        }

        .is-author-role {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--brand-black);
          opacity: 0.6;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .is-wrap { gap: 60px; padding: 80px 25px; }
          .is-left { width: 240px; }
          .is-quote { font-size: 32px; }
          .is-stat { font-size: 52px; }
        }

        @media (max-width: 768px) {
          .is-wrap { flex-direction: column; gap: 48px; padding: 60px 25px; }
          .is-left { width: 100%; }
          .is-quote { font-size: 28px; }
          .is-stat { font-size: 48px; margin-top: 24px; }
        }
      `}</style>

      <div className="is-wrap">
        {/* Left panel */}
        <div className="is-left">
          <div className="is-bar-track">
            <div key={active} className="is-bar-fill" />
          </div>

          <div className="is-nav">
            <div className="is-arrows">
              <button className="is-arrow" onClick={prev} onMouseEnter={playHover} aria-label="Previous"><img src="/icons/arrow-left.svg" alt="Previous" width={20} height={20} /></button>
              <button className="is-arrow" onClick={next} onMouseEnter={playHover} aria-label="Next"><img src="/icons/arrow-right.svg" alt="Next" width={20} height={20} /></button>
            </div>
            <span className="is-counter">{pad(active)} / {pad(total - 1)}</span>
          </div>

          <div key={active} className="is-right-content">
            <p className="is-stat">{slide.stat}</p>
            <p className="is-label">{slide.label}</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="is-right">
          <div className="is-right-inner">
            <p className="is-quote">{QUOTE}</p>
            <div className="is-author">
              <div className="is-photo" />
              <div>
                <p className="is-author-name">{AUTHOR}</p>
                <p className="is-author-role">{ROLE}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
