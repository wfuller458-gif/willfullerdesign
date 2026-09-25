'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { Footer } from '@/components/ui/footer';
import { RecommendationCarousel } from '@/components/ui/recommendation-carousel';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { IntroSection } from '@/components/ui/intro-section';
import { CollaborationSection } from '@/components/ui/collaboration-section';
import { PinPad } from '@/components/ui/pin-pad';

const handleContact = () => {
  window.location.href = 'mailto:willfullerdesign@gmail.com';
};

export default function Freelance() {
  const router = useRouter();
  const [showUnlockPin, setShowUnlockPin] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Auto-open PIN pad when redirected from a protected page or triggered by carousel
  useEffect(() => {
    if (window.location.search.includes('unlock=training-platform')) {
      setShowUnlockPin(true);
      window.history.replaceState({}, '', '/freelance');
    }
    const handler = () => setShowUnlockPin(true);
    window.addEventListener('unlock-training-platform', handler);
    return () => window.removeEventListener('unlock-training-platform', handler);
  }, []);

  const handleUnlockPin = useCallback(async (pin: string) => {
    const res = await fetch('/api/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      setTimeout(() => { setShowUnlockPin(false); router.push('/projects/training-platform'); }, 700);
      return true;
    }
    setPinError(true);
    setTimeout(() => setPinError(false), 600);
    return false;
  }, [router]);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          onContactClick={handleContact}
          contactLabel="Book a free call"
        />
      </div>

      {/* Hero Section */}
      <HeroSection onContactClick={handleContact} buttonText="Book a free call" taglines={['Designer & Developer']} showCarouselTooltip={false} />

      {/* Intro Text */}
      <style>
        {`
          .intro-text-section {
            margin: 0 auto;
            padding: 150px 90px;
          }

          .intro-text {
            font-family: DM Sans, sans-serif;
            font-weight: 300;
            font-size: 42px;
            line-height: 130%;
            color: var(--brand-black);
            text-align: center;
          }

          /* Tablet and below */
          @media (max-width: 1024px) {
            .intro-text-section {
              padding: 100px 40px;
            }

            .intro-text {
              font-size: 28px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .intro-text-section {
              padding: 40px 24px;
            }

            .intro-text {
              font-size: 22px;
            }
          }

          /* Small mobile */
          @media (max-width: 480px) {
            .intro-text-section {
              padding: 32px 16px;
            }

            .intro-text {
              font-size: 18px;
            }
          }
        `}
      </style>
      <IntroSection quote="I design refined digital experiences that reflect the quality of what you deliver, for premium service brands whose reputation has outgrown their website." />

      <CollaborationSection />

      <TestimonialsSection />

      {/* Footer */}
      <Footer onContactClick={handleContact} contactLabel="Book a free call" showProjects={false} />

      <style>
        {`
          .overlay-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1000;
            padding: 0;
          }
        `}
      </style>

      {/* Training Platform PIN gate */}
      {showUnlockPin && (
        <PinPad
          projectTitle="Training Platform"
          onPin={handleUnlockPin}
          error={pinError}
          onClose={() => setShowUnlockPin(false)}
        />
      )}
    </div>
  );
}
