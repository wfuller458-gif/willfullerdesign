import React from 'react';
import { Button } from './button';

export interface SuccessMessageProps {
  title?: string;
  message?: string | React.ReactNode;
  onClose?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = 'Your appointment is booked!',
  message,
  onClose
}) => {
  const defaultMessage = (
    <>
      Thanks for scheduling with us.
      <br />
      <br />
      Your appointment is confirmed for <strong>[Date]</strong> at <strong>[Time].</strong>
      <br />
      <br />
      A confirmation email has been sent to you — please check your inbox, and if you don't see it, be sure to check your junk or spam folder.
    </>
  );

  return (
    <div
      className="success-message-container"
      style={{
        width: '531px',
        height: 'calc(100vh - 32px)',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .success-message-container {
              width: 100vw !important;
              height: 100vh !important;
              border-radius: 0 !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
            }

            .success-message-background {
              border-radius: 0 !important;
            }

            .success-message-svg {
              display: none !important;
            }

            .success-message-title {
              font-size: 40px !important;
            }
          }
        `}
      </style>
      {/* Background with blur */}
      <div
        className="success-message-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(30, 30, 28, 0.7)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '8px',
          pointerEvents: 'none'
        }}
      />

      {/* SVG gradient stroke overlay */}
      <svg
        className="success-message-svg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="successStroke" x1="0%" y1="0%" x2="0%" y2="100%">
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
          stroke="url(#successStroke)"
          strokeWidth="4"
        />
      </svg>

      {/* Scrollable content wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'auto',
          zIndex: 1,
          gap: '32px'
        }}
      >
        {/* Header with title and close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            flexShrink: 0
          }}
        >
          <h1
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '64px',
              lineHeight: '1',
              color: 'var(--brand-white)',
              textTransform: 'capitalize',
              margin: 0,
              letterSpacing: 0,
              flexGrow: 1
            }}
          >
            {title}
          </h1>

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
              flexShrink: 0
            }}
            aria-label="Close success message"
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

        {/* Message text */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '140%',
            color: 'var(--brand-white)',
            letterSpacing: 0,
            flex: 1,
            minHeight: 0
          }}
        >
          {message || defaultMessage}
        </div>

        {/* Close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            flexShrink: 0
          }}
        >
          <button
            onClick={onClose}
            className="group"
            style={{
              border: '1px solid var(--brand-white)',
              borderRadius: '100px',
              padding: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '20px',
              color: 'var(--brand-white)',
              lineHeight: 'normal',
              letterSpacing: 0,
              transition: 'background-color 200ms'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Animated text */}
            <span className="relative overflow-hidden inline-block whitespace-nowrap">
              <span className="inline-block whitespace-nowrap transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full">
                Close
              </span>
              <span className="absolute inset-0 inline-block whitespace-nowrap translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0">
                Close
              </span>
            </span>

            {/* Animated X icon */}
            <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
