import React from 'react';
import Link from 'next/link';
import { Button } from './button';

export interface MenuProps {
  onClose?: () => void;
  onNavigate?: (section: string) => void;
  onAppointmentClick?: () => void;
  onContactClick?: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  onClose,
  onNavigate,
  onAppointmentClick,
  onContactClick
}) => {
  const navigationItems = ['Home', 'Projects', 'About', 'Contact'];

  // Update theme color when menu opens/closes
  React.useEffect(() => {
    // Store original color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const originalColor = metaThemeColor?.getAttribute('content') || '#f7f7f0';

    // Set dark menu color
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#1E1E1C');
    }

    // Restore original color on unmount
    return () => {
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', originalColor);
      }
    };
  }, []);

  const handleNavigation = (item: string) => {
    if (item === 'Contact' && onContactClick) {
      onContactClick();
    } else {
      onNavigate?.(item.toLowerCase());
    }
  };

  return (
    <div
      className="menu-container"
      style={{
        width: '531px',
        height: 'calc(100vh - 32px)',
        backgroundColor: 'rgba(30, 30, 28, 0.7)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        borderRadius: '8px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <style>
        {`
          .nav-link-button:hover span:first-child {
            transform: translateY(-100%);
          }
          .nav-link-button:hover span:last-child {
            transform: translateY(-100%);
            opacity: 0.7;
          }

          /* Full screen menu for mobile */
          @media (max-width: 768px) {
            .menu-container {
              width: 100vw !important;
              height: 100vh !important;
              border-radius: 0 !important;
              padding: 32px 16px !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
            }

            .menu-svg-border {
              display: none !important;
            }

            .menu-buttons-container {
              flex-direction: column !important;
              align-items: flex-start !important;
            }

            .menu-buttons-container button {
              width: auto !important;
              font-size: 20px !important;
              padding: 16px !important;
            }
          }
        `}
      </style>
      {/* SVG gradient stroke overlay */}
      <svg
        className="menu-svg-border"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="menuStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D1D1D" />
            <stop offset="50%" stopColor="#51514C" />
            <stop offset="100%" stopColor="#1E1E1C" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="8"
          fill="none"
          stroke="url(#menuStroke)"
          strokeWidth="4"
        />
      </svg>
      {/* Top section with navigation and close button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Navigation links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navigationItems.map((item) => {
            if (item === 'Home') {
              return (
                <Link
                  key={item}
                  href="/"
                  className="nav-link-button"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '64px',
                    lineHeight: '1.2',
                    color: 'var(--brand-white)',
                    textTransform: 'capitalize',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-block',
                    height: '77px',
                    textDecoration: 'none'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                </Link>
              );
            }

            if (item === 'Projects') {
              return (
                <Link
                  key={item}
                  href="/projects"
                  className="nav-link-button"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '64px',
                    lineHeight: '1.2',
                    color: 'var(--brand-white)',
                    textTransform: 'capitalize',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-block',
                    height: '77px',
                    textDecoration: 'none'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                </Link>
              );
            }

            if (item === 'About') {
              return (
                <Link
                  key={item}
                  href="/about"
                  className="nav-link-button"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '64px',
                    lineHeight: '1.2',
                    color: 'var(--brand-white)',
                    textTransform: 'capitalize',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-block',
                    height: '77px',
                    textDecoration: 'none'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      display: 'inline-block',
                      transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                    }}
                  >
                    {item}
                  </span>
                </Link>
              );
            }

            return (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Contact' && onContactClick) {
                    onContactClick();
                  } else {
                    onNavigate?.(item.toLowerCase());
                  }
                }}
                className="nav-link-button"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: '64px',
                  lineHeight: '1.2',
                  color: 'var(--brand-white)',
                  textTransform: 'capitalize',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'inline-block',
                  height: '77px'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                  }}
                >
                  {item}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '100%',
                    display: 'inline-block',
                    transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)'
                  }}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          aria-label="Close menu"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              color: 'var(--brand-white)'
            }}
          >
            <path
              d="M24 8L8 24M8 8L24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom section with CTA buttons */}
      <div
        className="menu-buttons-container"
        style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))'
        }}
      >
        <Button variant="primary-white" onClick={onAppointmentClick}>
          Make An Appointment
        </Button>
        <Button variant="whatsapp" onClick={() => window.open('https://wa.me/447305088562', '_blank')}>
          WhatsApp
        </Button>
      </div>
    </div>
  );
};
