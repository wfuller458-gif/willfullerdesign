'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
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

const ContactLink = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        cursor: 'pointer'
      }}
    >
      <span style={{
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
      }}>
        Contact
      </span>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
      }}>
        Contact
      </span>
    </div>
  );
};

export interface HeaderProps {
  onMenuClick?: () => void;
  onContactClick?: () => void;
}

export function Header({ onMenuClick, onContactClick }: HeaderProps) {
  const [backgroundColor, setBackgroundColor] = useState('rgba(247,247,240,0.3)');
  const { isMuted, toggleMuted, playHover } = useSound();
  const { animateIn } = useLoading();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hero section is roughly first 100vh, then process section starts
      // Switch to process section color when scrolled past hero
      if (scrollY > window.innerHeight * 0.8) {
        setBackgroundColor('rgba(240,240,233,0.3)');
      } else {
        setBackgroundColor('rgba(247,247,240,0.3)');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
      position: 'relative',
      width: '100%',
      height: '56px',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      backgroundColor,
      transition: 'background-color 300ms ease'
    }}>
      <div style={{
        height: '100%',
        position: 'relative',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Menu Button - Left */}
        <div onClick={onMenuClick} onMouseEnter={playHover} style={{ display: 'flex', alignItems: 'baseline', cursor: 'pointer' }}>
          <Button variant="menu">Menu</Button>
        </div>

        {/* Logo/Name - Center */}
        <p style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          color: 'var(--brand-black)',
          whiteSpace: 'nowrap',
          margin: 0
        }}>
          Will Fuller
        </p>

        {/* Mute + Contact - Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SoundButton isMuted={isMuted} onToggle={toggleMuted} onMouseEnter={playHover} />
          <div onClick={onContactClick} onMouseEnter={playHover} style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            color: 'var(--brand-black)',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}>
            <ContactLink />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
