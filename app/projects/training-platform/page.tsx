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

const BASE = '/images/projects/training-platform';

export default function TrainingPlatformProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`.overlay-wrapper{position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.3);z-index:1000;padding:0}`}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onMenuClick={() => setIsMenuOpen(true)} onContactClick={() => setIsContactOpen(true)} />
      </div>

      <ProjectHero
        title="Training Platform"
        year="2020"
        brand={['Non Disclosed', 'Full Clarity']}
        industry="Healthcare"
        directors={['Ed Kemp', 'Jon Hewines']}
        deliverables={['User Research Translation', 'Responsive Interface Design', 'Greyscale Screen Delivery', 'Atomic Design System']}
        heroImage={`${BASE}/image-1.webp`}
      />

      <ProjectSummary
        paragraph="A healthcare training provider had outgrown their model. Thousands of GPs and primary care clinicians needed to complete CPD points every year to maintain their licences. The only way to do it was in person. My job was to change that. Taking a service that had never existed online and designing it into a fully digital platform."
        bullets={[
          { text: 'Took a healthcare training service from in-person to fully digital', icon: '/icons/User.svg' },
          { text: 'Designed responsive interfaces across mobile, tablet, and desktop', icon: '/icons/Responsive.svg' },
          { text: 'Delivered 100+ greyscale screens', icon: '/icons/Greyscale.svg' },
          { text: 'Built a structured atomic design system in Figma.', icon: '/icons/Atom.svg' },
        ]}
        imageLeft={`${BASE}/summary-1.webp`}
        imageRight={`${BASE}/summary-2.webp`}
      />

      <ProjectSection
        title="Discovery & Research"
        paragraphs={[
          'Before a single wireframe was drawn, we needed to understand the clinician completing their CPD and the provider delivering it. Research workshops with healthcare professionals revealed they were busy people, with a strict annual requirement with no flexible way to meet it.',
        ]}
        bullets={[
          { text: 'CPD points are a regulatory requirement', icon: '/icons/Test.svg' },
          { text: 'Yearly CPD points quota required to be met by GPs', icon: '/icons/Date.svg' },
          { text: 'Platform must support a vast array of content topics', icon: '/icons/Data.svg' },
          { text: 'Topic areas specific to individuals line of work', icon: '/icons/Filter.svg' },
          { text: 'Platform must support written and video content', icon: '/icons/Video.svg' },
        ]}
        image={`${BASE}/discovery-research.webp`}
        imageLabel="Example workshop completed by Full Clarity"
      />

      <ProjectSectionWithGallery
        title="Low Fidelity Wireframes"
        paragraphs={[
          'The platform had a lot of content to carry with filtering and progress tracking. It all needed to feel effortless to a clinician while being scalable for the service provider to maintain and add content overtime. Rough sketches came first to find layouts, explore interactions and refined until the structure felt right.',
        ]}
        bullets={[
          { text: 'Site map', icon: '/icons/1.svg' },
          { text: 'Screen layout', icon: '/icons/2.svg' },
          { text: 'Core functionality', icon: '/icons/3.svg' },
        ]}
        images={[
          { src: `${BASE}/wireframe-sitemap.webp`, label: 'Sitemap and Content', width: 2016, height: 2132 },
          { src: `${BASE}/wireframe-dashboard.webp`, label: 'Dashboard', width: 2640, height: 2132 },
          { src: `${BASE}/wireframe-cpd.webp`, label: 'Continued Professional Development', width: 2640, height: 2132 },
          { src: `${BASE}/wireframe-content-filters.webp`, label: 'Content and Filters', width: 2640, height: 2132 },
        ]}
        galleryHeight={460}
      />

      <ProjectSection
        title="Design System"
        paragraphs={[
          'With the layout agreed, I moved into Figma and started building components atomically. Navigation, page titles, buttons, icons then the more specific elements like the CPD progress bars, content preview cards, search bars, filter dropdowns. Every component named, every property documented. This took a methodical approach, this allowed the screen designs which followed to be created fast, consistently and easy to edit.',
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

      <ProjectSectionWithGallery
        title="Client Review"
        paragraphs={[
          'With the core screens built I presented to the client in greyscale keeping feedback focused on structure and interaction, not visual polish. The response was positive. Some key changes were made, the CPD timeline felt too prominent on the Dashboard. It was reduced to a circular indicator and relocated. Since the design system was built atomically, the adjustment took minutes not days. No disruption to the wider designs while providing the client with the desired outcome.',
        ]}
        bullets={[
          { text: 'Greyscale keeps feedback focused on content and structure, not visual polish', icon: '/icons/Greyscale.svg' },
          { text: 'A more professional format for client reviews than hand drawn sketches', icon: '/icons/User.svg' },
        ]}
        images={[
          { src: `${BASE}/client-review-dashboard.webp`, label: 'Dashboard', width: 3216, height: 2132 },
          { src: `${BASE}/improvements-dashboard.webp`, label: 'Timeline Removed, Circular Indicator Added', width: 3216, height: 2132 },
          { src: `${BASE}/client-review-cpd.webp`, label: 'Continued Professional Development', width: 3216, height: 2132 },
          { src: `${BASE}/improvements-cpd.webp`, label: 'Timeline and Feedback Banner Added', width: 3216, height: 2132 },
          { src: `${BASE}/client-review-content.webp`, label: 'Content', width: 3216, height: 2132 },
        ]}
        galleryHeight={460}
      />

      <ProjectSectionAutoSlider
        title="User Interaction"
        paragraphs={[
          'With the design stable I mapped out the full user flows from creating an account through to completing content and earning CPD points. Every screen state, every edge case, every flow covered. The design system made this fast, pulling together variants and states without starting from scratch each time.',
        ]}
        images={[
          `${BASE}/user-interaction-1.webp`,
          `${BASE}/user-interaction-2.webp`,
          `${BASE}/user-interaction-3.webp`,
          `${BASE}/user-interaction-4.webp`,
          `${BASE}/user-interaction-5.webp`,
        ]}
        showDots={true}
        cycle={true}
      />

      <ProjectSectionAutoSlider
        title="Finished UI"
        paragraphs={[
          "While I completed the UX a UI designer at Full Clarity applied the client's visual identity to every component. The design system enabled branding, typography and colour to cascaded through every screen automatically bringing the platform to life without a single screen needing to be rebuilt.",
        ]}
        images={[
          `${BASE}/finished-ui-1.webp`,
          `${BASE}/finished-ui-2.webp`,
        ]}
        showDots={false}
        cycle={false}
      />

      <ProjectSectionWithGallery
        title="Delivery"
        paragraphs={[
          "Thanks to the stability of the greyscale designs, Full Clarity's development team were able to begin building before the visual design was even finalised. Greyscale communicates structure and behaviour clearly the developers had everything they needed to move fast.",
        ]}
        bullets={[]}
        images={[
          { src: `${BASE}/delivery-dashboard.webp`, label: 'My Dashboard', width: 2718, height: 1599 },
          { src: `${BASE}/delivery-cpd.webp`, label: 'My CPD', width: 2718, height: 1599 },
          { src: `${BASE}/delivery-content.webp`, label: 'My Content', width: 2718, height: 1599 },
        ]}
        galleryHeight={460}
      />

      <div style={{ marginTop: 100 }}>
        <ProjectGalleryStrip
          reversed
          galleryHeight={460}
          images={[
            { src: `${BASE}/delivery-2-signup.webp`, label: 'Sign Up', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-content.webp`, label: 'My Content', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-content-filter.webp`, label: 'Content Type Filter', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-progress-bar.webp`, label: 'Progress Bar', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-sidebar-closed.webp`, label: 'Sidebar Closed', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-sidebar-open.webp`, label: 'Sidebar Open', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-purchase.webp`, label: 'Purchase or Subscribe', width: 1599, height: 1599 },
            { src: `${BASE}/delivery-2-topic-filter.webp`, label: 'Topic Filter', width: 1599, height: 1599 },
          ]}
        />
      </div>

      <ProjectSection
        title="Outcome"
        paragraphs={[
          'A service that only existed in person became a fully digital platform accessible anywhere, at any time. Healthcare professionals can now complete their CPD requirements on their own terms with no unnecessary friction. Today the platform supports 30,000 clinicians every year in meeting their annual requirements.',
        ]}
        bullets={[
          { text: '30,000 clinicians supported annually through the platform', icon: '/icons/Users.svg' },
          { text: 'Enabling professionals to complete training digitally', icon: '/icons/Test.svg' },
          { text: 'In person only service to fully digital offering', icon: '/icons/Internet.svg' },
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
