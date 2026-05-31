'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { ProjectPreview } from '@/components/ui/project-preview';
import { Footer } from '@/components/ui/footer';
import { RecommendationCarousel } from '@/components/ui/recommendation-carousel';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { IntroSection } from '@/components/ui/intro-section';
import { CollaborationSection } from '@/components/ui/collaboration-section';
import { PinPad } from '@/components/ui/pin-pad';

const handleContact = () => {
  window.location.href = 'mailto:willfullerdesign@gmail.com';
};

export default function Home() {
  const router = useRouter();
  const [showUnlockPin, setShowUnlockPin] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Auto-open PIN pad when redirected from a protected page or triggered by carousel
  useEffect(() => {
    if (window.location.search.includes('unlock=training-platform')) {
      setShowUnlockPin(true);
      window.history.replaceState({}, '', '/');
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
        />
      </div>

      {/* Hero Section */}
      <HeroSection onContactClick={handleContact} />

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

          .selected-works-header {
            padding: 0 25px;
            margin-top: 150px;
            scroll-margin-top: 72px;
          }

          .project-previews-list {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 100px;
            margin-top: 100px;
          }

          @media (max-width: 1024px) {
            .selected-works-header { margin-top: 100px; }
            .project-previews-list { gap: 60px; margin-top: 60px; }
          }

          @media (max-width: 768px) {
            .selected-works-header { margin-top: 60px; }
            .project-previews-list { gap: 40px; margin-top: 40px; }
          }

          @media (max-width: 480px) {
            .selected-works-header { margin-top: 40px; padding-left: 16px; padding-right: 16px; }
            .project-previews-list { gap: 24px; margin-top: 24px; }
          }
        `}
      </style>
      <IntroSection />

      <CollaborationSection />

      {/* Selected Works header */}
      <div id="selected-works" className="selected-works-header">
        <hr style={{ border: 'none', borderTop: '0.5px solid #9C9C9C', margin: '0 0 25px 0' }} />
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 32, lineHeight: 1.2, color: '#BBB7B4', margin: 0, whiteSpace: 'nowrap' }}>
          Selected works
        </h2>
      </div>

      {/* Project Previews */}
      <div className="project-previews-list">
        <ProjectPreview
          title="Off-Road Controls"
          description="Off-road capability is at the heart of what makes a Defender a Defender. I led the UX for upcoming models unifying cameras, terrain systems and new features into a cockpit experience as capable and refined as the vehicle itself."
          bullets={[
            { text: 'Designed next generation Defender off-road experience', icon: '/icons/Design.svg' },
            { text: 'UX ownership of every off-road feature', icon: '/icons/car-profile.svg' },
            { text: 'Unified physical controls and digital feedback', icon: '/icons/toggle-left.svg' },
          ]}
          mainImage="/images/projects/off-road-controls/image-1.webp" secondaryImage="/images/projects/off-road-controls/image-2.webp" projectLink="#" bubbleVariant="coming-soon"
        />
        <ProjectPreview
          title="Feed It Back"
          description="The existing platform was fragmented, slow with users adopting workarounds. I redesigned it into a single, condensed inbox handling every review, every case from every channel for some of the UK's biggest restaurant chains."
          bullets={[
            { text: 'The inbox receives millions of reviews', icon: '/icons/Chat.svg' },
            { text: 'Multi million investment secured after platform overhaul', icon: '/icons/£.svg' },
            { text: "Feed It Back's platform continues to grow", icon: '/icons/Grow.svg' },
          ]}
          mainImage="/images/projects/feed-it-back/image-1.webp" secondaryImage="/images/projects/feed-it-back/image-2.webp" projectLink="/projects/feed-it-back" bubbleVariant="open"
        />
        <ProjectPreview
          title="Driver Displays"
          description="Designed future digital driver displays for Land Rover vehicles, with a focus on cognitive load and attention management. Also responsible for maintaining and updating existing displays to ensure continued saleability across global markets."
          bullets={[
            { text: 'Designs delivered for 120+ markets to 100,000+ vehicles', icon: '/icons/Globe.svg' },
            { text: 'Integrated Apple CarPlay and Android Auto', icon: '/icons/Apple.svg' },
            { text: 'Designed next generation driver displays', icon: '/icons/Design.svg' },
          ]}
          mainImage="/images/projects/driver-displays/image-1.webp" secondaryImage="/images/projects/driver-displays/image-2.webp" projectLink="#" bubbleVariant="coming-soon"
        />
        <ProjectPreview
          title="Training Platform"
          description="A healthcare training provider delivered Continuing Professional Development (CPD) entirely in person. I designed the platform that took it fully digital now training 30,000 clinicians every year."
          bullets={[
            { text: '30,000 clinicians supported annually through the platform', icon: '/icons/Users.svg' },
            { text: 'Enabling professionals to complete training digitally', icon: '/icons/Test.svg' },
            { text: 'In person to fully digital offering', icon: '/icons/Internet.svg' },
          ]}
          mainImage="/images/projects/training-platform/image-1.webp" secondaryImage="/images/projects/training-platform/image-2.webp" projectLink="/projects/training-platform" bubbleVariant="locked"
        />
        <ProjectPreview
          title="Trick Trainer"
          description="Trick recognition tool that uses pose detection to detect when my dog has completed a command. The goal is to eventually have it entertain him autonomously. Its a passion project and dog enrichment experiment."
          bullets={[
            { text: 'Machine learning and pose detection models', icon: '/icons/Pose.svg' },
            { text: 'Using AI tools to bring my concepts to life', icon: '/icons/AI.svg' },
            { text: 'Proof of concept build completed', icon: '/icons/Build.svg' },
          ]}
          mainImage="/images/projects/trick-trainer/image-1.webp" secondaryImage="/images/projects/trick-trainer/image-2.webp" projectLink="#" bubbleVariant="coming-soon"
        />
      </div>

      <TestimonialsSection />

      {/* Footer */}
      <Footer onContactClick={handleContact} />

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
