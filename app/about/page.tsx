'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { ProjectCarousel } from '@/components/ui/project-carousel';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { AppointmentForm } from '@/components/ui/appointment-form';
import { AppointmentContactForm } from '@/components/ui/appointment-contact-form';
import { SuccessMessage } from '@/components/ui/success-message';

// About Images Component
function AboutImages({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Expand when scrolling into view, shrink when scrolling out
        setIsExpanded(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '-100px 0px', // Adjust trigger point
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className={`about-images-wrapper ${className}`}>
      <style>
        {`
          .about-images-wrapper {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
          }

          /* Desktop: Overlapping hover animation */
          .about-images-desktop {
            position: relative;
            width: 1200px;
            height: 700px;
            margin: 0 auto;
            display: block;
          }

          .about-image-item {
            position: absolute;
            border-radius: 4px;
            overflow: hidden;
            transition: all 700ms ease-out;
          }

          .about-image-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .about-image-left {
            z-index: 1;
          }

          .about-image-left:not(.hovered) {
            left: 244px;
            top: 254px;
            width: 320px;
            height: 320px;
          }

          .about-image-left.hovered {
            left: 104px;
            top: 314px;
            width: 360px;
            height: 360px;
          }

          .about-image-middle {
            z-index: 3;
          }

          .about-image-middle:not(.hovered) {
            left: 400px;
            top: 152px;
            width: 400px;
            height: 400px;
          }

          .about-image-middle.hovered {
            left: 358px;
            top: 110px;
            width: 480px;
            height: 480px;
          }

          .about-image-right {
            z-index: 2;
          }

          .about-image-right:not(.hovered) {
            left: 614px;
            top: 126px;
            width: 300px;
            height: 300px;
          }

          .about-image-right.hovered {
            left: 714px;
            top: 26px;
            width: 340px;
            height: 340px;
          }

          /* Mobile/Tablet: Simple grid */
          .about-images-grid {
            display: none;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            padding: 60px 0;
          }

          .about-images-grid img {
            width: 100%;
            height: auto;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 4px;
          }

          /* Show desktop on large screens */
          @media (min-width: 1101px) {
            .about-images-desktop {
              display: block;
            }
            .about-images-grid {
              display: none;
            }
          }

          /* Show grid on smaller screens */
          @media (max-width: 1100px) {
            .about-images-desktop {
              display: none;
            }
            .about-images-grid {
              display: grid;
            }
          }

          /* Stack vertically on very small screens */
          @media (max-width: 600px) {
            .about-images-grid {
              grid-template-columns: 1fr;
              max-width: 400px;
              margin: 0 auto;
              padding: 40px 0;
            }

            .about-images-grid img:nth-child(2),
            .about-images-grid img:nth-child(3) {
              display: none;
            }
          }
        `}
      </style>

      {/* Desktop: Overlapping scroll animation */}
      <div
        ref={containerRef}
        className="about-images-desktop"
      >
        <div className={`about-image-item about-image-left ${isExpanded ? 'hovered' : ''}`}>
          <img src="/images/about/left.png" alt="About" />
        </div>

        <div className={`about-image-item about-image-middle ${isExpanded ? 'hovered' : ''}`}>
          <img src="/images/about/middle.png" alt="About" />
        </div>

        <div className={`about-image-item about-image-right ${isExpanded ? 'hovered' : ''}`}>
          <img src="/images/about/right.png" alt="About" />
        </div>
      </div>

      {/* Mobile/Tablet: Simple grid */}
      <div className="about-images-grid">
        <img src="/images/about/left.png" alt="About" />
        <img src="/images/about/middle.png" alt="About" />
        <img src="/images/about/right.png" alt="About" />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAppointmentContactOpen, setIsAppointmentContactOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isContactSuccessOpen, setIsContactSuccessOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<{ date?: Date; time?: string }>({});
  const [showBackButton, setShowBackButton] = useState(false);

  // Disable scrolling when any menu is open
  React.useEffect(() => {
    const isAnyMenuOpen = isMenuOpen || isContactOpen || isAppointmentOpen || isAppointmentContactOpen || isSuccessOpen || isContactSuccessOpen;

    if (isAnyMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isContactOpen, isAppointmentOpen, isAppointmentContactOpen, isSuccessOpen, isContactSuccessOpen]);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>
        {`
          .about-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 var(--spacing-3);
          }

          .about-hero {
            padding-top: 100px;
            padding-bottom: 16px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }

          .about-subtitle {
            font-family: var(--font-sans);
            font-weight: 400;
            font-size: 20px;
            line-height: 100%;
            color: var(--brand-black);
            margin: 0;
          }

          .about-title {
            font-family: var(--font-heading);
            font-weight: 400;
            font-size: 84px;
            line-height: 90px;
            color: var(--brand-black);
            margin: 0;
          }

          .about-images-section {
            margin: 0 auto 0;
            display: flex;
            justify-content: center;
          }

          .about-description {
            max-width: 1099px;
            margin: 32px auto 100px;
            font-family: var(--font-heading);
            font-weight: 300;
            font-size: 42px;
            line-height: 1.2;
            text-align: center;
            color: var(--brand-black);
            padding: 0 16px;
          }

          .about-content-section {
            background-color: var(--brand-off-white-200);
            padding: 100px 16px;
          }

          .about-content-grid {
            max-width: 1248px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 456px 1fr;
            gap: var(--spacing-6);
          }

          .about-cta-section {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }

          .about-cta-text {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .about-cta-heading {
            font-family: var(--font-heading);
            font-weight: 400;
            font-size: 64px;
            line-height: 1.2;
            color: var(--brand-black);
            margin: 0;
          }

          .about-cta-subheading {
            font-family: var(--font-heading);
            font-weight: 300;
            font-size: 20px;
            line-height: 1.3;
            color: var(--brand-black);
            margin: 0;
          }

          .about-cta-buttons {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .about-text-content {
            font-family: var(--font-heading);
            font-weight: 300;
            font-size: 20px;
            line-height: 1.3;
            color: var(--brand-black);
          }

          .about-text-content p {
            margin-bottom: var(--spacing-3);
          }

          .about-text-content p:last-child {
            margin-bottom: 0;
          }

          .about-carousel-section {
            margin: 100px 0 0 0;
            height: 432px;
            overflow: hidden;
          }

          @media (max-width: 900px) {
            .about-hero {
              padding-top: 80px;
              padding-bottom: 16px;
            }

            .about-title {
              font-size: 56px;
              line-height: 60px;
            }

            .about-description {
              font-size: 32px;
            }

            .about-content-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }

            .about-content-section {
              padding: 80px 12px;
            }

            .about-images-section {
              margin: 0 auto 0;
            }

            .about-cta-heading {
              font-size: 48px;
            }

            .about-carousel-section {
              margin: 80px 0 0 0;
              height: 350px;
            }
          }

          @media (max-width: 600px) {
            .about-hero {
              padding-top: 60px;
              padding-bottom: 16px;
            }

            .about-title {
              font-size: 42px;
              line-height: 46px;
            }

            .hide-on-mobile {
              display: none;
            }

            .about-description {
              font-size: 24px;
            }

            .about-content-section {
              padding: 60px 8px;
            }

            .about-images-section {
              margin: 0 auto 0;
            }

            .about-cta-heading {
              font-size: 36px;
            }

            .about-text-content {
              font-size: 18px;
            }

            .about-carousel-section {
              margin: 60px 0 0 0;
              height: 280px;
            }
          }

          @media (max-width: 480px) {
            .about-hero {
              padding-top: 40px;
              padding-bottom: 16px;
            }

            .about-title {
              font-size: 32px;
              line-height: 36px;
            }

            .about-description {
              font-size: 20px;
            }

            .about-content-section {
              padding: 40px 8px;
            }

            .about-images-section {
              margin: 0 auto 0;
            }

            .about-cta-heading {
              font-size: 28px;
            }

            .about-text-content {
              font-size: 16px;
            }

            .about-carousel-section {
              margin: 40px 0 0 0;
              height: 250px;
            }
          }

          .overlay-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1000;
            padding: var(--spacing-3);
          }

          @media (max-width: 768px) {
            .overlay-wrapper {
              padding: 0 0 env(safe-area-inset-bottom, 80px) 0 !important;
            }
          }
        `}
      </style>

      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
          onContactClick={() => {
            setShowBackButton(false);
            setIsContactOpen(true);
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="about-hero">
        <p className="about-subtitle">
          Designer<span className="hide-on-mobile"> and builder</span> for all things <strong style={{ fontWeight: 700 }}>Automotive.</strong>
        </p>
        <h1 className="about-title">About</h1>
      </div>

      {/* About Images */}
      <div className="about-images-section">
        <AboutImages />
      </div>

      {/* Description */}
      <p className="about-description">
        I'm a designer and developer building high performance websites that combine thoughtful user experience, refined user interface design, with smart integrations to support your business needs.
      </p>

      {/* Content Section */}
      <div className="about-content-section">
        <div className="about-content-grid">
          {/* Left Column - CTA */}
          <div className="about-cta-section">
            <div className="about-cta-text">
              <h2 className="about-cta-heading">Have a project in mind?</h2>
              <p className="about-cta-subheading">Let's build something that performs.</p>
            </div>
            <div className="about-cta-buttons">
              <Button
                variant="primary-black"
                onClick={() => {
                  setShowBackButton(false);
                  setIsContactOpen(true);
                }}
              >
                Get In Touch
              </Button>
              <Button
                variant="whatsapp-black"
                onClick={() => window.open('https://wa.me/447305088562', '_blank')}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="about-text-content">
            <p>
              I currently work as a UX Designer at Jaguar Land Rover. Alongside my role, I take on select freelance projects, helping automotive business owners create websites and digital tools that not only look great but are practical, intuitive, and make running their business simpler and more efficient.
            </p>
            <p>
              With several years of experience designing websites, apps, and digital products, I bring a balance of creativity and problem-solving to every project—applying the same care, precision, and user-focused thinking found in the next generation of Land Rover digital interfaces.
            </p>
          </div>
        </div>
      </div>

      {/* Project Carousel */}
      <div className="about-carousel-section">
        <ProjectCarousel />
      </div>

      {/* Footer */}
      <Footer
        onContactClick={() => {
          setShowBackButton(false);
          setIsContactOpen(true);
        }}
      />

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="overlay-wrapper">
          <Menu
            onClose={() => setIsMenuOpen(false)}
            onContactClick={() => {
              setIsMenuOpen(false);
              setShowBackButton(true);
              setIsContactOpen(true);
            }}
          />
        </div>
      )}

      {/* Contact Form Overlay */}
      {isContactOpen && (
        <div className="overlay-wrapper">
          <ContactForm
            onClose={() => {
              setIsContactOpen(false);
              setShowBackButton(false);
            }}
            onBack={showBackButton ? () => {
              setIsContactOpen(false);
              setShowBackButton(false);
              setIsMenuOpen(true);
            } : undefined}
            onSubmit={(contactData) => {
              console.log('Contact form submitted:', contactData);
              setIsContactOpen(false);
              setShowBackButton(false);
              setIsContactSuccessOpen(true);
            }}
          />
        </div>
      )}

      {/* Appointment Form Overlay - Step 1: Pick Date & Time */}
      {isAppointmentOpen && (
        <div className="overlay-wrapper">
          <AppointmentForm
            onClose={() => {
              setIsAppointmentOpen(false);
              setShowBackButton(false);
            }}
            onBack={showBackButton ? () => {
              setIsAppointmentOpen(false);
              setShowBackButton(false);
              setIsMenuOpen(true);
            } : undefined}
            onSubmit={(data) => {
              setAppointmentData(data);
              setIsAppointmentOpen(false);
              setIsAppointmentContactOpen(true);
            }}
          />
        </div>
      )}

      {/* Appointment Contact Form Overlay - Step 2: Submit Contact Info */}
      {isAppointmentContactOpen && (
        <div className="overlay-wrapper">
          <AppointmentContactForm
            onClose={() => setIsAppointmentContactOpen(false)}
            onBack={() => {
              setIsAppointmentContactOpen(false);
              setIsAppointmentOpen(true);
            }}
            appointmentDate={appointmentData.date}
            appointmentTime={appointmentData.time}
            onSubmit={(contactData) => {
              console.log('Appointment booked:', { ...appointmentData, ...contactData });
              setIsAppointmentContactOpen(false);
              setIsSuccessOpen(true);
            }}
          />
        </div>
      )}

      {/* Success Message Overlay */}
      {isSuccessOpen && (
        <div className="overlay-wrapper">
          <SuccessMessage onClose={() => setIsSuccessOpen(false)} />
        </div>
      )}

      {/* Contact Success Message Overlay */}
      {isContactSuccessOpen && (
        <div className="overlay-wrapper">
          <SuccessMessage
            title="Thanks for your message!"
            message="We've received your enquiry and will reply shortly."
            onClose={() => setIsContactSuccessOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
