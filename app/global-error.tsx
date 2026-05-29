'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" style={{ backgroundColor: '#f7f7f0' }}>
      <body style={{ margin: 0, backgroundColor: '#f7f7f0', fontFamily: 'DM Sans, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 25px',
          textAlign: 'center',
        }}>
          <p style={{
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
            fontWeight: 300,
            fontSize: '32px',
            color: '#BBB7B4',
            margin: '0 0 20px 0',
            lineHeight: 1.2,
          }}>
            Critical error
          </p>
          <p style={{
            fontWeight: 300,
            fontSize: '16px',
            color: '#1e1e1c',
            margin: '0 0 48px 0',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}>
            Something went seriously wrong and the page couldn't load at all. Try refreshing and it should sort itself out.
          </p>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <button
              onClick={reset}
              style={{
                fontWeight: 300,
                fontSize: '16px',
                color: '#1e1e1c',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                borderBottom: '0.5px solid #1e1e1c',
                paddingBottom: '2px',
              }}
            >
              Try again
            </button>
            <a href="/" style={{
              fontWeight: 300,
              fontSize: '16px',
              color: '#1e1e1c',
              textDecoration: 'none',
              borderBottom: '0.5px solid #1e1e1c',
              paddingBottom: '2px',
            }}>
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
