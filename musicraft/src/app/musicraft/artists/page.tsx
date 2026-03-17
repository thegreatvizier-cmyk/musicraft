'use client';

import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';

const WHO_WORKS_WITH = [
  {
    title: 'Independent Artists',
    desc: 'Artists releasing singles, EPs, or albums who want structured distribution with proper metadata handling and manual quality control.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Record Labels',
    desc: 'Labels managing multiple artists and releases who need a reliable distribution workflow and ongoing catalogue support.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Catalogue Owners',
    desc: 'Rights holders maintaining back catalogue releases that require long-term availability and accurate metadata across platforms.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const USE_CASES = [
  {
    label: 'Independent artists releasing singles and EPs',
  },
  {
    label: 'Small labels managing multiple artists',
  },
  {
    label: 'Catalogue owners maintaining back catalogue releases',
  },
  {
    label: 'Projects distributing both audio and music videos',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Manual Quality Control',
    desc: 'Every release is reviewed before delivery.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Curated Onboarding',
    desc: 'Musicraft works by application to maintain quality and a focused distribution environment.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Long-Term Catalogue Focus',
    desc: 'Releases remain stable and manageable long after release date.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Audio + Video Distribution',
    desc: 'Support for both audio releases and music video distribution.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const PLATFORMS = [
  { name: 'Spotify', color: '#1DB954' },
  { name: 'Apple Music', color: '#FC3C44' },
  { name: 'YouTube Music', color: '#FF0000' },
  { name: 'VEVO', color: '#E8E8F0' },
  { name: 'Amazon Music', color: '#00A8E1' },
  { name: 'TIDAL', color: '#00FFFF' },
  { name: 'Deezer', color: '#FF0092' },
  { name: 'TikTok', color: '#EE1D52' },
  { name: 'Instagram', color: '#E1306C' },
];

export default function ArtistsPage() {
  return (
    <div className="min-h-screen" style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}>
      <MusicraftNav />
      <main className="pt-32 pb-24 px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-28">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>For Artists &amp; Labels</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#E8E8F0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Distribution for artists and labels who treat releases seriously.</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              Musicraft is designed for projects that value reliable delivery, metadata accuracy, and long-term catalogue management.
            </p>
          </div>

          {/* Who Musicraft Works With */}
          <div className="mb-28">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#E8E8F0' }}>Who Musicraft Works With</h2>
            <p className="text-center mb-12" style={{ color: 'rgba(232,232,240,0.5)' }}>Musicraft is designed for a specific set of clients who benefit from a structured, quality-focused distribution service.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {WHO_WORKS_WITH?.map((item) => (
                <div key={item?.title} className="p-8 rounded-2xl flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}>
                    {item?.icon}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#E8E8F0' }}>{item?.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(232,232,240,0.55)', lineHeight: 1.7 }}>{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Use Cases — vertical checklist */}
          <div className="mb-28">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#E8E8F0' }}>Typical Use Cases</h2>
            <p className="text-center mb-12" style={{ color: 'rgba(232,232,240,0.5)' }}>Common projects and workflows that benefit from Musicraft&apos;s distribution model.</p>
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
              {USE_CASES?.map((item) => (
                <div key={item?.label} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.35)' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-base" style={{ color: 'rgba(232,232,240,0.8)', lineHeight: 1.6 }}>{item?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What Makes Musicraft Different — strengthened cards */}
          <div className="mb-28">
            <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#E8E8F0' }}>What Makes Musicraft Different</h2>
            <p className="text-center mb-12" style={{ color: 'rgba(232,232,240,0.5)' }}>A distribution service built around quality, not volume.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {DIFFERENTIATORS?.map((item) => (
                <div
                  key={item?.title}
                  className="p-10 rounded-2xl flex flex-col gap-5"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(124,58,237,0.35)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 24px rgba(124,58,237,0.18), inset 0 0 0 1px rgba(6,182,212,0.08)',
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.35)' }}>
                    {item?.icon}
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: '#E8E8F0' }}>{item?.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(232,232,240,0.55)', lineHeight: 1.7 }}>{item?.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Distributed To — Platform Strip */}
          <div className="mb-28">
            <h2 className="text-2xl font-bold text-center mb-10" style={{ color: '#E8E8F0' }}>Distributed to</h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {PLATFORMS?.map((platform) => (
                <div key={platform?.name} className="flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: platform?.color }} />
                  <span className="text-sm font-medium" style={{ color: 'rgba(232,232,240,0.75)' }}>{platform?.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Applications Work */}
          <div className="mb-28">
            <div className="p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8E8F0' }}>How Applications Work</h2>
              <p className="mb-10" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.8, maxWidth: '680px' }}>
                Musicraft works with a curated onboarding process. Every project is reviewed before distribution access is granted.
              </p>
              <div className="flex flex-col gap-6 mb-8">
                {[
                  { step: '01', title: 'Submit Application', desc: 'Tell us about your project, catalogue and release plans.' },
                  { step: '02', title: 'Review', desc: 'We review catalogue quality, metadata structure and distribution fit.' },
                  { step: '03', title: 'Onboarding', desc: 'Approved projects receive distribution access and onboarding guidance.' },
                ]?.map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#A78BFA' }}>
                      {step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#E8E8F0' }}>{title}</h3>
                      <p style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.35)' }}>Typical review time: 3–5 business days.</p>
            </div>
          </div>

          {/* What Musicraft Does Not Do */}
          <div className="mb-28">
            <div className="p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E8E8F0' }}>What Musicraft Does Not Do</h2>
              <p style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.8, maxWidth: '680px' }}>
                Musicraft is a distribution service only. We do not provide marketing, PR, playlist promotion, editorial pitching, or audience development services. Separating distribution from promotion keeps the service focused, compliant, and reliable.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center p-14 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8E8F0' }}>Apply for Distribution</h2>
            <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              Musicraft works with artists and labels who value reliable distribution, metadata quality, and long-term catalogue management.
            </p>
            <Link href="/musicraft/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}>Apply for Distribution</Link>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.35)' }}>Applications are reviewed manually.</p>
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.35)' }}>Submitting a form does not guarantee acceptance.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
