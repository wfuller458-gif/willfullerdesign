'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { ProjectPreview } from '@/components/ui/project-preview';
import { Footer } from '@/components/ui/footer';
import { RecommendationCarousel } from '@/components/ui/recommendation-carousel';
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
      <div className="intro-text-section">
        <p className="intro-text">
          I turn ideas into reality through expert judgment, craft, and a relentless attention to detail, creating experiences people love.
        </p>
      </div>

      {/* Project Previews */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '75px' }}>
        <ProjectPreview
          title="Off-Road Controls"
          description="Lead the UX for upcoming Defender models by delivering an off-road experience that unifies cameras, terrain systems and incorporate new features into a seamless, engaging cockpit focused on usability, confidence and adventure."
          bullets={[
            { text: 'Designed next generation Defender next-generation off-road experience' },
            { text: 'UX ownership of every off-road feature' },
            { text: 'Unified physical controls and digital feedback' },
          ]}
          mainImage="/images/projects/Defender/Hero.png"
          secondaryImage="/images/projects/Defender/image%202.jpg"
          projectLink="/projects/defender"
        />
        <ProjectPreview
          title="Range Rover"
          description="Designed next-generation digital displays for upcoming Range Rover and Defender models, creating an atomic design system and layout framework informed by user-centred research, attention management, and cross-team integration."
          bullets={[
            { text: 'Atomic design system for next-gen displays' },
            { text: 'Cross-team integration across software and hardware' },
            { text: 'User-centred research informing layout decisions' },
          ]}
          mainImage="/images/projects/range-rover/main.jpg"
          secondaryImage="/images/projects/range-rover/preview-1.jpg"
          projectLink="/projects/range-rover"
        />
        <ProjectPreview
          title="Avinya"
          description="Design system with three Avinya specific UI themes, enabling Tata Motors to deliver a distinct visual identity through a unified software platform."
          bullets={[
            { text: 'Three distinct UI themes within one system' },
            { text: 'Atomic component architecture' },
            { text: 'Delivered a scalable design language for Tata Motors' },
          ]}
          mainImage="/images/projects/Avinya/hero1.jpg"
          secondaryImage="/images/projects/Avinya/hero2.png"
          projectLink="/projects/avinya"
        />
        <ProjectPreview
          title="Swipe Save"
          description="A mobile budgeting app that uses a swipe-based interface to help users accurately review and categorise their bank transactions, making budgeting faster, clearer, and more consistent."
          bullets={[
            { text: 'Swipe-based transaction categorisation' },
            { text: 'Clear visual budget breakdowns' },
            { text: 'Designed end-to-end from concept to prototype' },
          ]}
          mainImage="/images/projects/swipe-save/main.png"
          secondaryImage="/images/projects/swipe-save/preview-1.png"
          projectLink="/projects/swipe-save"
        />
        <ProjectPreview
          title="Feed It Back"
          description="Design work on the core inbox of a multi-channel review management platform, helping restaurant teams prioritise, respond to, and manage high volumes of customer feedback."
          bullets={[
            { text: 'Multi-channel review inbox design' },
            { text: 'Triage and response workflow optimisation' },
            { text: 'Used by major UK restaurant groups' },
          ]}
          mainImage="/images/projects/feed-it-back/main.png"
          secondaryImage="/images/projects/feed-it-back/preview-1.png"
          projectLink="/projects/feed-it-back"
        />
      </div>

      {/* Recommendations Section Header */}
      <div style={{
        width: '100%',
        marginTop: '100px',
        marginBottom: '80px'
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '1.4',
          color: 'var(--brand-black)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Recommendations
        </p>
        <h2 style={{
          fontSize: '42px',
          lineHeight: '1.3',
          color: 'var(--brand-black)',
          marginBottom: '0',
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300
          }}>Tangible Impact</span>
        </h2>
      </div>

      {/* Recommendation Cards */}
      <div style={{ marginBottom: '100px' }}>
        <RecommendationCarousel />
      </div>

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
