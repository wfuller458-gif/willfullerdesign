'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
export default function DefenderProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Off-Road Controls" year="2024" brand="Land Rover Defender" industry="Automotive" directors={['Ed Kemp', 'Jon Hewines']} deliverables={['Instrument Cluster', 'Head Up Display', 'Augmented Reality']} heroImage="" />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
