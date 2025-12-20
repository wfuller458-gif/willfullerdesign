import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, WhatsApp } from './icons';
import { Banner } from './banner';

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
        border: '1px solid var(--brand-black)',
        borderTop: 'none',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        backgroundColor: isHovered ? 'var(--brand-black)' : 'transparent',
        transition: 'background-color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
      }}
    >
      <span style={{
        fontSize: '16px',
        fontWeight: 300,
        color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
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
          color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translate(100%, -100%)' : 'translate(0, 0)'
        }}>
          <ArrowUpRight />
        </div>
        <div style={{
          position: 'absolute',
          color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translate(0, 0)' : 'translate(-100%, 100%)'
        }}>
          <ArrowUpRight />
        </div>
      </span>
    </div>
  );
};

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://wa.me/447305088562', '_blank');
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: 1,
        border: '1px solid var(--brand-black)',
        borderTop: 'none',
        borderLeft: 'none',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: isHovered ? 'var(--brand-whatsapp)' : 'transparent',
        cursor: 'pointer',
        transition: 'background-color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
      }}
    >
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
          color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
        }}>
          <WhatsApp />
        </div>
        <div style={{
          position: 'absolute',
          color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1), color 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
        }}>
          <WhatsApp />
        </div>
      </span>
      <span style={{
        fontSize: '16px',
        fontWeight: 500,
        color: isHovered ? 'var(--brand-white)' : 'var(--brand-black)',
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
          WhatsApp
        </span>
        <span style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'inline-block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
        }}>
          WhatsApp
        </span>
      </span>
    </div>
  );
};

export interface FooterProps {
  year?: string;
  onAppointmentClick?: () => void;
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  year = '2025',
  onAppointmentClick,
  onContactClick
}) => {
  const [currentTime, setCurrentTime] = useState('');

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

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <style>
        {`
          .footer-container {
            width: calc(100% - 32px);
            margin: 0 16px 16px 16px;
            background-color: var(--brand-off-white-200);
            border-radius: 4px;
            overflow: hidden;
            font-family: Inter, sans-serif;
          }

          .footer-top-row {
            display: flex;
          }

          .footer-column {
            flex: 1;
            border: 1px solid var(--brand-black);
            padding: 16px;
            position: relative;
            height: 200px;
          }

          .footer-column-1 {
            border-radius: 4px 0 0 0;
          }

          .footer-column-2 {
            border-left: none;
          }

          .footer-column-3 {
            border-left: none;
            border-radius: 0 4px 0 0;
          }

          .footer-tagline {
            font-size: 20px;
            font-weight: 300;
            color: var(--brand-black);
            line-height: 1.4;
            max-width: 300px;
            font-family: Inter, sans-serif;
          }

          .footer-tagline-italic {
            font-family: Source Serif Pro, serif;
            font-style: italic;
            font-weight: 900;
            font-size: 24px;
          }

          @media (max-width: 900px) {
            .footer-tagline {
              font-size: 18px;
            }

            .footer-tagline-italic {
              font-size: 22px;
            }
          }

          @media (max-width: 600px) {
            .footer-top-row {
              flex-direction: column;
            }

            .footer-column {
              height: auto;
              min-height: 120px;
            }

            .footer-column-1 {
              border-radius: 4px 4px 0 0;
              border-bottom: none;
            }

            .footer-column-2 {
              border-left: 1px solid var(--brand-black);
              border-bottom: none;
            }

            .footer-column-3 {
              border-left: 1px solid var(--brand-black);
              border-radius: 0;
            }

            .footer-tagline {
              font-size: 16px;
              max-width: 100%;
            }

            .footer-tagline-italic {
              font-size: 20px;
            }
          }

          @media (max-width: 480px) {
            .footer-container {
              width: calc(100% - 16px);
              margin: 0 8px 8px 8px;
            }

            .footer-column {
              padding: 12px;
              min-height: 130px;
            }

            .footer-tagline {
              font-size: 14px;
            }

            .footer-tagline-italic {
              font-size: 18px;
            }
          }
        `}
      </style>
      <div className="footer-container">
        {/* Top Row - 3 Columns */}
        <div className="footer-top-row">
        {/* Column 1: Will Fuller + Location + Time */}
        <div className="footer-column footer-column-1">
          <div style={{
            fontSize: '16px',
            fontWeight: 300,
            color: 'var(--brand-black)',
            position: 'absolute',
            top: '16px',
            left: '16px'
          }}>
            Will Fuller
          </div>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--brand-black)',
            lineHeight: '1.5'
          }}>
            <div>Stratford-Upon-Avon</div>
            <div>Warwickshire</div>
            <div>United Kingdom</div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--brand-black)'
          }}>
            {currentTime}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-column footer-column-2" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {['Home', 'Projects', 'About', 'Contact'].map((item) => (
            <NavItem
              key={item}
              label={item}
              href={item === 'Home' ? '/' : item === 'Projects' ? '/projects' : item === 'About' ? '/about' : undefined}
              onClick={item === 'Contact' ? onContactClick : undefined}
            />
          ))}
        </div>

        {/* Column 3: Tagline + Copyright */}
        <div className="footer-column footer-column-3">
          <div className="footer-tagline">
            Digital solutions as refined as the <span className="footer-tagline-italic">machines</span> you love.
          </div>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--brand-black)'
          }}>
            All rights reserved Will Fuller
          </div>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--brand-black)'
          }}>
            ©{year}
          </div>
        </div>
      </div>

      {/* Middle Row - Appointment + WhatsApp */}
      <div style={{ display: 'flex' }}>
        {/* Get In Touch */}
        <GetInTouchButton onClick={onContactClick} />

        {/* WhatsApp */}
        <WhatsAppButton />
      </div>

      {/* Bottom Row - Orange CTA */}
      <div style={{
        border: '1px solid var(--brand-black)',
        borderTop: 'none'
      }}>
        <Banner variant="orange" onAppointmentClick={onAppointmentClick} />
      </div>
    </div>
    </>
  );
};
