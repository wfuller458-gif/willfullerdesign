'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Menu } from '@/components/ui/menu';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';
import { ProjectSection } from '@/components/ui/project-section';
import { ProjectSectionWithGallery } from '@/components/ui/project-section-with-gallery';
import { ProjectSectionAutoSlider } from '@/components/ui/project-section-auto-slider';
import { ProjectGalleryStrip } from '@/components/ui/project-gallery-strip';

export default function FeedItBackProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Feed It Back" year="2020" brand={['Feed It Back', 'Full Clarity']} industry="Hospitality" directors={['Ed Kemp', 'Jon Hewines']} deliverables={['User Research Translation', 'Responsive Interface Design', 'Greyscale Screen Delivery', 'Atomic Design System']} heroImage="" />
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

      <ProjectSectionWithGallery
        title="Low Fidelity Wireframes"
        paragraphs={[
          'I was assigned the case management interface which brings together all the social media, TripAdvisor and email reviews the restaurant chains receive. Ed scoped out a sitemap, with the case management area being the main tool within the platform.',
          'I began quickly sketching possible layouts for this screen which accommodate a navigation bar and all the features required to solve the pain points identified from the user research.',
        ]}
        bullets={['Site map', 'Screen layout', 'Core functionality']}
        images={[
          { label: 'Site Map', width: 361, height: 533 },
          { label: 'Initial Layout', width: 804, height: 533 },
          { label: 'Key Optimisations - Flags, Tags and Templates', width: 804, height: 533 },
        ]}
        galleryHeight={460}
      />

      <ProjectSection
        title="Design System"
        paragraphs={[
          'With a clear layout approved by Ed I began working in Figma. I split the screen up into its core elements, navigation bar, sidebar, inbox items, WYSIWYG text editor and case viewer.',
          'Many smaller details were still missing from the design, I gradually built out more and more ensuring all the small "atoms" such icons, tags, flags and user profile components were created. The smaller components fed into the "molecules" → "organisms" → "templates" allowing me to assemble full screen components as "pages".',
          'Components were well organised in Figma with all properties clearly named. This takes some time to set up but is extremely efficient in the long run.',
        ]}
        bullets={[
          { text: 'Atoms' },
          { text: 'Molecules' },
          { text: 'Organisms' },
          { text: 'Templates' },
          { text: 'Pages' },
        ]}
      />

      <ProjectSection
        title="Greyscale UI"
        paragraphs={[
          'With full screen components completed in the form of "pages" I was able to start working up the states and flows required for the case management platform. Regular reviews were conducted with the client once key milestones of the designs were reached.',
          'Firstly I ensure that the design worked across all three breakpoints. I used auto layout and constraints in components to make them reusable across breakpoints. Custom mobile components were created when needed.',
        ]}
        bullets={[
          { text: 'Greyscale UI keeps the focus on interaction and flow, not visual polish.' },
        ]}
      />

      <ProjectSectionAutoSlider
        title="User Interaction"
        paragraphs={[
          'During this phase I created the user interactions and flows enabling the end user to achieve their goal of responding to all reviews and opening cases against negative reviews.',
          'The design system allowed me to pull together every state quickly and I could easily go back and add additional variants to components in order to achieve all user flows and states.',
        ]}
      />

      <ProjectSectionAutoSlider
        title="Finished UI"
        paragraphs={[
          'Simultaneously to my work a UI designer from Full Clarity began updating the design system components. They applied Feed It Backs branding, logos, and finalised colours and the design of every component.',
          'Since the components were created in an Atomic fashion all UI updates cascaded through every screen, user interaction and flow I had created.',
        ]}
        showDots={false}
      />

      <ProjectSectionWithGallery
        title="Delivery"
        paragraphs={[
          "The entire design was reviewed extensively with the client and any adjustments and feedback were actioned quickly. Handoff was made to Feed It Back who's internal developers were handling development of the platform.",
        ]}
        bullets={[]}
        images={[
          { label: 'Inbox', width: 533, height: 533 },
          { label: 'Watchers', width: 533, height: 533 },
          { label: 'Topic Tags', width: 533, height: 533 },
          { label: 'Focused View', width: 533, height: 533 },
        ]}
        galleryHeight={460}
      />

      <div style={{ marginTop: 100 }}>
        <ProjectGalleryStrip
          reversed
          galleryHeight={460}
          images={[
            { label: 'Sidebar', width: 360, height: 533 },
            { label: 'Inbox', width: 360, height: 533 },
            { label: 'Case History', width: 360, height: 533 },
            { label: 'Tags', width: 360, height: 533 },
            { label: 'Watchers', width: 360, height: 533 },
            { label: 'Date Filter', width: 360, height: 533 },
          ]}
        />
      </div>

      <ProjectSection
        title="Outcome"
        paragraphs={[
          "This project enabled a significant transformation of Feed It Back's case management platform, helping Feed It Back expand its presence within the UK hospitality market.",
          'This positioned Feed It Back as a key player in the rapidly growing customer feedback industry, attracting substantial new investment to support further growth and expansion.',
        ]}
        bullets={[
          { text: 'Receives millions of reviews from top hospitality brands' },
          { text: 'Multi million investment secured after platform overhaul' },
          { text: "Feed It Back's platform continues to grow" },
        ]}
        showImage={false}
      />

      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isMenuOpen && <div className="overlay-wrapper"><Menu onClose={() => setIsMenuOpen(false)} onContactClick={() => { setIsMenuOpen(false); setIsContactOpen(true); }} /></div>}
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
