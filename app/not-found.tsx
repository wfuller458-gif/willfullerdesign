import Link from 'next/link';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header />
      </div>

      <div style={{
        height: 'calc(100vh - 56px)',
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
          404
        </p>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: '32px',
          color: '#BBB7B4',
          margin: '0 0 20px 0',
          lineHeight: 1.2,
        }}>
          Page not found
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
          This page doesn't exist or has been moved. If you typed the address yourself, double check it's correct.
        </p>
        <Link href="/" style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          color: 'var(--brand-black)',
          textDecoration: 'none',
          borderBottom: '0.5px solid var(--brand-black)',
          paddingBottom: '2px',
        }}>
          Go home
        </Link>
      </div>

      <Footer />
    </div>
  );
}
