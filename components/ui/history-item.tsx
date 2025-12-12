"use client";

import { useState, useEffect } from "react";
import { TooltipLarge } from "./tooltip-large";
import { ChevronDown, ChevronUp } from "./icons";

export interface HistoryItemProps {
  date: string;
  company: string;
  tooltipDescription?: string;
  tooltipImages?: [string, string] | [string, string, string];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function HistoryItem({ date, company, tooltipDescription, tooltipImages, isExpanded = false, onToggle }: HistoryItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [useAccordion, setUseAccordion] = useState(false);

  useEffect(() => {
    // Check if touch device or small screen
    const checkAccordionMode = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 900;
      setUseAccordion(isTouchDevice || isSmallScreen);
    };

    checkAccordionMode();
    window.addEventListener('resize', checkAccordionMode);
    return () => window.removeEventListener('resize', checkAccordionMode);
  }, []);

  const handleClick = () => {
    if (useAccordion && tooltipDescription && tooltipImages && onToggle) {
      onToggle();
    }
  };

  const showActive = useAccordion ? isExpanded : isHovered;

  return (
    <>
      <style>
        {`
          .history-item {
            position: relative;
            width: 100%;
            height: 106px;
            overflow: visible;
          }

          .history-date {
            position: absolute;
            left: 16px;
            top: 32px;
            font-size: 32px;
            line-height: 1.3;
            white-space: nowrap;
          }

          .history-company {
            position: absolute;
            left: 268px;
            top: 32px;
            font-size: 32px;
            line-height: 1.3;
            white-space: nowrap;
          }

          .history-dot {
            position: absolute;
            right: 16px;
            top: 37px;
            width: 32px;
            height: 32px;
          }

          .history-tooltip {
            position: absolute;
            top: 106px;
            left: 268px;
            right: 16px;
            z-index: 50;
          }

          .history-accordion {
            width: calc(100% + 1px);
            margin-left: -0.5px;
            background-color: var(--brand-black);
            padding: 16px;
            overflow: hidden;
            transition: max-height 500ms cubic-bezier(0.16, 1.2, 0.3, 1);
          }

          .history-accordion-content {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .history-accordion-description {
            font-size: 16px;
            line-height: 1.3;
            color: var(--brand-white);
          }

          .history-accordion-images {
            display: flex;
            gap: 8px;
          }

          .history-accordion-image {
            flex: 1;
            aspect-ratio: 1;
            min-width: 0;
          }

          @media (max-width: 900px) {
            .history-item {
              height: 90px;
            }

            .history-date {
              top: 28px;
              font-size: 28px;
              left: 12px;
            }

            .history-company {
              left: 220px;
              top: 28px;
              font-size: 28px;
            }

            .history-dot {
              top: 31px;
              right: 12px;
              width: 28px;
              height: 28px;
            }

            .history-tooltip {
              top: 90px;
              left: 220px;
              right: 16px;
            }
          }

          @media (max-width: 600px) {
            .history-item {
              height: 75px;
            }

            .history-date {
              top: 22px;
              font-size: 18px;
              left: 12px;
            }

            .history-company {
              left: 140px;
              top: 22px;
              font-size: 18px;
            }

            .history-dot {
              top: 24px;
              right: 12px;
              width: 24px;
              height: 24px;
            }

            .history-tooltip {
              top: 75px;
              left: 140px;
              right: 16px;
            }
          }

          @media (max-width: 480px) {
            .history-item {
              height: 65px;
            }

            .history-date {
              top: 18px;
              font-size: 14px;
              left: 8px;
            }

            .history-company {
              left: 110px;
              top: 18px;
              font-size: 14px;
            }

            .history-dot {
              top: 19px;
              right: 8px;
              width: 24px;
              height: 24px;
            }

            .history-tooltip {
              top: 65px;
              left: 110px;
              right: 16px;
            }
          }
        `}
      </style>
      <div
        className="history-item"
        style={{
          backgroundColor: showActive ? 'var(--brand-off-white-400)' : 'var(--brand-off-white-200)',
          borderBottom: '0.5px solid var(--brand-off-white-300)',
          borderLeft: '0.5px solid var(--brand-off-white-300)',
          borderRight: '0.5px solid var(--brand-off-white-300)',
          cursor: useAccordion && tooltipDescription ? 'pointer' : 'default',
        }}
        onMouseEnter={() => !useAccordion && setIsHovered(true)}
        onMouseLeave={() => !useAccordion && setIsHovered(false)}
        onClick={handleClick}
      >
      {/* Default Top Border - always visible */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: '0.5px',
          backgroundColor: 'var(--brand-off-white-300)',
        }}
      />

      {/* Animated Black Top Border - swipes in on hover/expand */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: '1px',
          backgroundColor: 'var(--brand-black)',
          transform: showActive ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        }}
      />
      {/* Date */}
      <p
        className="history-date font-display font-light"
        style={{
          color: showActive ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)',
        }}
      >
        {date}
      </p>

      {/* Company */}
      <p
        className="history-company font-display font-light"
        style={{
          color: showActive ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)',
        }}
      >
        {company}
      </p>

      {/* Dot/Chevron Button */}
      <div
        className="history-dot overflow-hidden flex items-center justify-center"
        style={{
          borderRadius: '2px',
          backgroundColor: useAccordion ? 'transparent' : (showActive ? 'var(--brand-black)' : 'transparent'),
          border: useAccordion ? 'none' : (showActive ? 'none' : '1px solid var(--brand-off-white-300)'),
          transition: 'background-color 1000ms cubic-bezier(0.16, 1.2, 0.3, 1), border 1000ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          color: useAccordion ? (showActive ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)') : (showActive ? 'var(--brand-white)' : 'var(--brand-off-white-300)'),
        }}
      >
        {useAccordion ? (
          isExpanded ? <ChevronUp /> : <ChevronDown />
        ) : (
          <div
            className="absolute font-display font-bold flex items-center justify-center"
            style={{
              left: '50%',
              top: '50%',
              transform: showActive ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
              width: '32px',
              height: '32px',
              fontSize: '20px',
              lineHeight: '0',
              transition: 'transform 1000ms cubic-bezier(0.16, 1.2, 0.3, 1)',
            }}
          >
            •
          </div>
        )}
      </div>

      {/* Tooltip - shows on hover for non-accordion mode */}
      {!useAccordion && isHovered && tooltipDescription && tooltipImages && (
        <div
          className="history-tooltip"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 300ms ease-out, transform 300ms ease-out',
          }}
        >
          <TooltipLarge
            description={tooltipDescription}
            images={tooltipImages}
          />
        </div>
      )}
    </div>

    {/* Accordion Panel - shows on click for accordion mode */}
    {useAccordion && isExpanded && tooltipDescription && tooltipImages && (
      <div
        className="history-accordion font-display font-light"
        style={{
          maxHeight: isExpanded ? '1000px' : '0',
          padding: isExpanded ? '16px' : '0 16px',
        }}
      >
        <div className="history-accordion-content">
          <p className="history-accordion-description">
            {tooltipDescription}
          </p>
          <div className="history-accordion-images">
            {tooltipImages.map((src, index) => (
              <div key={index} className="history-accordion-image">
                <img
                  src={src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
