'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/header';
import { ProjectPreview } from '@/components/ui/project-preview';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { AppointmentForm } from '@/components/ui/appointment-form';
import { AppointmentContactForm } from '@/components/ui/appointment-contact-form';
import { SuccessMessage } from '@/components/ui/success-message';

export default function Projects() {
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
    <>
      <style>
        {`
          .projects-title-section {
            padding-top: 100px;
            padding-bottom: 100px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }

          .projects-tagline {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 20px;
            line-height: 100%;
            color: var(--brand-black);
            margin: 0;
          }

          .projects-title {
            font-family: DM Sans, sans-serif;
            font-weight: 400;
            font-size: 84px;
            line-height: 90px;
            color: var(--brand-black);
            margin: 0;
          }

          .projects-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            margin-bottom: 100px;
            width: 100%;
            max-width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
          }

          @media (max-width: 900px) {
            .projects-title-section {
              padding-top: 80px;
              padding-bottom: 80px;
            }

            .projects-title {
              font-size: 56px;
              line-height: 60px;
            }

            .projects-list {
              margin-bottom: 80px;
              padding: 0 12px;
            }
          }

          @media (max-width: 600px) {
            .projects-title-section {
              padding-top: 60px;
              padding-bottom: 60px;
            }

            .projects-title {
              font-size: 42px;
              line-height: 46px;
            }

            .projects-list {
              margin-bottom: 60px;
              padding: 0 8px;
            }
          }

          @media (max-width: 480px) {
            .projects-title-section {
              padding-top: 40px;
              padding-bottom: 40px;
            }

            .projects-title {
              font-size: 32px;
              line-height: 36px;
            }

            .projects-list {
              margin-bottom: 40px;
              padding: 0 8px;
            }
          }
        `}
      </style>
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

        {/* Projects Title */}
        <div className="projects-title-section">
          <p className="projects-tagline">
            All things <strong style={{ fontWeight: 700 }}>Automotive.</strong>
          </p>
          <h1 className="projects-title">
            Projects
          </h1>
        </div>

        {/* Project Previews */}
        <div className="projects-list">
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

      {/* Footer */}
      <Footer
        onAppointmentClick={() => {
          setShowBackButton(false);
          setIsAppointmentOpen(true);
        }}
        onContactClick={() => {
          setShowBackButton(false);
          setIsContactOpen(true);
        }}
      />

      {/* Menu Overlay */}
      {isMenuOpen && (
        <>
          <style>
            {`
              .menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 1000;
                padding: 16px;
              }

              @media (max-width: 563px) {
                .menu-overlay {
                  padding: 0 !important;
                }
              }
            `}
          </style>
          <div className="menu-overlay">
            <Menu
              onClose={() => setIsMenuOpen(false)}
              onAppointmentClick={() => {
                setIsMenuOpen(false);
                setShowBackButton(true);
                setIsAppointmentOpen(true);
              }}
              onContactClick={() => {
                setIsMenuOpen(false);
                setShowBackButton(true);
                setIsContactOpen(true);
              }}
            />
          </div>
        </>
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
          <SuccessMessage onClose={() => setIsSuccessOpen(false)} />
        </div>
      )}

      {/* Contact Success Message Overlay */}
      {isContactSuccessOpen && (
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
          <SuccessMessage
            title="Thanks for your message!"
            message={
              <>
                We've received your enquiry and will reply shortly.
                <br />
                <br />
                A confirmation email is on its way — check your junk folder if you don't see it.
              </>
            }
            onClose={() => setIsContactSuccessOpen(false)}
          />
        </div>
      )}
    </div>
    </>
  );
}
