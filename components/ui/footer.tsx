'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from './icons';
import { useSound } from '@/contexts/sound-context';
import { usePanel } from '@/contexts/panel-context';

const NavItem = ({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover } = useSound();

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
        onMouseEnter={() => { setIsHovered(true); playHover(); }}
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
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      style={commonStyle}
    >
      {content}
    </div>
  );
};

const GetInTouchButton = ({ onClick }: { onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover } = useSound();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
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
          Get in touch
        </span>
        <span style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'inline-block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
        }}>
          Get in touch
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
  const { setOpenPanel } = usePanel();
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
    borderTop: '0.5px solid #9C9C9C',
    borderBottom: '0.5px solid #9C9C9C',
    borderLeft: '0.5px solid #9C9C9C',
    borderRight: '0.5px solid #9C9C9C',
    padding: '16px',
    position: 'relative',
    height: '180px',
    fontFamily: 'Inter, sans-serif'
  };

  return (
    <>
      <style>{`
        .footer-wrap {
          width: 100%;
          background-color: var(--brand-off-white-200);
          overflow: hidden;
          display: flex;
        }

        .footer-col {
          flex: 1;
          border: 0.5px solid #9C9C9C;
          padding: 16px;
          position: relative;
          height: 180px;
          font-family: Inter, sans-serif;
          box-sizing: border-box;
        }

        .footer-col + .footer-col {
          border-left: none;
        }

        .footer-col-cta {
          padding: 0;
          display: flex;
        }

        @media (max-width: 768px) {
          .footer-wrap { flex-wrap: wrap; }

          .footer-col-cta {
            order: -1;
            flex: 0 0 100%;
            border-left: 0.5px solid #9C9C9C;
            height: 120px;
          }

          .footer-col-nav,
          .footer-col-info {
            flex: 1;
            border-top: none;
          }

          .footer-col-info {
            border-left: none;
          }
        }
      `}</style>

      <div className="footer-wrap">
        {/* Left — nav + copyright */}
        <div className="footer-col footer-col-nav" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem label="Home" href="/" />
          <NavItem label="Projects" href="/projects" />
          <NavItem label="About" onClick={() => setOpenPanel('about')} />
          <NavItem label="Resume" onClick={() => setOpenPanel('resume')} />
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

        {/* Middle — Get in touch */}
        <div className="footer-col footer-col-cta">
          <GetInTouchButton onClick={onContactClick} />
        </div>

        {/* Right — name, address, time */}
        <div className="footer-col footer-col-info">
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
            <div>Stratford-Upon-Avon, UK</div>
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
    </>
  );
};
