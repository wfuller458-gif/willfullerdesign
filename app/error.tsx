'use client';

import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 25px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(120px, 22vw, 260px)',
          color: '#E0DDD9',
          lineHeight: 1,
          margin: '0 0 8px 0',
          letterSpacing: '-0.04em',
        }}>
          500
        </p>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: '32px',
          color: '#BBB7B4',
          margin: '0 0 20px 0',
          lineHeight: 1.2,
        }}>
          Something went wrong
        </p>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          color: 'var(--brand-black)',
          margin: '0 0 48px 0',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}>
          An unexpected error occurred on our end. It's not you. You can try refreshing the page or head back home.
        </p>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <button
            onClick={reset}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '16px',
              color: 'var(--brand-black)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              borderBottom: '0.5px solid var(--brand-black)',
              paddingBottom: '2px',
            }}
          >
            Try again
          </button>
          <a href="/" style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
            fontSize: '16px',
            color: 'var(--brand-black)',
            textDecoration: 'none',
            borderBottom: '0.5px solid var(--brand-black)',
            paddingBottom: '2px',
          }}>
            Go home
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
