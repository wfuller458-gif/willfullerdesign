'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { ProjectPreview } from '@/components/ui/project-preview';
import { Footer } from '@/components/ui/footer';
import { RecommendationCarousel } from '@/components/ui/recommendation-carousel';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { IntroSection } from '@/components/ui/intro-section';
import { CollaborationSection } from '@/components/ui/collaboration-section';
import { Menu } from '@/components/ui/menu';

const handleContact = () => {
  window.location.href = 'mailto:will.fuller22@hotmail.com';
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
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
              padding: 150px 40px;
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
      <IntroSection />

      <CollaborationSection />

      {/* Selected Works header */}
      <div style={{ padding: '0 25px', marginTop: 150 }}>
        <hr style={{ border: 'none', borderTop: '0.5px solid #9C9C9C', margin: '0 0 25px 0' }} />
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 32, lineHeight: 1.2, color: '#BBB7B4', margin: 0, whiteSpace: 'nowrap' }}>
          Selected works
        </h2>
      </div>

      {/* Project Previews */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '100px', marginTop: 100 }}>
        <ProjectPreview
          title="Off-Road Controls"
          description="Lead the UX for upcoming Defender models by delivering an off-road experience that unifies cameras, terrain systems and incorporate new features into a seamless, engaging cockpit focused on usability, confidence and adventure."
          bullets={[
            { text: 'Designed next generation Defender off-road experience', icon: '/icons/Design.svg' },
            { text: 'UX ownership of every off-road feature', icon: '/icons/car-profile.svg' },
            { text: 'Unified physical controls and digital feedback', icon: '/icons/toggle-left.svg' },
          ]}
          mainImage="/images/projects/off-road-controls/image-1.webp" secondaryImage="/images/projects/off-road-controls/image-2.webp" projectLink="/projects/offroadcontrols" bubbleVariant="locked"
        />
        <ProjectPreview
          title="Feed It Back"
          description="Redesigned the case management platform for Feed It Back, a hospitality guest feedback tool used by major restaurant chains. Delivered the user experience design by transferring user research findings, into user flows, wireframes and full fidelity designs, for improved navigation, usability, and mobile compatibility."
          bullets={[
            { text: 'Receives millions of reviews from top hospitality brands', icon: '/icons/Chat.svg' },
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
          mainImage="/images/projects/driver-displays/image-1.webp" secondaryImage="/images/projects/driver-displays/image-2.webp" projectLink="/projects/driverdisplays" bubbleVariant="locked"
        />
        <ProjectPreview
          title="Training Platform"
          description="Designed the user experience for a medical education platform for general practitioners and primary care clinicians, taking it from an in person service to a fully digital solution. Transferring user interview findings, into user flows, wireframes and full fidelity designs."
          bullets={[
            { text: '30,000 clinicians supported annually through the platform', icon: '/icons/Users.svg' },
            { text: 'Enabling professionals to complete training digitally', icon: '/icons/Test.svg' },
            { text: 'In person only service to fully digital offering', icon: '/icons/Internet.svg' },
          ]}
          mainImage="/images/projects/training-platform/image-1.webp" secondaryImage="/images/projects/training-platform/image-2.webp" projectLink="/projects/training-platform" bubbleVariant="locked"
        />
        <ProjectPreview
          title="Trick Trainer"
          description="Building fun side project, trick trainer app with my Black Labrador. It is a trick recognition tool that uses pose detection to detect when he's completed a command. The goal is to eventually have it entertain him autonomously. Its a passion project and dog enrichment experiment."
          bullets={[
            { text: 'Leveraging machine learning and pose detection models', icon: '/icons/Pose.svg' },
            { text: 'Using the latest AI tools to bring my concepts to life', icon: '/icons/AI.svg' },
            { text: 'Proof of concept build completed and tested', icon: '/icons/Build.svg' },
          ]}
          mainImage="" secondaryImage="" projectLink="/projects/swipe-save" bubbleVariant="coming-soon"
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

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="overlay-wrapper">
          <Menu
            onClose={() => setIsMenuOpen(false)}
            onContactClick={() => {
              setIsMenuOpen(false);
              handleContact();
            }}
          />
        </div>
      )}
    </div>
  );
}
