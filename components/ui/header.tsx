'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "@/contexts/loading-context";
import { useSound } from "@/contexts/sound-context";
import { RightPanel } from "./right-panel";
import { ArrowUpRight } from "./icons";

function smoothScrollToTop(duration = 420) {
  const startY = window.scrollY;
  let start: number | null = null;
  function step(ts: number) {
    if (start === null) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY * (1 - ease));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function smoothScrollToId(id: string, duration = 420) {
  const el = document.getElementById(id);
  if (!el) return;
  const headerHeight = 56 + 16;
  const targetY = el.getBoundingClientRect().top + window.scrollY - headerHeight;
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;
  function step(ts: number) {
    if (start === null) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const SoundButton = ({ isMuted, onToggle, onMouseEnter }: { isMuted: boolean; onToggle: () => void; onMouseEnter: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = isMuted ? '/icons/Mute.svg' : '/icons/Sound On.svg';
  const label = isMuted ? 'Unmute' : 'Mute';

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => { setIsHovered(true); onMouseEnter(); }}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 0,
        position: 'relative',
        overflow: 'hidden',
        width: 24,
        height: 24,
      }}
    >
      <img
        src={icon}
        alt={label}
        width={24}
        height={24}
        style={{
          display: 'block',
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
        }}
      />
      <img
        src={icon}
        alt=""
        aria-hidden
        width={24}
        height={24}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
        }}
      />
    </button>
  );
};

const ContactButton = ({ onClick, onMouseEnter }: { onClick?: () => void; onMouseEnter?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playSelect } = useSound();
  const ease = '750ms cubic-bezier(0.16, 1.2, 0.3, 1)';

  return (
    <button
      onClick={() => { playSelect(); onClick?.(); }}
      onMouseEnter={() => { setIsHovered(true); onMouseEnter?.(); }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        color: isHovered ? '#008E24' : 'var(--brand-black)',
        background: isHovered ? '#E0EADB' : 'rgba(227, 225, 222, 0.6)',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 16px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: `background ${ease}, color ${ease}`,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* Slide-up text */}
      <span style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
        <span style={{
          display: 'inline-block',
          transition: `transform ${ease}`,
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
        }}>
          Get in touch
        </span>
        <span style={{
          position: 'absolute', left: 0, top: 0, display: 'inline-block',
          transition: `transform ${ease}`,
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
        }}>
          Get in touch
        </span>
      </span>

      {/* Diagonal arrow */}
      <span style={{ position: 'relative', overflow: 'hidden', display: 'inline-flex', width: '18px', height: '18px', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ position: 'absolute', transition: `transform ${ease}`, transform: isHovered ? 'translate(100%, -100%)' : 'translate(0, 0)', display: 'flex' }}>
          <ArrowUpRight style={{ width: 18, height: 18 }} />
        </span>
        <span style={{ position: 'absolute', transition: `transform ${ease}`, transform: isHovered ? 'translate(0, 0)' : 'translate(-100%, 100%)', display: 'flex' }}>
          <ArrowUpRight style={{ width: 18, height: 18 }} />
        </span>
      </span>
    </button>
  );
};

const NavLink = ({ label, href, onClick, onLinkClick }: { label: string; href?: string; onClick?: () => void; onLinkClick?: (e: React.MouseEvent) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playSelect } = useSound();

  const textStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    color: 'var(--brand-black)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const inner = (
    <>
      <span style={{
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
      }}>
        {label}
      </span>
      <span style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline-block',
        transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
      }}>
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={textStyle}
        onMouseEnter={() => { setIsHovered(true); playHover(); }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => { playSelect(); onLinkClick?.(e); }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      style={textStyle}
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => { playSelect(); onClick?.(); }}
    >
      {inner}
    </div>
  );
};

const roles = [
  {
    company: 'Jaguar Land Rover',
    title: 'UX Interaction Designer Digital Cockpit',
    dates: '2022 — Present',
    bullets: [
      "Designed and delivered UX for Land Rover's next-generation instrument cluster and 3rd generation head-up display, launching globally soon.",
      'Contributed to an augmented reality head-up display concept project.',
      'Designed the off-road cockpit for Land Rover Defender, creating a purposeful experience integral to the Defender\'s "go anywhere" brand identity.',
      'Built and managed the driver display design system, adopted across Land Rover, Jaguar and Tata Motors nameplates.',
    ],
  },
  {
    company: 'Suru Partners',
    title: 'UX / UI Designer',
    dates: '2021 — 2022',
    bullets: [
      'Designed a platform to enable Africa Inland Mission to manage their global operations supporting missionaries across 20+ African countries.',
      'Designed Fair For You, an ethical lending and e-commerce platform enabling financially vulnerable consumers to purchase household essentials with affordable credit, as an alternative to high cost lenders.',
    ],
  },
  {
    company: 'Freelance',
    title: 'UX / UI Designer',
    dates: '2020 — 2021',
    bullets: [
      'Working with Full Clarity, I designed two products a case management inbox for Feed It Back used by major UK restaurants, and a GP training platform enabling healthcare practitioners to track and complete their professional development.',
      'End-to-end design of a web app for Zeus, a Berlin-based startup serving independent restaurant owners.',
    ],
  },
  {
    company: 'ChargedUp',
    title: 'Creative Design Intern',
    dates: '2018',
    bullets: [
      'Worked directly with the founding team during launch, helping scale their charging stations to venues across London.',
    ],
  },
];

