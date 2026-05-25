'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLoading } from "@/contexts/loading-context";
import { useSound } from "@/contexts/sound-context";

const SoundButton = ({ isMuted, onToggle, onMouseEnter }: { isMuted: boolean; onToggle: () => void; onMouseEnter: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = isMuted ? '/icons/Mute.svg' : '/icons/Sound On.svg';
  const label = isMuted ? 'Unmute' : 'Mute';

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => { setIsHovered(true); onMouseEnter(); }}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 0,
        position: 'relative',
        overflow: 'hidden',
        width: 24,
        height: 24,
      }}
    >
      <img
        src={icon}
        alt={label}
        width={24}
        height={24}
        style={{
          display: 'block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
        }}
      />
      <img
        src={icon}
        alt=""
        aria-hidden
        width={24}
        height={24}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
        }}
      />
    </button>
  );
};

const NavLink = ({ label, href, onClick }: { label: string; href?: string; onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playSelect } = useSound();

  const textStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    color: 'var(--brand-black)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const inner = (
    <>
      <span style={{
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
      }}>
        {label}
      </span>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
      }}>
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={textStyle}
        onMouseEnter={() => { setIsHovered(true); playHover(); }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={playSelect}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      style={textStyle}
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => { playSelect(); onClick?.(); }}
    >
      {inner}
    </div>
  );
};

export interface HeaderProps {
  onMenuClick?: () => void;
  onContactClick?: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  const [backgroundColor, setBackgroundColor] = useState('rgba(247,247,240,0.3)');
  const { isMuted, toggleMuted, playHover } = useSound();
  const { animateIn } = useLoading();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setBackgroundColor('rgba(240,240,233,0.3)');
      } else {
        setBackgroundColor('rgba(247,247,240,0.3)');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        height: '56px',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        backgroundColor,
        transition: 'background-color 300ms ease',
      }}
    >
      <div style={{
        height: '100%',
        paddingLeft: '25px',
        paddingRight: '25px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}>
        {/* Left — Will Fuller */}
        <NavLink label="Will Fuller" href="/" />

        {/* Centre — nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <NavLink label="Projects" href="/projects" />
          <NavLink label="About" href="/about" />
          <NavLink label="Resume" href="#" />
        </div>

        {/* Right — sound + contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
          <SoundButton isMuted={isMuted} onToggle={toggleMuted} onMouseEnter={playHover} />
          <NavLink label="Contact" onClick={onContactClick} />
        </div>
      </div>
    </motion.header>
  );
}
