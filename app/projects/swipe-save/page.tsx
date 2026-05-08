'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';

export default function TrickTrainerProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Trick Trainer" year="2025" brand="Personal Project" industry="AI / ML" directors={['Will Fuller']} deliverables={['iOS App', 'Pose Detection', 'ML Model']} heroImage="" />
      <ProjectSummary
        paragraph="Building a fun side project — a trick trainer app built with my Black Labrador. It is a trick recognition tool that uses pose detection to detect when he has completed a command, with the goal of eventually having it entertain him autonomously."
        bullets={[
          { text: 'Leveraging machine learning and pose detection models.' },
          { text: 'Using the latest AI tools to bring concepts to life rapidly.' },
          { text: 'Proof of concept build completed and tested with real results.' },
          { text: 'Passion project exploring the intersection of AI and product design.' },
        ]}
      />
      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
