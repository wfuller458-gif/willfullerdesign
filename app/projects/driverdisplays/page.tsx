'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';

export default function DriverDisplaysProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Driver Displays" year="2023" brand="Land Rover" industry="Automotive" directors={['TBC']} deliverables={['Instrument Cluster', 'Head Up Display', 'Design System']} heroImage="/images/projects/driver-displays/image-1.webp" />
      <ProjectSummary
        paragraph="Designed future digital driver displays for Land Rover vehicles, with a focus on cognitive load and attention management. Also responsible for maintaining and updating existing displays to ensure continued saleability across global markets."
        bullets={[
          { text: 'Designs delivered for 120+ markets to 100,000+ vehicles.' },
          { text: 'Integrated Apple CarPlay and Android Auto across display surfaces.' },
          { text: 'Designed next generation driver displays for upcoming models.' },
          { text: 'Maintained and updated existing production displays for global markets.' },
        ]}
      />
      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
