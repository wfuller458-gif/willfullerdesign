'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from './icons';

const NavItem = ({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      <span style={{
        display: 'inline-block',
        whiteSpace: 'nowrap',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
      }}>
        {label}
      </span>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
      }}>
        {label}
      </span>
    </>
  );

  const commonStyle = {
    fontSize: '16px',
    fontWeight: 300,
    color: 'var(--brand-black)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
    display: 'inline-block',
    width: 'fit-content',
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none'
  };

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={commonStyle}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={commonStyle}
    >
      {content}
    </div>
  );
};

const GetInTouchButton = ({ onClick }: { onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        backgroundColor: isHovered ? '#E0EADB' : 'transparent',
        transition: 'background-color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
      }}
    >
      <span style={{
        fontSize: '16px',
        fontWeight: 300,
        color: isHovered ? '#008E24' : 'var(--brand-black)',
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        transition: 'color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
      }}>
        <span style={{
          display: 'inline-block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
        }}>
          Get In Touch
        </span>
        <span style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'inline-block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
        }}>
          Get In Touch
        </span>
      </span>
      <span style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px'
      }}>
        <div style={{
          position: 'absolute',
          color: isHovered ? '#008E24' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translate(100%, -100%)' : 'translate(0, 0)'
        }}>
          <ArrowUpRight />
        </div>
        <div style={{
          position: 'absolute',
          color: isHovered ? '#008E24' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translate(0, 0)' : 'translate(-100%, 100%)'
        }}>
          <ArrowUpRight />
        </div>
      </span>
    </div>
  );
};

export interface FooterProps {
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const [currentTime, setCurrentTime] = useState('');
  const year = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const colBase: React.CSSProperties = {
    flex: 1,
    border: '0.5px solid #9C9C9C',
    padding: '16px',
    position: 'relative',
    height: '180px',
    fontFamily: 'Inter, sans-serif'
  };

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--brand-off-white-200)',
      overflow: 'hidden',
      display: 'flex'
    }}>
      {/* Left — nav + copyright */}
      <div style={{ ...colBase, display: 'flex', flexDirection: 'column', gap: '8px', borderRadius: '0' }}>
        {['Home', 'Projects', 'About'].map((item) => (
          <NavItem
            key={item}
            label={item}
            href={item === 'Home' ? '/' : item === 'Projects' ? '/projects' : '/about'}
          />
        ))}
        <span style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--brand-black)'
        }}>
          ©{year}
        </span>
      </div>

      {/* Middle — Get In Touch */}
      <div style={{ ...colBase, borderLeft: 'none', padding: 0, display: 'flex' }}>
        <GetInTouchButton onClick={onContactClick} />
      </div>

      {/* Right — name, address, time */}
      <div style={{ ...colBase, borderLeft: 'none', borderRadius: '0' }}>
        <span style={{ fontSize: '16px', fontWeight: 300, color: 'var(--brand-black)' }}>
          Will Fuller
        </span>
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--brand-black)',
          lineHeight: '1.6'
        }}>
          <div>Stratford-Upon-Avon</div>
          <div>Warwickshire</div>
          <div>United Kingdom</div>
        </div>
        <span style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontSize: '12px',
          fontWeight: 300,
          color: 'var(--brand-black)'
        }}>
          {currentTime}
        </span>
      </div>
    </div>
  );
};
