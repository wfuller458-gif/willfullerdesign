'use client';
import { useState } from 'react';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { ContactForm } from '@/components/ui/contact-form';
import { ProjectHero } from '@/components/ui/project-hero';
import { ProjectSummary } from '@/components/ui/project-summary';
import { ProjectSection } from '@/components/ui/project-section';
import { ProjectSectionWithGallery } from '@/components/ui/project-section-with-gallery';
import { ProjectSectionAutoSlider } from '@/components/ui/project-section-auto-slider';
import { ProjectGalleryStrip } from '@/components/ui/project-gallery-strip';

const BASE = '/images/projects/feed-it-back';

export default function FeedItBackProject() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onContactClick={() => setIsContactOpen(true)} />
      </div>
      <ProjectHero title="Feed It Back" year="2020" brand={['Feed It Back', 'Full Clarity']} industry="Hospitality" directors={['Ed Kemp', 'Jon Hewines']} deliverables={['User Research Translation', 'Responsive Interface Design', 'Greyscale Screen Delivery', 'Atomic Design System']} heroImage={`${BASE}/image-1.webp`} />
      <ProjectSummary
        paragraph="Feed It Back's case management platform had a problem. Email lived outside the system. Historical cases were buried. Every task took too many steps, too much time, too much manual effort. For customer experience managers handling hundreds of reviews a day across some of the UK's biggest restaurant chains that wasn't just frustrating, it was costing them business. My job was to fix it. Not with multiple screens, but with one inbox."
        bullets={[
          { text: 'Unified social, TripAdvisor and email into one condensed inbox', icon: '/icons/Chat.svg' },
          { text: 'Designed 100+ screens across mobile, tablet and desktop', icon: '/icons/Responsive.svg' },
          { text: '100+ greyscale screens covering every user flow and state', icon: '/icons/Greyscale.svg' },
          { text: 'Built an atomic design system in Figma for seamless handoff', icon: '/icons/Atom.svg' },
        ]}
        imageLeft={`${BASE}/summary-1.webp`}
        imageRight={`${BASE}/summary-2.webp`}
      />
      <ProjectSection
        title="User Research"
        paragraphs={[
          'Before a single wireframe was drawn, the research told a clear story. Users were overwhelmed by friction jumping between systems, hunting for closed cases, entering data by hand that should have been automatic. Every pain point became the blueprint for the platform overhaul. Every design decision that followed was made in direct response to what users actually experienced.',
        ]}
        bullets={[
          { text: 'Historical and closed cases were hard to find', icon: '/icons/Archive.svg' },
          { text: 'Email lived outside the core system', icon: '/icons/Email.svg' },
          { text: 'Too many steps to complete basic tasks', icon: '/icons/Steps.svg' },
          { text: 'Everyday tasks took far longer than they should', icon: '/icons/Time.svg' },
          { text: 'Data entry was manual with no automation in place', icon: '/icons/Data.svg' },
        ]}
        image={`${BASE}/user-research.webp`}
      />

      <ProjectSectionWithGallery
        title="Low Fidelity Wireframes"
        paragraphs={[
          'With the problems defined, I started fast rough sketches exploring how one screen could carry the full weight of the platform navigation, inbox, case viewer, email, and review management all within a single, condensed interface. The challenge was to make every feature, just one interaction away.',
        ]}
        bullets={[
          { text: 'Site map', icon: '/icons/1.svg' },
          { text: 'Screen layout', icon: '/icons/2.svg' },
          { text: 'Core functionality', icon: '/icons/3.svg' },
        ]}
        images={[
          { src: `${BASE}/site-map.webp`, label: 'Site Map', width: 361, height: 533 },
          { src: `${BASE}/initial-layout.webp`, label: 'Initial Layout', width: 804, height: 533 },
          { src: `${BASE}/key-optimisations.webp`, label: 'Key Optimisations - Flags, Tags and Templates', width: 804, height: 533 },
        ]}
        galleryHeight={460}
      />

      <ProjectSection
        title="Design System"
        paragraphs={[
          'With a layout approved I moved into Figma, building from the ground up. Atoms first icons, tags, flags, user profile components. Then molecules, organisms, templates and finally full pages. Every component named, every property documented. It took a methodical approach to set up but paid back exponentially when changes needed to cascade across 100+ screens instantly.',
        ]}
        bullets={[
          { text: 'Atoms', icon: '/icons/Atom.svg' },
          { text: 'Molecules', icon: '/icons/Molecules.svg' },
          { text: 'Organisms', icon: '/icons/Organisums.svg' },
          { text: 'Templates', icon: '/icons/Template.svg' },
          { text: 'Pages', icon: '/icons/Pages.svg' },
        ]}
        image={`${BASE}/design-system.webp`}
      />

      <ProjectSectionAutoSlider
        title="User Interaction"
        paragraphs={[
          'Designing in greyscale kept the focus where it needed to be on interaction and flow, not visual polish. I worked across all three breakpoints simultaneously, using auto layout and constraints to make components reusable across mobile, tablet and desktop. Every state, every flow, every edge case accounted for before a single brand colour was applied.',
        ]}
        images={[`${BASE}/greyscale-ui.webp`, `${BASE}/user-interaction-1.webp`, `${BASE}/user-interaction-2.webp`]}
      />

      <ProjectSectionAutoSlider
        title="Finished UI"
        paragraphs={[
          "While I completed the UX, a UI designer from Full Clarity applied Feed It Back's visual identity to the design system. Since every screen was built atomically, the entire project updated at once. Branding, colour, and visual polish cascading through every interaction and flow without a single screen needing to be rebuilt.",
        ]}
        images={[`${BASE}/finished-ui.webp`, `${BASE}/finished-ui.webp`]}
        showDots={false}
        cycle={false}
      />

      <ProjectSectionWithGallery
        title="Delivery"
        paragraphs={[
          "Every screen reviewed, every piece of feedback actioned. When the time came, handoff was clean a fully documented Figma design system and 100+ screens handed directly to Feed It Back's internal development team, ready to build.",
        ]}
        bullets={[]}
        images={[
          { src: `${BASE}/delivery-inbox.webp`, label: 'Inbox', width: 533, height: 533 },
          { src: `${BASE}/delivery-watchers.webp`, label: 'Watchers', width: 533, height: 533 },
          { src: `${BASE}/delivery-topic-tags.webp`, label: 'Topic Tags', width: 533, height: 533 },
          { src: `${BASE}/delivery-focused-view.webp`, label: 'Focused View', width: 533, height: 533 },
        ]}
        galleryHeight={460}
      />

      <div style={{ marginTop: 100 }}>
        <ProjectGalleryStrip
          reversed
          galleryHeight={460}
          images={[
            { src: `${BASE}/delivery-2-sidebar.webp`, label: 'Sidebar', width: 360, height: 533 },
            { src: `${BASE}/delivery-2-inbox.webp`, label: 'Inbox', width: 360, height: 533 },
            { src: `${BASE}/delivery-2-case-history.webp`, label: 'Case History', width: 360, height: 533 },
            { src: `${BASE}/delivery-2-tags.webp`, label: 'Tags', width: 360, height: 533 },
            { src: `${BASE}/delivery-2-watchers.webp`, label: 'Watchers', width: 360, height: 533 },
            { src: `${BASE}/delivery-2-date-filter.webp`, label: 'Date Filter', width: 360, height: 533 },
          ]}
        />
      </div>

      <ProjectSection
        title="Outcome"
        paragraphs={[
          "The platform transformation helped Feed It Back expand its presence across the UK hospitality market. Today millions of reviews from brands like Bill's, The Alchemist and Giggling Squid land in the inbox I designed. Shortly after the overhaul, Feed It Back secured multi million pound investment.",
        ]}
        bullets={[
          { text: 'Receives millions of reviews from top hospitality brands', icon: '/icons/Chat.svg' },
          { text: 'Multi million investment secured after platform overhaul', icon: '/icons/£.svg' },
          { text: "Feed It Back's platform continues to grow", icon: '/icons/Grow.svg' },
        ]}
        showImage={false}
      />

      <div style={{ height: '150px' }} />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      {isContactOpen && <div className="overlay-wrapper"><ContactForm onClose={() => setIsContactOpen(false)} onSubmit={() => setIsContactOpen(false)} /></div>}
    </div>
  );
}
