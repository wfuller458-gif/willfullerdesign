'use client';

import { useState, useEffect } from "react";
import { Button } from "./button";

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
    <header style={{
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
        <div onClick={onMenuClick} style={{ display: 'flex', alignItems: 'baseline', cursor: 'pointer' }}>
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

        {/* Contact Link - Right */}
        <div onClick={onContactClick} style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '16px',
          color: 'var(--brand-black)',
          whiteSpace: 'nowrap',
          cursor: 'pointer'
        }}>
          <ContactLink />
        </div>
      </div>
    </header>
  );
}
