'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

const ArrowsIcon = () => (
  <svg width="52" height="16" viewBox="0 0 52 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8H2M2 8L8 2M2 8L8 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 8H50M50 8L44 2M50 8L44 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ScrollHintBubbleProps {
  children: React.ReactNode;
}

export function ScrollHintBubble({ children }: ScrollHintBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });

  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const LERP = 0.12;

  const animate = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * LERP;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * LERP;
    setBubblePos({ x: currentPos.current.x, y: currentPos.current.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    setIsVisible(true);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            left: bubblePos.x,
            top: bubblePos.y,
            transform: 'translate(-50%, -50%)',
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: 'rgba(40, 40, 40, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <ArrowsIcon />
        </div>
      )}
    </div>
  );
}
