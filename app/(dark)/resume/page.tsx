'use client';
import { useRouter } from 'next/navigation';
import { useSound } from '@/contexts/sound-context';
import { ResumeContent } from '@/components/ui/resume-content';

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L8 24M8 8L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ResumePage() {
  const router = useRouter();
  const { playSelect } = useSound();

  return (
    <div style={{ backgroundColor: '#1e1e1c', minHeight: '100vh' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        backgroundColor: '#1e1e1c',
        zIndex: 100,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '32px 32px 24px',
        }}>
          <h2 style={{ margin: 0, fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '20px', color: 'white' }}>
            Resume
          </h2>
          <button
            onClick={() => { playSelect(); const origin = sessionStorage.getItem('menuOrigin') || '/'; sessionStorage.removeItem('menuOrigin'); router.push(origin); }}
            aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, color: 'white' }}
          >
            <CloseIcon />
          </button>
        </div>
        <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.25)', margin: 0 }} />
      </div>

      <div style={{ padding: 'calc(121px + env(safe-area-inset-top, 0px)) 32px 48px' }}>
        <ResumeContent />
      </div>
    </div>
  );
}
