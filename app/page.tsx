'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/ui/hero-section';
import { ProcessSectionWithScroll } from '@/components/ui/process-section-with-scroll';
import { Banner } from '@/components/ui/banner';
import { ProjectPreview } from '@/components/ui/project-preview';
import { History } from '@/components/ui/history';
import { TileProjects } from '@/components/ui/tile-projects';
import { TileAbout } from '@/components/ui/tile-about';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { AppointmentForm } from '@/components/ui/appointment-form';
import { AppointmentContactForm } from '@/components/ui/appointment-contact-form';
import { SuccessMessage } from '@/components/ui/success-message';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAppointmentContactOpen, setIsAppointmentContactOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isContactSuccessOpen, setIsContactSuccessOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<{ date?: Date; time?: string }>({});
  const [showBackButton, setShowBackButton] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageMargin, setImageMargin] = useState({ normal: 100, negative: -100 });
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = React.useRef<HTMLDivElement>(null);

  // Detect mobile and calculate responsive margins based on window width
  React.useEffect(() => {
    const updateMarginsAndMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1024);

      if (width <= 480) {
        setImageMargin({ normal: 32, negative: -32 });
      } else if (width <= 768) {
        setImageMargin({ normal: 40, negative: -40 });
      } else if (width <= 1024) {
        setImageMargin({ normal: 60, negative: -60 });
      } else {
        setImageMargin({ normal: 100, negative: -100 });
      }
    };

    updateMarginsAndMobile();
    window.addEventListener('resize', updateMarginsAndMobile);
    return () => window.removeEventListener('resize', updateMarginsAndMobile);
  }, []);

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

  React.useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      // Disable parallax on mobile
      if (isMobile) {
        setImageScale(1);
        setImageOpacity(1);
        return;
      }

      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the image has scrolled past the top of viewport
      const scrollProgress = Math.max(0, -rect.top / windowHeight);

      // Scale down from 1 to 0.5 as it scrolls up
      const newScale = Math.max(0.5, 1 - scrollProgress * 0.5);
      setImageScale(newScale);

      // Fade out as it scales down
      const newOpacity = Math.max(0, 1 - scrollProgress * 1.5);
      setImageOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
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
      <HeroSection onContactClick={() => {
        setShowBackButton(false);
        setIsContactOpen(true);
      }} />

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
          I create bespoke solutions for automotive specialists who value trust, precision, and attention to detail. No templates — just refined experiences, tailored to your needs and built around how your business works.
        </p>
      </div>

      {/* Full-width Image with 90px padding */}
      <style>
        {`
          .full-width-image-container {
            padding-left: 90px;
            padding-right: 90px;
            perspective: 1000px;
            position: relative;
            z-index: 1;
            transition: margin-bottom 0.3s ease-out;
          }

          .full-width-image {
            width: 100%;
            height: 600px;
            background-color: #333;
            background-size: cover;
            background-position: center;
            transition: transform 0.1s ease-out, opacity 0.1s ease-out;
            transform-origin: center center;
            border-radius: 8px;
          }

          /* Tablet and below */
          @media (max-width: 1024px) {
            .full-width-image-container {
              padding-left: 40px;
              padding-right: 40px;
              margin-bottom: 60px;
            }

            .full-width-image {
              height: 450px;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .full-width-image-container {
              padding-left: 24px;
              padding-right: 24px;
              margin-bottom: 40px;
            }

            .full-width-image {
              height: 350px;
            }
          }

          /* Small mobile */
          @media (max-width: 480px) {
            .full-width-image-container {
              padding-left: 16px;
              padding-right: 16px;
              margin-bottom: 32px;
            }

            .full-width-image {
              height: 250px;
            }
          }
        `}
      </style>
      <div
        className="full-width-image-container"
        style={{
          marginBottom: imageScale < 0.8 ? `${imageMargin.negative}px` : `${imageMargin.normal}px`
        }}
      >
        <div
          ref={imageRef}
          className="full-width-image"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=80)',
            transform: `scale(${imageScale})`,
            opacity: imageOpacity
          }}
        />
      </div>

      {/* Process Section + Banner - Scroll-driven */}
      <div style={{ position: 'relative', zIndex: imageScale < 0.8 ? 2 : 0 }}>
        <ProcessSectionWithScroll onContactClick={() => {
          setShowBackButton(false);
          setIsContactOpen(true);
        }} />
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
          title="Range Rover"
          description="Designed next-generation digital displays for upcoming Range Rover and Defender models, creating an atomic design system and layout framework informed by user-centred research, attention management, and cross-team integration."
          mainImage="/images/projects/range-rover/main.jpg"
          previewImage1="/images/projects/range-rover/preview-1.jpg"
          previewImage2="/images/projects/range-rover/preview-2.jpg"
          projectLink="/projects/range-rover"
        />
        <ProjectPreview
          title="Avinya"
          description="Design system with three Avinya specific UI themes, enabling Tata Motors to deliver a distinct visual identity through a unified software."
          mainImage="/images/projects/Avinya/Hero.jpg"
          previewImage1="/images/projects/Avinya/Image 1.png"
          previewImage2="/images/projects/Avinya/Image 2.png"
          projectLink="/projects/avinya"
        />
        <ProjectPreview
          title="Defender"
          description="Explored future off-road experiences for upcoming Defender models, contributing concepts that unify cameras, terrain systems and new features into a seamless, engaging cockpit experience focused on usability, confidence and adventure."
          mainImage="/images/projects/Defender/Hero.png"
          previewImage1="/images/projects/Defender/image%203.jpg"
          previewImage2="/images/projects/Defender/image%202.jpg"
          projectLink="/projects/defender"
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
            date: "2022 - 2025",
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

      {/* Explore Further Section */}
      <>
        <style>
          {`
            .explore-section {
              width: 100%;
              margin-top: 100px;
              margin-bottom: 80px;
              padding-left: 16px;
              padding-right: 16px;
            }

            .explore-label {
              font-family: Inter, sans-serif;
              font-weight: 400;
              font-size: 20px;
              line-height: 1.4;
              color: var(--brand-black);
              margin-bottom: 24px;
              text-align: center;
            }

            .explore-heading {
              font-size: 42px;
              line-height: 1.3;
              color: var(--brand-black);
              margin-bottom: 50px;
              text-align: center;
              max-width: 843px;
              margin-left: auto;
              margin-right: auto;
            }

            @media (max-width: 900px) {
              .explore-section {
                margin-top: 80px;
                margin-bottom: 60px;
              }

              .explore-label {
                font-size: 18px;
              }

              .explore-heading {
                font-size: 36px;
                margin-bottom: 40px;
              }
            }

            @media (max-width: 600px) {
              .explore-section {
                margin-top: 60px;
                margin-bottom: 50px;
              }

              .explore-label {
                font-size: 16px;
              }

              .explore-heading {
                font-size: 28px;
                margin-bottom: 32px;
              }
            }

            @media (max-width: 480px) {
              .explore-section {
                margin-top: 40px;
                margin-bottom: 40px;
              }

              .explore-label {
                font-size: 14px;
              }

              .explore-heading {
                font-size: 24px;
                margin-bottom: 24px;
              }
            }
          `}
        </style>
        <div className="explore-section">
          <p className="explore-label">
            Explore Further
          </p>
          <h2 className="explore-heading">
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300
            }}>I'm easy to reach and even easier to work with — let's chat all things </span>
            <span style={{
              fontFamily: 'PT Serif, serif',
              fontWeight: 700,
              fontStyle: 'italic'
            }}>Automotive.</span>
          </h2>
        </div>
      </>

      {/* Projects and About Tiles */}
      <>
        <style>
          {`
            .tiles-container {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 32px;
              margin: 80px 16px;
            }

            @media (max-width: 1280px) {
              .tiles-container {
                flex-direction: column;
                margin: 60px 16px;
                gap: 24px;
              }
            }

            @media (max-width: 900px) {
              .tiles-container {
                margin: 50px 16px;
                gap: 20px;
              }
            }

            @media (max-width: 600px) {
              .tiles-container {
                margin: 40px 16px;
                gap: 16px;
              }
            }

            @media (max-width: 480px) {
              .tiles-container {
                margin: 30px 16px;
              }
            }
          `}
        </style>
        <div className="tiles-container">
          <TileProjects />
          <TileAbout />
        </div>
      </>

      {/* Footer */}
      <Footer
        onContactClick={() => {
          setShowBackButton(false);
          setIsContactOpen(true);
        }}
      />

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
