"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Menu } from "@/components/ui/menu";
import { ContactForm } from "@/components/ui/contact-form";
import { AppointmentForm } from "@/components/ui/appointment-form";
import { AppointmentContactForm } from "@/components/ui/appointment-contact-form";

export default function RangeRoverProject() {
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
  const [dashboardImageVisible, setDashboardImageVisible] = useState(false);
  const [interiorImageVisible, setInteriorImageVisible] = useState(false);
  const [sideImageVisible, setSideImageVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const textSection1Ref = useRef<HTMLDivElement>(null);
  const textSection2Ref = useRef<HTMLDivElement>(null);
  const dashboardImageRef = useRef<HTMLDivElement>(null);
  const interiorImageRef = useRef<HTMLDivElement>(null);
  const sideImageRef = useRef<HTMLDivElement>(null);

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

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Hero image parallax
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centerOffset = scrollProgress - 0.5;
          setImageTransform(centerOffset * -40);
        }
      }

      // Dashboard image parallax
      if (dashboardImageRef.current) {
        const rect = dashboardImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centerOffset = scrollProgress - 0.5;
          setDashboardTransform(centerOffset * 100);
        }
      }

      // Interior image parallax
      if (interiorImageRef.current) {
        const rect = interiorImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centerOffset = scrollProgress - 0.5;
          setInteriorTransform(centerOffset * 100);
        }
      }

      // Side portrait image parallax
      if (sideImageRef.current) {
        const rect = sideImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centerOffset = scrollProgress - 0.5;
          setSideTransform(centerOffset * 100);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      if (dashboardImageRef.current) {
        const rect = dashboardImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setDashboardImageVisible(true);
        }
      }

      if (interiorImageRef.current) {
        const rect = interiorImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setInteriorImageVisible(true);
        }
      }

      if (sideImageRef.current) {
        const rect = sideImageRef.current.getBoundingClientRect();
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          setSideImageVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header
          onMenuClick={() => setIsMenuOpen(true)}
          onContactClick={() => setIsContactOpen(true)}
        />
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          padding: '16px'
        }}>
          <Menu
            onClose={() => setIsMenuOpen(false)}
            onAppointmentClick={() => {
              setIsMenuOpen(false);
              setIsAppointmentOpen(true);
            }}
            onContactClick={() => {
              setIsMenuOpen(false);
              setIsContactOpen(true);
            }}
          />
        </div>
      )}

      {/* Contact Form Overlay */}
      {isContactOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          padding: '16px'
        }}>
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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            padding: '16px'
          }}
        >
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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            padding: '16px'
          }}
        >
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
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          {/* Large left image */}
          <div
            style={{
              flex: '1',
              height: '620px',
              borderRadius: '4px',
              overflow: 'hidden',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/projects/range-rover/main.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transform: `translateY(${imageTransform}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>

          {/* Right column with 2 images */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              width: '404px',
            }}
          >
            <div
              style={{
                height: '306px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundImage: 'url(/images/projects/range-rover/preview-2.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms ease-out 100ms, transform 800ms ease-out 100ms',
              }}
            />
            <div
              style={{
                height: '306px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundImage: 'url(/images/projects/range-rover/top%20section%20image%203.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms',
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
            className="font-display font-light"
            style={{
              fontSize: '64px',
              lineHeight: '1.4',
              color: 'var(--brand-black)',
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out',
            }}
          >
            Range Rover
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              opacity: titleVisible ? 1 : 0,
              transition: 'opacity 800ms ease-out 100ms',
            }}
          >
            <p
              className="font-sans font-light"
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
          style={{
            display: 'flex',
            gap: '121px',
            marginBottom: '100px',
          }}
        >
          {/* Left: Tags/Categories */}
          <div style={{ width: '300px' }}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: detailsVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              Instrument Cluster
              <br />
              Head Up Display (HUD)
              <br />
              Human Machine Interface
              <br />
              User Centre Design
              <br />
              Design Systems
            </p>
          </div>

          {/* Right: Description */}
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: detailsVisible ? 1 : 0,
                transition: 'opacity 800ms ease-out 100ms',
              }}
            >
              While the work itself is confidential, my role as a UX Designer at Jaguar Land rover (JLR) has focused on designing the next generation of digital instrument clusters and head-up displays for upcoming Range Rover and Defender models scheduled for release between 2026–2030.
            </p>
          </div>
        </div>

        {/* Large Dashboard Image */}
        <div
          ref={dashboardImageRef}
          style={{
            width: '1100px',
            height: '400px',
            margin: '0 auto 100px',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#d9d9d9',
            opacity: dashboardImageVisible ? 1 : 0,
            transform: dashboardImageVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/projects/range-rover/wide%20image.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              transform: `translateY(${dashboardTransform}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        {/* Two Column Text Section */}
        <div
          ref={textSection1Ref}
          style={{
            display: 'flex',
            gap: '122px',
            marginBottom: '100px',
            paddingLeft: '226px',
          }}
        >
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: textSection1Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              I designed the new instrument cluster and head-up display experiences using a user-centred design approach, incorporating the latest internal research on attention management and driver distraction. My focus was on creating layouts, interaction patterns, and visual hierarchies that support safe glance behaviour and minimise cognitive load, ensuring
            </p>
          </div>

          <div style={{ width: '300px' }}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: textSection1Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 100ms',
              }}
            >
              essential information is always clear, accessible, and appropriately prioritised across different driving contexts.
            </p>
          </div>
        </div>

        {/* Large Interior Image */}
        <div
          ref={interiorImageRef}
          style={{
            width: '100%',
            height: '830px',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#d9d9d9',
            marginBottom: '100px',
            opacity: interiorImageVisible ? 1 : 0,
            transform: interiorImageVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/projects/range-rover/Large.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              transform: `translateY(${interiorTransform}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        {/* Feature Teams Integration Section */}
        <div
          ref={textSection2Ref}
          style={{
            display: 'flex',
            gap: '95px',
            marginBottom: '64px',
            paddingLeft: '74px',
          }}
        >
          <div style={{ flex: 1, maxWidth: '600px' }}>
            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '50px',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out',
              }}
            >
              I developed a layout that allow multiple feature teams to integrate seamlessly into the cluster environment. This includes dedicated areas for Advanced Driver Assistance Systems (ADAS) to present situational awareness, adaptable regions for the native TomTom-powered navigation system, and clear safe areas for Apple CarPlay and Android Auto so connected experiences coexist smoothly with the vehicle's own UI.
            </p>

            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                marginBottom: '50px',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 150ms',
              }}
            >
              To support brand differentiation, I implemented a multi-theme system that allows quick switching between visual identities as well as light/dark modes. This system was built using variables and tokens, allowing teams to deliver multiple branded experiences without duplicating work.
            </p>

            <p
              className="font-sans font-light"
              style={{
                fontSize: '20px',
                lineHeight: '1.4',
                color: 'var(--brand-black)',
                opacity: textSection2Visible ? 1 : 0,
                transition: 'opacity 800ms ease-out 300ms',
              }}
            >
              To support brand differentiation, I implemented a multi-theme system that allows quick switching between visual identities as well as light/dark modes. This system was built using variables and tokens, allowing teams to deliver multiple branded experiences without duplicating work.
            </p>
          </div>

          {/* Right side image */}
          <div
            ref={sideImageRef}
            style={{
              width: '405px',
              height: '542px',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#d9d9d9',
              opacity: sideImageVisible ? 1 : 0,
              transform: sideImageVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/projects/range-rover/Portrait.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                transform: `translateY(${sideTransform}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      <Footer
        onAppointmentClick={() => setIsAppointmentOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />
    </div>
  );
}
