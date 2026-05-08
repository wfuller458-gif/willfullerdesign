'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';
import { ProjectSection } from '@/components/ui/project-section';

export default function FeedItBackProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Feed It Back" year="2020" brand="Full Clarity" industry="Hospitality" directors={['Ed Kemp']} deliverables={['Web App', 'UX Design', 'Wireframes']} heroImage="" />
      <ProjectSummary
        paragraph="Redesigned the case management platform for Feed It Back, a hospitality guest feedback tool used by major restaurant chains. Delivered the user experience design by transferring user research findings, into user flows, wireframes and full fidelity designs, for improved navigation, usability, and mobile compatibility."
        bullets={[
          { text: "Translated user research findings into UX design decisions for a full redesign of Feed It Back's case management software." },
          { text: 'Designed responsive interfaces for customer experience managers across mobile, tablet, and desktop.' },
          { text: 'Delivered 100+ greyscale screens covering every user flow and state across all three breakpoints.' },
          { text: 'Built a structured atomic design system in Figma to enable seamless handoff to the UI designer.' },
        ]}
      />
      <ProjectSection
        title="User Research"
        paragraphs={[
          'The user research conducted by Ed Kemp was a critical step in identifying key pain points and opportunities for improvement.',
          "Ed ensured user interviews covered various company sizes and usage scenarios. This comprehensive approach helped uncover the existing system's inefficiencies and unnecessary steps in the workflow.",
          'Insights were gathered and organised highlighting specific problems with the current system. These findings directly informed the UX redesign efforts, ensuring that the new system would address user needs more effectively and improve overall satisfaction.',
        ]}
        bullets={[
          { text: 'Users struggled to access historical and closed case information.' },
          { text: 'Email sat outside the core system, creating unnecessary friction.' },
          { text: 'Processes had too many steps, slowing users down.' },
          { text: 'Everyday tasks took far longer than they should.' },
          { text: 'Data entry was manual with no automation in place.' },
        ]}
      />

      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