const skills = [
  'Figma', 'Claude Code', 'End-to-end Design', 'Ideation', 'Information Architecture',
  'Site Mapping', 'Wireframing', 'Prototyping', 'Interaction Design', 'Systemic Thinking',
  'Complex Problem Solving', 'Research Synthesis', 'Data Informed Design', 'Design Systems',
  'Agile Design & Development', 'Developer Handoff', 'Cross Functional Collaboration', 'Stakeholder Management',
];

const stripItems = [
  { src: '/images/about/img_6144-1.jpg',   base: -5, hover: -9  },
  { src: '/images/about/img_9254-1.jpg',   base:  4, hover:  8  },
  { src: '/images/about/img_1793-1.jpg',   base: -8, hover: -4  },
  { src: '/images/about/img_5720-1.jpg',   base:  6, hover: 10  },
  { src: '/images/about/img_6193-1.jpg',   base: -3, hover:  1  },
  { src: '/images/about/img_2150-1.jpg',   base:  7, hover: 11  },
  { src: '/images/about/img_3476-1.jpg',   base: -4, hover: -8  },
  { src: '/images/about/img_1813-1.jpg',   base:  3, hover:  7  },
  { src: '/images/about/img_5659-1.jpg',   base: -6, hover: -2  },
  { src: '/images/about/img_6399-1.jpg',   base:  5, hover:  9  },
  { src: '/images/about/img_1800-1.jpg',   base: -7, hover: -3  },
  { src: '/images/about/img_5674-2-1.jpg', base:  2, hover:  6  },
  { src: '/images/about/img_6242-1.jpg',   base: -2, hover:  2  },
  { src: '/images/about/img_9120-1.jpg',   base:  8, hover:  4  },
  { src: '/images/about/img_2181-1.jpg',   base: -5, hover: -1  },
];

