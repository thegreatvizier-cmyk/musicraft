'use client';

import Link from 'next/link';
import MusicraftNav from './components/MusicraftNav';
import MusicraftFooter from '@/app/musicraft/components/MusicraftFooter';


export default function MusicraftNotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MusicraftNav />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px',
          textAlign: 'center',
        }}
      >
        {/* Muted 404 label */}
        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(232, 232, 240, 0.3)',
            marginBottom: '24px',
          }}
        >
          404
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          Page not found
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(232, 232, 240, 0.55)',
            maxWidth: '480px',
            marginBottom: '48px',
          }}
        >
          The page you are looking for does not exist or may have been moved.
        </p>

        {/* Return to Homepage button */}
        <Link
          href="/musicraft"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #7C3AED 0%, #0891B2 100%)',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        >
          Return to Homepage
        </Link>
      </main>

      <MusicraftFooter />
    </div>
  );
}
