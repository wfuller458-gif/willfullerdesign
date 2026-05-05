'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { Banner } from '@/components/ui/banner';
import { ProjectPreview } from '@/components/ui/project-preview';
import { History } from '@/components/ui/history';
import { Footer } from '@/components/ui/footer';
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
            padding: 80px 90px;
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
              padding: 60px 40px;
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        marginTop: '16px',
        marginBottom: '16px'
      }}>
        <ProjectPreview
          title="Defender"
          description="Leading the UX for off-road experiences on upcoming Defender models, contributing concepts that unify cameras, terrain systems and new features into a seamless, engaging cockpit experience focused on usability, confidence and adventure."
          mainImage="/images/projects/Defender/Hero.png"
          previewImage1="/images/projects/Defender/image%203.jpg"
          previewImage2="/images/projects/Defender/image%202.jpg"
          projectLink="/projects/defender"
        />
        <ProjectPreview
          title="Swipe Save"
          description="A mobile budgeting app that uses a swipe-based interface to help users accurately review and categorise their bank transactions, making budgeting faster, clearer, and more consistent."
          mainImage="/images/projects/swipe-save/main.png"
          previewImage1="/images/projects/swipe-save/preview-1.png"
          previewImage2="/images/projects/swipe-save/preview-2.png"
          projectLink="/projects/swipe-save"
        />
        <ProjectPreview
          title="Avinya"
          description="Design system with three Avinya specific UI themes, enabling Tata Motors to deliver a distinct visual identity through a unified software."
          mainImage="/images/projects/Avinya/hero1.jpg"
          previewImage1="/images/projects/Avinya/project1.png"
          previewImage2="/images/projects/Avinya/hero2.png"
          projectLink="/projects/avinya"
        />
<ProjectPreview
          title="Range Rover"
          description="Designed next-generation digital displays for upcoming Range Rover and Defender models, creating an atomic design system and layout framework informed by user-centred research, attention management, and cross-team integration."
          mainImage="/images/projects/range-rover/main.jpg"
          previewImage1="/images/projects/range-rover/preview-1.jpg"
          previewImage2="/images/projects/range-rover/preview-2.jpg"
          projectLink="/projects/range-rover"
        />
        <ProjectPreview
          title="Feed It Back"
          description="Design work on the core inbox of a multi-channel review management platform, helping restaurant teams prioritise, respond to, and manage high volumes of customer feedback."
          mainImage="/images/projects/feed-it-back/main.png"
          previewImage1="/images/projects/feed-it-back/preview-1.png"
          previewImage2="/images/projects/feed-it-back/preview-2.png"
          projectLink="/projects/feed-it-back"
        />
        <ProjectPreview
          title="ChargedUp"
          description="Early-stage creative work for a startup rolling out phone charging stations across London, spanning product visuals, marketing assets, and landing pages."
          mainImage="/images/projects/chargedup/main.png"
          previewImage1="/images/projects/chargedup/preview-1.png"
          previewImage2="/images/projects/chargedup/preview-2.png"
          projectLink="/projects/chargedup"
        />
      </div>

      {/* Grey Banner */}
      <Banner
        variant="grey"
      />


      {/* Design Experience Timeline */}
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
          Timeline
        </p>
        <h2 style={{
          fontSize: '42px',
          lineHeight: '1.3',
          color: 'var(--brand-black)',
          marginBottom: '50px',
          textAlign: 'center'
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300
          }}>Design </span>
          <span style={{
            fontFamily: 'PT Serif, serif',
            fontWeight: 700,
            fontStyle: 'italic'
          }}>Experience</span>
        </h2>

        <History entries={[
          {
            date: "2022 - 2026",
            company: "Jaguar Land Rover",
            tooltipDescription: "At Jaguar Land Rover's Gaydon headquarters, I work as a UX Designer in the Human–Machine Interface team, designing touchscreens, instrument clusters, and head-up displays for Land Rover vehicles. I collaborate with engineers and designers to create intuitive, premium in-car experiences, and have delivered features that have made it into production cars.",
            tooltipImages: ["/images/tooltip/jlr-1.png", "/images/tooltip/jlr-2.png"]
          },
          {
            date: "2021",
            company: "Suru Partners",
            tooltipDescription: "At Suru Partners in Coventry, I worked as a UX/UI Designer, creating websites and web applications for a variety of clients. Operating within an agile delivery framework, I collaborated closely with software developers and the directors to deliver full designs.",
            tooltipImages: ["/images/tooltip/suru-1.png", "/images/tooltip/suru-2.png", "/images/tooltip/suru-3.png"]
          },
          {
            date: "2020",
            company: "Freelance",
            tooltipDescription: "I freelanced as a designer, working with a start up in Berlin where I was responsible for designing their entire web app, created to support independent restaurateurs. A highlight was seeing an early version adopted by Subway chains. I also worked with Full Clarity on projects in healthcare and hospitality, including a GP training platform and Feed It Back, a tool used by major restaurant groups to manage and respond to customer reviews across multiple channels.",
            tooltipImages: ["/images/tooltip/freelance-1.png", "/images/tooltip/freelance-2.png"]
          },
          {
            date: "2019",
            company: "University of New Mexico",
            tooltipDescription: "I studied at the University of New Mexico on a full athletic scholarship, competing in cross country and track while working toward a degree in Sports Administration. During this time I got the opportunity to compete in races all across the US. Alongside my academic and athletic commitments, I had the opportunity to study some graphic design classes.",
            tooltipImages: ["/images/tooltip/unm-1.png", "/images/tooltip/unm-2.png", "/images/tooltip/unm-3.png"]
          },
          {
            date: "2018",
            company: "Charged Up",
            tooltipDescription: "I joined ChargedUp, a London-based start-up, as their first design intern, working directly with the four founders. I contributed to the launch by creating CAD models and product renderings, designing and building the entire website, producing marketing materials, and supporting their social media ads. Being involved in so many parts of the launch made it a fast-paced and really fun experience.",
            tooltipImages: ["/images/tooltip/chargedup-1.png", "/images/tooltip/chargedup-2.png"]
          },
          {
            date: "2015",
            company: "Loughborough University",
            tooltipDescription: "I studied Industrial Design (BA) and graduated with a First Class Honours degree. The course covered everything from sketching and engineering drawings to workshop skills in metalwork, woodworking, machining, model making and injection-moulding processes. Alongside my studies, I competed for the university in cross country and track, and also earned selections for multiple England and Great Britain teams.",
            tooltipImages: ["/images/tooltip/lboro-1.png", "/images/tooltip/lboro-2.png", "/images/tooltip/lboro-3.png"]
          }
        ]} />
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
            padding: 16px;
          }

          @media (max-width: 768px) {
            .overlay-wrapper {
              padding: 0 0 env(safe-area-inset-bottom, 80px) 0 !important;
            }
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
