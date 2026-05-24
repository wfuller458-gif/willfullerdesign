'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PinPad } from './pin-pad';
import { useSound } from '@/contexts/sound-context';

const PadlockIcon = () => (
  <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="19" width="32" height="21" rx="3" stroke="white" strokeWidth="2.5"/>
    <path d="M10 19V13C10 8.582 13.582 5 18 5s8 3.582 8 8v6" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <circle cx="18" cy="30" r="3" fill="white"/>
    <rect x="16.5" y="30" width="3" height="5" rx="1.5" fill="white"/>
  </svg>
);

export interface Bullet {
  icon?: string;
  text: string;
}

export type BubbleVariant = 'open' | 'locked' | 'coming-soon';

export interface ProjectPreviewProps {
  title: string;
  description: string;
  bullets: Bullet[];
  mainImage: string;
  secondaryImage: string;
  projectLink?: string;
  bubbleVariant?: BubbleVariant;
}

export function ProjectPreview({
  title,
  description,
  bullets,
  mainImage,
  secondaryImage,
  projectLink = '#',
  bubbleVariant,
}: ProjectPreviewProps) {
  const router = useRouter();
  const { playHover, playPinSuccess } = useSound();
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const lerp = 0.12;
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
    setBubblePos({ x: currentPos.current.x, y: currentPos.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    playHover();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovering(true);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <>
      <style>{`
        .pp-wrap {
          width: 100%;
          padding: 0 25px 25px 25px;
          box-sizing: border-box;
          background-color: var(--brand-off-white-100);
          cursor: pointer;
        }

        .pp-rule {
          display: none;
        }

        .pp-text-row {
          display: grid;
          grid-template-columns: 843fr 379fr;
          column-gap: 8px;
          align-items: end;
        }

        .pp-left {
          min-width: 0;
        }

        .pp-title {
          font-family: DM Sans, sans-serif;
          font-weight: 400;
          font-size: 42px;
          line-height: 1.3;
          color: var(--brand-black);
          margin: 0 0 16px 0;
        }

        .pp-description {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.5;
          color: var(--brand-black);
          margin: 0;
          max-width: 600px;
        }

        .pp-bullets {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        .pp-bullet {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 220px;
        }

        .pp-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-bullet-icon-placeholder {
          width: 24px;
          height: 24px;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .pp-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .pp-images {
          margin-top: 50px;
          display: flex;
          gap: 8px;
          height: 559px;
          position: relative;
        }

        .pp-image-main {
          flex: 843;
          border-radius: 4px;
          overflow: hidden;
          background-color: #d9d9d9;
          height: 100%;
        }

        .pp-image-secondary {
          flex: 379;
          border-radius: 4px;
          overflow: hidden;
          background-color: #d9d9d9;
          height: 100%;
        }

        .pp-image-main img,
        .pp-image-secondary img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 1024px) {
          .pp-title { font-size: 32px; }
          .pp-images { height: 420px; }
        }

        @media (max-width: 1024px) {
          .pp-text-row { grid-template-columns: 1fr; gap: 32px; align-items: start; }
          .pp-title { font-size: 32px; }
          .pp-images { height: 300px; }
        }

        @media (max-width: 480px) {
          .pp-wrap { padding: 20px 16px; }
          .pp-title { font-size: 24px; }
          .pp-images { height: 220px; }
        }
      `}</style>

      <div className="pp-wrap" onClick={() => {
        if (bubbleVariant === 'coming-soon') return;
        if (bubbleVariant === 'locked') { setShowPin(true); return; }
        router.push(projectLink);
      }}>

        <hr className="pp-rule" />

        {/* Text row */}
        <div className="pp-text-row">
          {/* Left: title + description */}
          <div className="pp-left">
            <h2 className="pp-title">{title}</h2>
            <p className="pp-description">{description}</p>
          </div>

          {/* Right: bullets */}
          <div className="pp-bullets">
            {bullets.map((bullet, i) => (
              <div key={i} className="pp-bullet">
                {bullet.icon
                  ? <img src={bullet.icon} alt="" className="pp-bullet-icon" style={{ width: 24, height: 24 }} />
                  : <div className="pp-bullet-icon-placeholder" />
                }
                <span className="pp-bullet-text">{bullet.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div
          className="pp-images"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pp-image-main" style={{ backgroundColor: '#D9D9D9', backgroundImage: mainImage ? `url(${mainImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="pp-image-secondary" style={{ backgroundColor: '#D9D9D9', backgroundImage: secondaryImage ? `url(${secondaryImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />

          {/* Cursor bubble */}
          {isHovering && bubbleVariant && (
            <div style={{
              position: 'absolute',
              left: bubblePos.x,
              top: bubblePos.y,
              transform: 'translate(-50%, -50%)',
              width: '144px',
              height: '144px',
              borderRadius: '50%',
              backgroundColor: 'rgba(40, 40, 40, 0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              {bubbleVariant === 'open' && (
                <span style={{ color: 'white', fontSize: '20px', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>
                  Open
                </span>
              )}
              {bubbleVariant === 'locked' && <PadlockIcon />}
              {bubbleVariant === 'coming-soon' && (
                <span style={{ color: 'white', fontSize: '16px', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, textAlign: 'center', lineHeight: 1.4 }}>
                  Coming<br />Soon...
                </span>
              )}
            </div>
          )}
        </div>

      </div>
      {showPin && (
        <PinPad
          projectTitle={title}
          onPin={async (pin) => {
            const res = await fetch('/api/verify-pin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ pin }),
            });
            if (res.ok) { playPinSuccess(); setShowPin(false); router.push(projectLink); }
            else { setPinError(true); setTimeout(() => setPinError(false), 600); }
          }}
          error={pinError}
          onClose={() => setShowPin(false)}
        />
      )}
    </>
  );
}
