'use client';
import { useRouter } from 'next/navigation';
import { useSound } from '@/contexts/sound-context';

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L8 24M8 8L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function MenuPage() {
  const router = useRouter();
  const { playSelect } = useSound();

  const items = [
    { label: 'Home',     href: '/' },
    { label: 'Projects', href: '/#selected-works' },
    { label: 'About',    href: '/about' },
    { label: 'Resume',   href: '/resume' },
  ];

  return (
    <div style={{
      backgroundColor: '#1e1e1c',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 32px',
      position: 'relative',
    }}>
      <button
        onClick={() => { playSelect(); router.back(); }}
        aria-label="Close menu"
        style={{
          position: 'absolute',
          top: 'calc(32px + env(safe-area-inset-top, 0px))',
          right: '32px',
          width: 32,
          height: 32,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <CloseIcon />
      </button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {items.map(({ label, href }) => (
          <button
            key={label}
            onClick={() => { playSelect(); router.push(href); }}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 0',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(42px, 12vw, 64px)',
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
