'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';

const bullets = [
  "Translated user research findings into UX design decisions for a full redesign of Feed It Back's case management software.",
  'Designed responsive interfaces for customer experience managers across mobile, tablet, and desktop.',
  'Delivered 100+ greyscale screens covering every user flow and state across all three breakpoints.',
  'Built a structured atomic design system in Figma to enable seamless handoff to the UI designer.',
];

export default function FeedItBackProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`
        .overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}

        .fib-summary {
          display: grid;
          grid-template-columns: 220px 1fr 1fr;
          gap: 40px;
          padding: 0 25px;
          margin-top: 150px;
        }

        .fib-summary-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .fib-summary-para {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
          max-width: 400px;
        }

        .fib-bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-top: 16px;
        }

        .fib-bullet + .fib-bullet {
          border-top: 0.5px solid #9C9C9C;
          margin-top: 16px;
        }

        .fib-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
        }

        .fib-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .fib-images {
          display: flex;
          gap: 8px;
          padding: 0 25px;
          margin-top: 80px;
          height: 533px;
        }

        .fib-img-left {
          flex: 361;
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        .fib-img-right {
          flex: 804;
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        @media (max-width: 1024px) {
          .fib-summary { grid-template-columns: 1fr 1fr; }
          .fib-summary-title { grid-column: 1 / -1; }
          .fib-images { height: 380px; }
        }

        @media (max-width: 768px) {
          .fib-summary { grid-template-columns: 1fr; gap: 32px; margin-top: 80px; }
          .fib-images { height: 260px; margin-top: 48px; }
        }
      `}</style>

      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>

      <ProjectHero
        title="Feed It Back"
        year="2020"
        brand="Full Clarity"
        industry="Hospitality"
        directors={['Ed Kemp']}
        deliverables={['Web App', 'UX Design', 'Wireframes']}
        heroImage=""
      />

      {/* Summary section */}
      <div className="fib-summary">
        <h2 className="fib-summary-title">Summary</h2>

        <p className="fib-summary-para">
          Redesigned the case management platform for Feed It Back, a hospitality guest feedback tool used by major restaurant chains. Delivered the user experience design by transferring user research findings, into user flows, wireframes and full fidelity designs, for improved navigation, usability, and mobile compatibility.
        </p>

        <div style={{ maxWidth: '436px' }}>
          {bullets.map((text, i) => (
            <div key={i} className="fib-bullet">
              <div className="fib-bullet-icon" />
              <span className="fib-bullet-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two images */}
      <div className="fib-images">
        <div className="fib-img-left" />
        <div className="fib-img-right" />
      </div>

      <div style={{ height: '150px' }} />

      <Footer onContactClick={() => setIsContactOpen(true)} />

      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
