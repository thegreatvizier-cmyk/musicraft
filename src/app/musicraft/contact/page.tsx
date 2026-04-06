'use client';

import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';

const contactCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    title: 'General Inquiries',
    email: 'info@musicraft.eu',
    description: 'For general questions about Musicraft.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: 'Support',
    email: 'support@musicraft.eu',
    description: 'For distribution, releases and catalogue support.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Partnerships',
    email: 'partners@musicraft.eu',
    description: 'For label partnerships and business collaborations.',
  },
];

const socialLinks = [
  {
    label: 'BlueSky',
    href: 'https://bsky.app/profile/musicraft.eu',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/musicraft',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/musicraft_forartists/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/musicraft-eu/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}>
      <MusicraftNav />
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* HERO */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Contact</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              For general inquiries, partnerships or business matters, feel free to contact us.
            </p>
          </div>

          {/* CONTACT INFORMATION */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactCards?.map((card) => (
                <div
                  key={card?.title}
                  className="p-7 rounded-2xl flex flex-col gap-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
                      border: '1px solid rgba(124,58,237,0.3)',
                      color: '#A78BFA',
                    }}
                  >
                    {card?.icon}
                  </div>
                  <div>
                    <div className="text-base font-semibold mb-1" style={{ color: '#E8E8F0' }}>{card?.title}</div>
                    <a
                      href={`mailto:${card?.email}`}
                      className="text-sm font-medium block mb-2 transition-opacity"
                      style={{ color: '#67E8F9' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {card?.email}
                    </a>
                    <p className="text-sm" style={{ color: 'rgba(232,232,240,0.5)', lineHeight: 1.6 }}>{card?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SOCIAL MEDIA */}
          <section className="mb-20">
            <div
              className="p-10 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Follow Musicraft</h2>
              <p className="text-sm mb-8" style={{ color: 'rgba(232,232,240,0.45)' }}>Stay up to date with releases, news and updates.</p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.label}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social?.label}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(232,232,240,0.55)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#E8E8F0';
                      e.currentTarget.style.background = 'rgba(124,58,237,0.2)';
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.25)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(232,232,240,0.55)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social?.icon}
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
                {socialLinks?.map((social) => (
                  <span key={social?.label} className="text-xs" style={{ color: 'rgba(232,232,240,0.3)', width: '48px', textAlign: 'center' }}>{social?.label}</span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div
              className="p-10 md:p-14 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Interested in distribution?</h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
                If you want to distribute music through Musicraft, please submit an application.
              </p>
              <Link
                href="/musicraft/apply"
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3 rounded-xl text-white transition-opacity"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Apply for Distribution
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
