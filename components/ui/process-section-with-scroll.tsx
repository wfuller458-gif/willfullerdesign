'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProcessSection } from './process-section';
import { Banner } from './banner';

export interface ProcessSectionWithScrollProps {
  onAppointmentClick?: () => void;
}

export const ProcessSectionWithScroll: React.FC<ProcessSectionWithScrollProps> = ({ onAppointmentClick }) => {
  const [activeProcess, setActiveProcess] = useState<'Strategy' | 'Design' | 'Development' | 'Support'>('Strategy');
  const [contentOpacity, setContentOpacity] = useState(1);
  const [progressWidth, setProgressWidth] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const processes = ['Strategy', 'Design', 'Development', 'Support'] as const;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only update if section is in viewport (started scrolling into it)
      if (rect.top <= 0 && rect.bottom > 0) {
        // Calculate how far through the section we've scrolled (0 to 1)
        const scrolled = Math.abs(rect.top);
        const totalHeight = containerRef.current.offsetHeight - viewportHeight;
        const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1);

        // Map progress to process index (0-3)
        const processIndex = Math.min(Math.floor(progress * 4), 3);
        setActiveProcess(processes[processIndex]);

        // Calculate progress within current segment (0-1)
        const segmentProgress = (progress * 4) % 1;

        // Calculate opacity - fade out during transitions
        // 0-0.2: fade out (1 to 0)
        // 0.2-0.8: full opacity (1)
        // 0.8-1: fade out (1 to 0)
        let opacity = 1;
        if (segmentProgress < 0.2) {
          opacity = 1 - (segmentProgress / 0.2);
        } else if (segmentProgress > 0.8) {
          opacity = 1 - ((segmentProgress - 0.8) / 0.2);
        }
        setContentOpacity(opacity);

        // Calculate progress bar width (100% to 0%)
        // progress goes from 0 to 1, so width goes from 100 to 0
        const width = Math.max(0, Math.min(100, 100 * (1 - progress)));
        setProgressWidth(width);
      } else if (rect.top > 0) {
        // Section hasn't started yet - show full progress bar
        setActiveProcess('Strategy');
        setContentOpacity(1);
        setProgressWidth(100);
      } else if (rect.bottom <= 0) {
        // Section completely scrolled past - hide progress bar
        setProgressWidth(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '400vh', // 4x viewport height for smooth scrolling through 4 processes
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 0
        }}
      >
        <div style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'var(--brand-off-white-200)',
          overflow: 'hidden',
          minHeight: 0
        }}>
          <ProcessSection
            defaultProcess={activeProcess}
            disableHover={true}
            contentOpacity={contentOpacity}
          />
        </div>
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--brand-off-white-200)',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: `${progressWidth}%`,
              height: '100%',
              backgroundColor: 'var(--brand-black)',
              transition: 'width 0.1s ease-out'
            }}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          <Banner
            text="Let's make it a reality 2025! Request a free initial consultation now."
            variant="orange"
            onAppointmentClick={onAppointmentClick}
          />
        </div>
      </div>
    </div>
  );
};
