'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'musicraft_cookie_consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '16px 24px',
        background: 'rgba(15, 15, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(124, 58, 237, 0.25)',
        boxShadow: '0 -4px 32px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            color: 'rgba(232, 232, 240, 0.80)',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0,
            flex: '1 1 300px',
          }}
        >
          This website uses cookies to improve functionality and analyse traffic. Learn more in our{' '}
          <Link
            href="/musicraft/privacy"
            style={{
              color: '#a78bfa',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={handleDecline}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(124, 58, 237, 0.35)',
              background: 'transparent',
              color: 'rgba(232, 232, 240, 0.65)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.7)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232, 232, 240, 0.9)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(124, 58, 237, 0.35)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232, 232, 240, 0.65)';
            }}
          >
            Decline
          </button>

          <button
            onClick={handleAccept}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 16px rgba(124, 58, 237, 0.35)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