const PolaroidStrip = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const pausedRef = useRef(false);

  useEffect(() => { pausedRef.current = hoveredIdx !== null; }, [hoveredIdx]);

  useEffect(() => {
    const animate = () => {
      const track = trackRef.current;
      if (track && !pausedRef.current) {
        posRef.current += 0.4;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const doubled = [...stripItems, ...stripItems];

  return (
    <div style={{ marginLeft: '-32px', marginRight: '-32px', overflow: 'hidden', padding: '24px 0' }}>
      <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', willChange: 'transform' }}>
        {doubled.map((item, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flexShrink: 0,
                marginRight: '8px',
                position: 'relative',
                zIndex: isHovered ? 10 : 1,
                transform: `rotate(${isHovered ? item.hover : item.base}deg) translateY(${isHovered ? -10 : 0}px)`,
                transition: 'transform 600ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                cursor: 'default',
              }}
            >
              <div style={{
                background: 'white',
                padding: '5px 5px 20px',
                borderRadius: '2px',
                boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.45)' : '0 2px 10px rgba(0,0,0,0.25)',
                transition: 'box-shadow 600ms ease',
              }}>
                <img src={item.src} alt="" style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const p24 = (text: string) => (
  <p style={{ margin: 0, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '24px', color: 'white', lineHeight: 1.5 }}>{text}</p>
);

const AboutContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {p24("Hey, I'm Will Fuller, a Senior Product Designer based in Stratford-Upon-Avon, UK. I grew up in Orpington on the edge of London and studied Industrial Design at Loughborough University, graduating with a First Class Honours.")}
    <img
      src="/images/profiles/will-fuller.jpg"
      alt="Will Fuller"
      style={{ width: '100%', display: 'block', borderRadius: '4px' }}
    />
    {p24("From an early age I've always processed the world visually and spatially. I believe it's one of my greatest strengths as a designer, I instinctively see the whole picture before the detail. This philosophy sits at the heart of everything I design I obsess over foundations, sweat the details, and believe great products are the sum of many small things done right.")}
    {p24("Alongside my studies I represented Great Britain at the European U23 Championships in the 5K, coached by legendary coach George Gandy. Years of competitive running and guidance from George taught me something that shapes how I work every day, consistency, discipline, and the understanding that small improvements compound into something exceptional.")}
    {p24("Outside of work I'm usually out with my black Labrador, at the gym, or tinkering on my Golf GTI Edition 30. I love to travel with recent trips to Morocco, Bali and this summer I'm planning a European road trip.")}
    <PolaroidStrip />
  </div>
);

const hr = <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.25)', margin: 0 }} />;
const f = (weight: number, size: string, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'DM Sans, sans-serif', fontWeight: weight, fontSize: size, color, margin: 0, lineHeight: 1.6, ...extra,
});

const ResumeContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

    {/* Summary */}
    <p style={f(300, '24px', 'rgba(255,255,255,0.85)', { lineHeight: 1.5 })}>
      Senior product designer with 6+ years experience across automotive, healthcare, hospitality and startups. Trained in Industrial Design, I approach every project holistically considering the entire product and experience, not just the screen in front of me. I obsess over core design principles, because I believe great design is the sum of many small decisions done right. I create clarity where there isn't any, scope complexity into something manageable, and build with craft and precision from brief to delivery. I'm drawn to focused teams with the ambition to make something truly exceptional.
    </p>

    {hr}

    {/* Experience */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {roles.map((role, i) => (
        <div key={i}>
          <p style={f(400, '20px', 'white', { marginBottom: '4px' })}>{role.company}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <p style={f(400, '18px', 'rgba(255,255,255,0.6)')}>{role.title}</p>
            <p style={f(400, '18px', 'rgba(255,255,255,0.6)', { flexShrink: 0, marginLeft: '16px' })}>{role.dates}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {role.bullets.map((b, j) => (
              <p key={j} style={f(300, '16px', 'rgba(255,255,255,0.75)')}>{b}</p>
            ))}
          </div>
        </div>
      ))}
    </div>

    {hr}

    {/* Skills */}
    <div>
      <p style={f(400, '20px', 'white', { marginBottom: '12px' })}>Skills</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((s, i) => (
          <span key={i} style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '0.5px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '6px 12px',
            display: 'inline-block',
            lineHeight: 1,
          }}>{s}</span>
        ))}
      </div>
    </div>

    {hr}

    {/* Education */}
    <div>
      <p style={f(400, '20px', 'white', { marginBottom: '4px' })}>Loughborough University</p>
      <p style={f(400, '18px', 'rgba(255,255,255,0.6)')}>Industrial Design 1st Class Honours</p>
    </div>

  </div>
);

export interface HeaderProps {
  onMenuClick?: () => void;
  onContactClick?: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  const [backgroundColor, setBackgroundColor] = useState('rgba(247,247,240,0.3)');
  const [openPanel, setOpenPanel] = useState<'about' | 'resume' | null>(null);
  const { isMuted, toggleMuted, playHover } = useSound();
  const { animateIn } = useLoading();
  const pathname = usePathname();
  const router = useRouter();

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      smoothScrollToId('selected-works');
    } else {
      router.push('/#selected-works');
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      smoothScrollToTop();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setBackgroundColor('rgba(240,240,233,0.3)');
      } else {
        setBackgroundColor('rgba(247,247,240,0.3)');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <motion.header
      initial={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        height: '56px',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        backgroundColor,
        transition: 'background-color 300ms ease',
      }}
    >
      <div style={{
        height: '100%',
        paddingLeft: '25px',
        paddingRight: '25px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}>
        {/* Left — Will Fuller */}
        <NavLink label="Will Fuller" href="/" onLinkClick={handleHomeClick} />

        {/* Centre — nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <NavLink label="Projects" href="/#selected-works" onLinkClick={handleProjectsClick} />
          <NavLink label="About" onClick={() => setOpenPanel('about')} />
          <NavLink label="Resume" onClick={() => setOpenPanel('resume')} />
        </div>

        {/* Right — sound + contact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
          <SoundButton isMuted={isMuted} onToggle={toggleMuted} onMouseEnter={playHover} />
          <ContactButton onClick={onContactClick} onMouseEnter={playHover} />
        </div>
      </div>
    </motion.header>

    {openPanel && (
      <RightPanel
        title={openPanel === 'about' ? 'About' : 'Resume'}
        onClose={() => setOpenPanel(null)}
      >
        {openPanel === 'about' && <AboutContent />}
        {openPanel === 'resume' && <ResumeContent />}
      </RightPanel>
    )}
    </>
  );
}
