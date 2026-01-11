"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Menu } from "@/components/ui/menu";
import { ContactForm } from "@/components/ui/contact-form";
import { AppointmentForm } from "@/components/ui/appointment-form";
import { AppointmentContactForm } from "@/components/ui/appointment-contact-form";

export default function SwipeSaveProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAppointmentContactOpen, setIsAppointmentContactOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<{ date?: Date; time?: string }>({});

  // Animation state
  const [imageTransform, setImageTransform] = useState(0);
  const [dashboardTransform, setDashboardTransform] = useState(0);
  const [interiorTransform, setInteriorTransform] = useState(0);
  const [sideTransform, setSideTransform] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [textSection1Visible, setTextSection1Visible] = useState(false);
  const [textSection2Visible, setTextSection2Visible] = useState(false);
  const [textSection3Visible, setTextSection3Visible] = useState(false);
  const [textSection4Visible, setTextSection4Visible] = useState(false);
  const [textSection5Visible, setTextSection5Visible] = useState(false);
  const [image1Visible, setImage1Visible] = useState(false);
  const [image2Visible, setImage2Visible] = useState(false);
  const [image3Visible, setImage3Visible] = useState(false);
  const [image4Visible, setImage4Visible] = useState(false);
  const [image5Visible, setImage5Visible] = useState(false);
  const [sideImage1Visible, setSideImage1Visible] = useState(false);
  const [sideImage2Visible, setSideImage2Visible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const textSection1Ref = useRef<HTMLDivElement>(null);
  const textSection2Ref = useRef<HTMLDivElement>(null);
  const textSection3Ref = useRef<HTMLDivElement>(null);
  const textSection4Ref = useRef<HTMLDivElement>(null);
  const textSection5Ref = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const image5Ref = useRef<HTMLDivElement>(null);
  const sideImage1Ref = useRef<HTMLDivElement>(null);
  const sideImage2Ref = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable scrolling when any menu is open
  useEffect(() => {
    const isAnyMenuOpen = isMenuOpen || isContactOpen || isAppointmentOpen || isAppointmentContactOpen;

    if (isAnyMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isContactOpen, isAppointmentOpen, isAppointmentContactOpen]);

  // Parallax scroll effect (disabled for Swipe Save - using static grey boxes)
  useEffect(() => {
    const handleScroll = () => {
      // No parallax effects for grey placeholder images
      return;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Fade-in effect on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Text visibility effects on scroll
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTitleVisible(true);
        }
      }

      if (detailsRef.current) {
        const rect = detailsRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setDetailsVisible(true);
        }
      }

      if (textSection1Ref.current) {
        const rect = textSection1Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTextSection1Visible(true);
        }
      }

      if (textSection2Ref.current) {
        const rect = textSection2Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTextSection2Visible(true);
        }
      }

      if (textSection3Ref.current) {
        const rect = textSection3Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTextSection3Visible(true);
        }
      }

      if (textSection4Ref.current) {
        const rect = textSection4Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTextSection4Visible(true);
        }
      }

      if (textSection5Ref.current) {
        const rect = textSection5Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setTextSection5Visible(true);
        }
      }

      if (image1Ref.current) {
        const rect = image1Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setImage1Visible(true);
        }
      }

      if (image2Ref.current) {
        const rect = image2Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setImage2Visible(true);
        }
      }

      if (image3Ref.current) {
        const rect = image3Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setImage3Visible(true);
        }
      }

      if (image4Ref.current) {
        const rect = image4Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setImage4Visible(true);
        }
      }

      if (image5Ref.current) {
        const rect = image5Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setImage5Visible(true);
        }
      }

      if (sideImage1Ref.current) {
        const rect = sideImage1Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setSideImage1Visible(true);
        }
      }

      if (sideImage2Ref.current) {
        const rect = sideImage2Ref.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setSideImage2Visible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>
        {`
          /* Tablet */
          @media (max-width: 1024px) {
            .project-hero-container {
              flex-direction: column !important;
            }

            .project-hero-main {
              height: 400px !important;
            }

            .project-hero-column {
              width: 100% !important;
              flex-direction: row !important;
            }

            .project-hero-small {
              height: 200px !important;
              flex: 1 !important;
            }

            .project-title {
              font-size: 48px !important;
            }

            .project-text {
              font-size: 18px !important;
            }

            .project-two-column {
              flex-direction: column !important;
              gap: 32px !important;
            }

            .project-column {
              max-width: 100% !important;
            }

            .project-image-large {
              height: 400px !important;
            }

            .project-image-medium {
              height: 350px !important;
            }

            .project-side-portrait {
              width: 100% !important;
              max-width: 100% !important;
              height: 500px !important;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .project-hero-main {
              height: 300px !important;
            }

            .project-hero-small {
              height: 150px !important;
            }

            .project-title {
              font-size: 36px !important;
            }

            .project-subtitle {
              font-size: 16px !important;
            }

            .project-text {
              font-size: 16px !important;
            }

            .project-image-large {
              height: 300px !important;
            }

            .project-image-medium {
              height: 280px !important;
            }

            .project-side-portrait {
              width: 100% !important;
              max-width: 100% !important;
              height: 400px !important;
            }

            .project-section-spacing {
              margin-bottom: 48px !important;
            }
          }

          /* Small Mobile */
          @media (max-width: 480px) {
            .project-hero-container {
              flex-direction: column !important;
            }

            .project-hero-column {
              width: 100% !important;
              gap: 8px !important;
            }

            .project-hero-main {
              height: 180px !important;
              width: 100% !important;
              flex: none !important;
            }

            .project-hero-small {
              height: 180px !important;
              width: 100% !important;
            }

            .project-title {
              font-size: 28px !important;
            }

            .project-subtitle {
              font-size: 14px !important;
            }

            .project-text {
              font-size: 14px !important;
            }

            .project-image-large {
              height: 250px !important;
            }

            .project-image-medium {
              height: 220px !important;
            }

            .project-scroll-indicator {
              display: none !important;
            }

            .project-content-padding {
              padding-left: 16px !important;
            }

            .project-details-left {
              width: 100% !important;
              margin-bottom: 24px !important;
            }

            .project-side-portrait {
              width: 100% !important;
              max-width: 100% !important;
              height: 300px !important;
            }

            .project-section-spacing {
              margin-bottom: 32px !important;
            }
          }

          /* Responsive container widths and padding */
          @media (max-width: 1200px) {
            .project-wide-image {
              width: 100% !important;
              max-width: 100% !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }

            .project-content-padding {
              padding-left: 60px !important;
            }
          }

          @media (max-width: 768px) {
            .project-content-padding {
              padding-left: 24px !important;
            }

            .project-details-container {
              gap: 32px !important;
            }

            .project-details-left {
              width: 100% !important;
            }
          }
        `}
      </style>
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
          onContactClick={() => setIsContactOpen(true)}
        />
      </div>

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
              setIsContactOpen(true);
            }}
          />
        </div>
      )}

      {/* Contact Form Overlay */}
      {isContactOpen && (
        <div className="overlay-wrapper">
          <ContactForm
            onClose={() => setIsContactOpen(false)}
            onSubmit={(contactData) => {
              console.log('Contact form submitted:', contactData);
              setIsContactOpen(false);
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
            }}
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
            }}
          />
        </div>
      )}

      {/* Hero Section with Images */}
      <div
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingBottom: '16px',
          paddingTop: '0',
        }}
      >
        {/* Hero Images */}
        <div
          ref={heroRef}
          className="project-hero-container"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          {/* Mobile-only main image - shown first on mobile */}
          {isMobile && (
            <div
              className="project-hero-mobile-main"
              style={{
                height: '180px',
                width: '100%',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
                backgroundImage: 'url(/images/projects/swipe-save/main.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            />
          )}

          {/* Main large image - left side (desktop only) */}
          {!isMobile && (
            <div
              className="project-hero-main"
              style={{
                flex: '1',
                height: '620px',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
                backgroundImage: 'url(/images/projects/swipe-save/main.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            />
          )}

          {/* Column for two smaller images - right side */}
          <div
            className="project-hero-column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: isMobile ? '100%' : '404px',
            }}
          >
            {/* Top small image */}
            <div
              className="project-hero-small"
              style={{
                height: isMobile ? '180px' : '306px',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out 100ms',
                backgroundImage: 'url(/images/projects/swipe-save/preview-1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            />

            {/* Bottom small image */}
            <div
              className="project-hero-small"
              style={{
                height: isMobile ? '180px' : '306px',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out 200ms',
                backgroundImage: 'url(/images/projects/swipe-save/preview-2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            />
          </div>
        </div>

        {/* Title and Scroll Down */}
        <div
          ref={titleRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px',
          }}
        >
          <h1
            className="font-display font-light project-title"
            style={{
              fontSize: '64px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            Swipe Save
          </h1>

          <div
            className="project-scroll-indicator"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out 100ms',
            }}
          >
            <p
              className="font-sans font-light project-subtitle"
              style={{
                fontSize: '20px',
                color: 'var(--brand-black)',
              }}
            >
              Scroll down
            </p>
            <div style={{ width: '24px', height: '24px' }}>
              <style>
                {`
                  @keyframes bounce {
                    0%, 100% {
                      transform: translateY(0);
                    }
                    50% {
                      transform: translateY(4px);
                    }
                  }
                `}
              </style>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  animation: 'bounce 1.5s ease-in-out infinite'
                }}
              >
                <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div
          ref={detailsRef}
          className="project-two-column project-details-container project-section-spacing"
          style={{
            display: 'flex',
            gap: '121px',
            marginBottom: '100px',
          }}
        >
          {/* Left: Tags/Categories */}
          <div className="project-details-left project-column" style={{ width: '300px' }}>
            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: detailsVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              iOS / Android Mobile App
              <br />
              UX Design
              <br />
              UI Design
              <br />
              Claude Code (React)
              <br />
              Figma MCP Server
            </p>
          </div>

          {/* Right: Description */}
          <div className="project-column" style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: detailsVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out 100ms',
              }}
            >
              Swipe Save is a side project I've been working on over the last month (December 2025 – January 2026). It's a mobile budgeting app that connects directly to your bank accounts via Plaid and rethinks how people review and categorise their spending.
            </p>
          </div>
        </div>

        {/* First Centered Image - 400px */}
        <div
          ref={image1Ref}
          className="project-wide-image project-image-medium project-section-spacing"
          style={{
            maxWidth: '1100px',
            width: '100%',
            height: '400px',
            margin: '0 auto 100px',
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: image1Visible ? 1 : 0,
            transform: image1Visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <img
            src="/images/projects/swipe-save/image-2.png"
            alt="Swipe Save app interface"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* First Text Section - Centered */}
        <div
          ref={textSection1Ref}
          className="project-content-padding project-section-spacing"
          style={{
            marginBottom: '100px',
            paddingLeft: '226px',
            maxWidth: '1174px',
          }}
        >
          <p
            className="font-sans font-light project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              opacity: textSection1Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            Instead of trawling through long transaction lists, Swipe Save presents each transaction in a Tinder-style swipe interface. Users can quickly approve, remove, or edit the auto-assigned category for every transaction, with streaks to encourage consistency. The goal is to help users know exactly when, where, and what they're spending money on—while making budgeting feel lightweight and even enjoyable.
          </p>
        </div>

        {/* First Full-Width Image - 832px */}
        <div
          ref={image2Ref}
          className="project-image-large project-section-spacing"
          style={{
            width: '100%',
            height: '832px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '100px',
            opacity: image2Visible ? 1 : 0,
            transform: image2Visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <img
            src="/images/projects/swipe-save/image-1.png"
            alt="Swipe Save features"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Two Column Text Section with Side Portrait */}
        <div
          ref={textSection2Ref}
          className="project-two-column project-content-padding"
          style={{
            display: 'flex',
            gap: '95px',
            marginBottom: '100px',
            paddingLeft: '74px',
          }}
        >
          <div className="project-column" style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '32px',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              Around six months ago, I began experimenting with AI tools to explore how far they could take me in both design and development. The first app I built and launched on the App Store was a simple macOS budgeting app. It allowed users to upload CSV bank statements, categorise transactions, and track budgets.
            </p>

            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '32px',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 150ms',
              }}
            >
              While building that app, I found that Claude Code performed best for my workflow. One clear limitation, however, was UI generation. AI generated interfaces often look generic and unpolished. I found better results when prompting with specific design systems such as Apple's iOS design language which I used successfully in my macOS app.
            </p>

            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 300ms',
              }}
            >
              Although I still use my macOS budgeting app, I became frustrated with how manual the process was due to the lack of direct bank connectivity. Since building it, my workflow with Claude Code has improved significantly, and by connecting it to an MCP server and sharing Figma designs, I'm now able to create truly custom UI that goes far beyond generic AI output.
            </p>
          </div>

          {/* Right side portrait image */}
          <div
            ref={sideImage1Ref}
            className="project-side-portrait"
            style={{
              width: '405px',
              height: '542px',
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: sideImage1Visible ? 1 : 0,
              transform: sideImage1Visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            }}
          >
            <img
              src="/images/projects/swipe-save/image-3.png"
              alt="Development workflow"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        {/* Second Full-Width Image - 832px */}
        <div
          ref={image3Ref}
          className="project-image-large project-section-spacing"
          style={{
            width: '100%',
            height: '832px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '100px',
            opacity: image3Visible ? 1 : 0,
            transform: image3Visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <img
            src="/images/projects/swipe-save/image-4.png"
            alt="App testing and research"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Two Column Text Section - Testing Apps */}
        <div
          ref={textSection3Ref}
          className="project-content-padding project-section-spacing"
          style={{
            marginBottom: '100px',
            paddingLeft: '226px',
            maxWidth: '1174px',
          }}
        >
          <p
            className="font-sans font-light project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              marginBottom: '16px',
              opacity: textSection3Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            I also tested a wide range of existing budgeting apps. While bank connectivity was generally strong, auto-categorisation was often inaccurate especially when purchases from the same merchant (e.g. Amazon) belonged to completely different spending categories. Most apps still required scrolling through long transaction lists to find this, spammed notifications, or attempted to sell financial products rather than helping users stay consistent with their budgeting goals. This frustration led directly to the idea for Swipe Save.
          </p>

          <p
            className="font-sans font-light project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              opacity: textSection3Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out 150ms',
            }}
          >
            To better understand what works (and what doesn't), I screenshotted every screen of the budgeting apps I tested, analysing their onboarding flows and key interactions. This helped inform which patterns felt intuitive, which felt overwhelming, and where there was room to simplify and improve the experience.
          </p>
        </div>

        {/* Third Centered Image - 400px */}
        <div
          ref={image4Ref}
          className="project-wide-image project-image-medium project-section-spacing"
          style={{
            maxWidth: '1100px',
            width: '100%',
            height: '400px',
            margin: '0 auto 100px',
            borderRadius: '4px',
            overflow: 'hidden',
            opacity: image4Visible ? 1 : 0,
            transform: image4Visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <img
            src="/images/projects/swipe-save/image-5.png"
            alt="Competitor analysis"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Pain Points Section */}
        <div
          ref={textSection4Ref}
          className="project-content-padding project-section-spacing"
          style={{
            marginBottom: '100px',
            paddingLeft: '226px',
            maxWidth: '826px',
          }}
        >
          <p
            className="font-display font-bold project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              marginBottom: '0',
              opacity: textSection4Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            Pain Points I Wanted to Solve
          </p>
          <ul
            className="font-sans font-light project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              listStyleType: 'disc',
              paddingLeft: '30px',
              marginBottom: '16px',
              opacity: textSection4Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out 100ms',
            }}
          >
            <li>I want to know exactly where my money goes</li>
            <li>Auto-categorisation is unreliable</li>
            <li>Spreadsheets and manual uploads feel like boring admin</li>
            <li>Effortless bank connectivity is essential</li>
            <li>Budgeting should feel fun, not like a chore</li>
            <li>Staying consistent should be easy</li>
            <li>I don't want to be sold financial products</li>
          </ul>
          <p
            className="font-sans font-light project-text"
            style={{
              fontSize: '20px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              opacity: textSection4Visible ? 1 : 0,
              transition: 'opacity 800ms ease-out 200ms',
            }}
          >
            Of these, bank connectivity was by far the most challenging problem to solve so I focused on that first.
          </p>
        </div>

        {/* Plaid Integration Section with Side Portrait */}
        <div
          ref={textSection5Ref}
          className="project-two-column project-content-padding"
          style={{
            display: 'flex',
            gap: '95px',
            marginBottom: '100px',
            paddingLeft: '74px',
          }}
        >
          {/* Left side - Phone mockup with video */}
          <div
            ref={sideImage2Ref}
            className="project-side-portrait"
            style={{
              width: '405px',
              height: '542px',
              borderRadius: '4px',
              backgroundColor: '#2d3436',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              opacity: sideImage2Visible ? 1 : 0,
              transform: sideImage2Visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            >
              <source src="/images/projects/swipe-save/plaid-demo.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="project-column" style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '16px',
                opacity: textSection5Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              I integrated Plaid, a service that allows apps to connect to thousands of consumer banks across the US, UK, and Europe via API. Plaid is used by well-known products such as Venmo, Robinhood, Chime, Acorns, and Coinbase.
            </p>

            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '16px',
                opacity: textSection5Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 100ms',
              }}
            >
              I successfully connected Swipe Save to Plaid's sandbox environment, allowing the app to authenticate with test banks and display mock transaction data. This proved the technical feasibility of the core experience.
            </p>

            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '16px',
                opacity: textSection5Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 200ms',
              }}
            >
              (See screen recording of an early local build running on my iPhone and connecting to the Plaid sandbox.)
            </p>

            <p
              className="font-sans font-light project-text"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: textSection5Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 300ms',
              }}
            >
              The next step is applying for access to Plaid's production API. To be approved, the app must meet a series of compliance and security requirements—work I'm actively continuing as I move towards launch.
            </p>
          </div>
        </div>

        {/* Fourth Full-Width Image - 832px */}
        <div
          ref={image5Ref}
          className="project-image-large project-section-spacing"
          style={{
            width: '100%',
            height: '832px',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '64px',
            opacity: image5Visible ? 1 : 0,
            transform: image5Visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <img
            src="/images/projects/swipe-save/image-6.png"
            alt="Plaid integration overview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <Footer
        onContactClick={() => setIsContactOpen(true)}
      />
    </div>
  );
}
