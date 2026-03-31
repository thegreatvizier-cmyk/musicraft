'use client';

import Link from 'next/link';
import MusicraftNav from '../../components/MusicraftNav';

export default function ThankYouPage() {
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
          padding: '80px 24px',
        }}
      >
        {/* Main message block */}
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Check icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(124, 58, 237, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #A78BFA 0%, #67E8F9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            Application Received
          </h1>

          {/* Message */}
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'rgba(232, 232, 240, 0.75)',
              marginBottom: '16px',
            }}
          >
            Thank you for your application. We will review your submission and contact you if your
            project is a good fit for Musicraft.
          </p>

          {/* Muted note */}
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(232, 232, 240, 0.4)',
              marginBottom: '40px',
            }}
          >
            Typical review time: 3–5 business days.
          </p>

          {/* Back to Homepage button */}
          <Link
            href="https://www.musicraft.eu"
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
            Back to Homepage
          </Link>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '1px',
            background: 'rgba(232, 232, 240, 0.08)',
            margin: '64px auto',
          }}
        />

        {/* Follow Musicraft section */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(232, 232, 240, 0.35)',
              marginBottom: '20px',
            }}
          >
            Follow Musicraft
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {/* BlueSky */}
            <a
              href="https://bsky.app/profile/musicraft.eu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Musicraft on BlueSky"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(232, 232, 240, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(232, 232, 240, 0.45)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.9)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.45)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.12)';
              }}
            >
              {/* BlueSky butterfly icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/musicraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Musicraft on Instagram"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(232, 232, 240, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(232, 232, 240, 0.45)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.9)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.45)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.12)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/musicraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Musicraft on Facebook"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(232, 232, 240, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(232, 232, 240, 0.45)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.9)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.45)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.12)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/musicraft"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Musicraft on LinkedIn"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(232, 232, 240, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(232, 232, 240, 0.45)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.9)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.35)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(232, 232, 240, 0.45)';
                el.style.borderColor = 'rgba(232, 232, 240, 0.12)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
