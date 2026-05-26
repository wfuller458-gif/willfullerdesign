'use client';

import { useState, useEffect } from "react";
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
    title: 'UX Interaction Designer • Digital Cockpit',
    company: 'Jaguar Land Rover',
    dates: 'Apr 2022 — Present',
    bullets: [
      "Designed and delivered UX for Land Rover's next-generation instrument cluster and 3rd generation head-up display, pending global launch.",
      'Contributed to an augmented reality head-up display concept project.',
      'Designed the off-road cockpit experience for Land Rover Defender, creating purpose built controls integral to the Defender\'s "go anywhere" brand identity.',
      'Built and managed the driver display design system, adopted across Land Rover, Jaguar and Tata Motors Avinya platforms.',
    ],
  },
  {
    title: 'UX / UI Designer',
    company: 'Suru Partners',
    dates: 'Apr 2021 — Mar 2022',
    bullets: [
      'Designed a platform to enable Africa Inland Mission to manage their global operations supporting missionaries across 20+ African countries.',
      'Designed Fair For You, an ethical lending and e-commerce platform enabling financially vulnerable consumers to purchase household essentials with affordable credit, as an alternative to high cost lenders.',
    ],
  },
  {
    title: 'Freelance UX / UI Designer',
    company: 'Self-employed',
    dates: 'Oct 2020 — Mar 2022',
    bullets: [
      'Working with Full Clarity, I designed two products a case management inbox for Feed It Back used by major UK restaurants, and a GP training platform enabling healthcare practitioners to track and complete their professional development.',
      'Designed end-to-end web app for Zeus, a Berlin-based startup serving independent restaurant owners.',
    ],
  },
  {
    title: 'Creative Design Intern',
    company: 'ChargedUp',
    dates: 'Jun 2018 — Sep 2018',
    bullets: [
      'Worked directly with the founding team during launch, helping scale their charging stations to venues across London.',
    ],
  },
];

const ResumeContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    {roles.map((role, i) => (
      <div key={i}>
        <p style={{ margin: '0 0 6px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '16px', color: 'white', lineHeight: 1.4 }}>
          {role.title}
        </p>
        <p style={{ margin: '0 0 16px', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
          {role.company} • {role.dates}
        </p>
        <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {role.bullets.map((b, j) => (
            <li key={j} style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    ))}
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
        {openPanel === 'resume' && <ResumeContent />}
      </RightPanel>
    )}
    </>
  );
}
