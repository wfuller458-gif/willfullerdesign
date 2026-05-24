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
        paragraph="Designed the user experience for a medical education platform for general practitioners and primary care clinicians, taking it from an in person service to a fully digital solution. Transferring user research and workshops findings, into user flows, wireframes and high fidelity designs."
        bullets={[
          { text: 'Translated user research and workshop findings into UX design decisions', icon: '/icons/User.svg' },
          { text: 'Designed responsive interfaces across mobile, tablet, and desktop', icon: '/icons/Responsive.svg' },
          { text: 'Delivered 100+ greyscale screens', icon: '/icons/Greyscale.svg' },
          { text: 'Built a structured atomic design system in Figma', icon: '/icons/Atom.svg' },
        ]}
        imageLeft={`${BASE}/summary-1.webp`}
        imageRight={`${BASE}/summary-2.webp`}
      />

      <ProjectSection
        title="Discovery & Research"
        paragraphs={[
          'Ed Kemp and Jon Hewines led the user research and project scoping in close collaboration with the healthcare training provider. The research phase focused on understanding how healthcare professionals currently approach continuing professional development (CPD) including what CPD points are, how they\'re structured, and why completing them annually is a regulatory requirement.',
          'Design workshops were held with leaders from the training platform, many of whom had first hand experience as healthcare professionals themselves. This gave direct insight into both the user\'s world and the operational challenges of the provider, who were looking to transition from an in person model to a predominantly digital offering. A digital platform would make it far easier to track CPD progress throughout the year, while giving busy healthcare professionals the flexibility to learn on their own terms.',
        ]}
        bullets={[
          { text: 'CPD points quantitative measure of learning and professional development', icon: '/icons/Data.svg' },
          { text: 'Yearly CPD points quota required to be met by GPs to maintain licenses', icon: '/icons/Time.svg' },
          { text: 'Platform must support a vast array of content topics', icon: '/icons/Globe.svg' },
          { text: 'Healthcare professionals have topic areas specific for their line of work', icon: '/icons/Filter.svg' },
          { text: 'Platform must support written and video content', icon: '/icons/Video.svg' },
        ]}
        image={`${BASE}/discovery-research.webp`}
        imageLabel="Example workshop from a similar project by Full Clarity"
      />

      <ProjectSectionWithGallery
        title="Low Fidelity Wireframes"
        paragraphs={[
          'Working closely with Ed, I began by reviewing the proposed sitemap and understanding the content requirements for each area of the platform. From there, I moved into sketching layout concepts, iterating on ideas and reviewing them regularly with Ed.',
          'Key interface elements were explored during this process including the navigation structure, learning content layouts, filter patterns, and the CPD progress tracker.',
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
          'With the layout and design direction agreed with Ed, I moved into Figma to begin building the design system. Following an atomic design approach, I started by breaking the interface down into its core elements establishing the navigation bar, page titles, and key navigation components to set the overall framework.',
          'From there, I assembled a comprehensive component library consisting of icons, button styles, and more specific elements such as the CPD progress bar, content preview cards, search bars, and filter dropdowns.',
          'Components were well organised with all properties clearly named. This is time consuming to set up, but providing an efficient and reusable set of building blocks for the screens ahead.',
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
          'With the design system foundations in place, I had the components needed to begin building screens. I prioritised the three core platform screens as the focus for an initial client review.',
          'The review was positive, with the client excited to see the product coming to life. Feedback was gathered on several screens and taken away for further refinement.',
        ]}
        bullets={[
          { text: 'Greyscale keeps feedback focused on content and structure, not visual polish', icon: '/icons/Greyscale.svg' },
          { text: 'A more professional format for client reviews than hand drawn sketches', icon: '/icons/Users.svg' },
        ]}
        images={[
          { src: `${BASE}/client-review-dashboard.webp`, label: 'Dashboard', width: 3216, height: 2132 },
          { src: `${BASE}/client-review-cpd.webp`, label: 'Continued Professional Development', width: 3216, height: 2132 },
          { src: `${BASE}/client-review-content.webp`, label: 'Content', width: 3216, height: 2132 },
        ]}
        galleryHeight={460}
      />

      <ProjectSectionWithGallery
        title="Design Improvements"
        paragraphs={[
          'Adjustments were made, reviewed first with Ed and then presented back to the client. The primary change involved the relationship between the Dashboard and My CPD screens. The client felt the timeline was too prominent on the Dashboard, so it was reduced to a circular indicator. The timeline component was relocated to My CPD screen.',
          'Working in greyscale meant no time was lost on unnecessary visual polish when changes were requested. With the design system built atomically, adjusting and rearranging components was quick and efficient delivering an outcome that met the client\'s needs without disruption to the wider designs.',
        ]}
        bullets={[
          { text: 'Fast interaction and adjustment', icon: '/icons/Build.svg' },
          { text: 'Clients needs met efficiently', icon: '/icons/Users.svg' },
        ]}
        images={[
          { src: `${BASE}/improvements-dashboard.webp`, label: 'Timeline Removed, Circular Indicator Added', width: 3216, height: 2132 },
          { src: `${BASE}/improvements-cpd.webp`, label: 'Timeline and Feedback Banner Added', width: 3216, height: 2132 },
        ]}
        galleryHeight={460}
      />

      <ProjectSectionAutoSlider
        title="User Interaction"
        paragraphs={[
          'With the design stable, I turned my attention to mapping out the full user interactions and flows. The focus was on enabling the end user to achieve their core goals, creating an account with the training platform and completing content that contributes towards their yearly CPD points.',
          'The design system proved its value here, allowing me to pull together every screen state efficiently and easily extend components with additional variants to cover all flows and edge cases.',
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
          'Simultaneously, a UI designer at Full Clarity began updating the design system components applying the client\'s branding, typography, colours, and logos to every element. Because the components had been built atomically, all visual updates cascaded automatically through every screen, interaction, and flow, bringing the platform to life without any rework to the underlying UX.',
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
          'Full Clarity handled development of the platform in house. Thanks to the stability of the greyscale designs refined through client feedback the developers were able to begin build work ahead of the finalised visual design. Greyscale UI lends itself well to this handoff, communicating structure and behaviour clearly without the distraction of visual styling, allowing front end work to follow once the UI was complete.',
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
          'This project enabled a significant transformation for the medical education provider, expanding their offering from solely in person training to a fully digital platform. Healthcare professionals now have the flexibility to learn on their own terms supporting 30,000 clinicians per year in completing their CPD requirements.',
        ]}
        bullets={[
          { text: '30,000 clinicians supported annually through the platform', icon: '/icons/Users.svg' },
          { text: 'Enabling professionals to complete training digitally', icon: '/icons/Build.svg' },
          { text: 'In person only service to fully digital offering', icon: '/icons/Globe.svg' },
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
