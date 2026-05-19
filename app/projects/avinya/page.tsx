'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';

export default function TrainingPlatformProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Training Platform" year="2020" brand="Full Clarity" industry="Healthcare" directors={['Ed Kemp']} deliverables={['Web App', 'UX Design', 'Wireframes']} heroImage="/images/projects/training-platform/image-1.webp" />
      <ProjectSummary
        paragraph="Designed the user experience for a medical education platform for general practitioners and primary care clinicians, taking it from an in-person service to a fully digital solution. Transferred user interview findings into user flows, wireframes and full fidelity designs."
        bullets={[
          { text: '30,000 clinicians supported annually through the platform.' },
          { text: 'Enabling professionals to complete training fully digitally.' },
          { text: 'Transformed an in-person only service into a digital offering.' },
          { text: 'Delivered end-to-end UX from research through to high fidelity design.' },
        ]}
        imageLeft="/images/projects/training-platform/summary-1.webp"
        imageRight="/images/projects/training-platform/summary-2.webp"
      />
      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
