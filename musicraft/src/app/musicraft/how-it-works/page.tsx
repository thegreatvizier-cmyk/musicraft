'use client';

import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';


const STEPS = [
  {
    num: '01',
    title: 'Application',
    intro: 'Submit a short application describing your project or catalogue.',
    detail: 'Applications typically include information about the artist, catalogue size, existing releases and distribution needs.',
    bullets: null,
    bulletPrefix: null,
    dsps: null,
  },
  {
    num: '02',
    title: 'Catalogue Review',
    intro: 'We review your catalogue and project to determine whether Musicraft is a good fit.',
    detail: null,
    bulletPrefix: 'This review may consider:',
    bullets: ['Existing releases', 'Artist presence on DSPs', 'Catalogue size and activity', 'Distribution requirements'],
    dsps: null,
  },
  {
    num: '03',
    title: 'Distribution Setup',
    intro: 'If accepted, we prepare the distribution setup.',
    detail: 'This includes creating the necessary artist or label profiles and preparing the catalogue structure for distribution.',
    bullets: null,
    bulletPrefix: null,
    dsps: null,
  },
  {
    num: '04',
    title: 'Release Intake',
    intro: 'New releases are submitted through the Musicraft intake workflow.',
    detail: null,
    bulletPrefix: 'Typical release requirements include:',
    bullets: ['Audio files (WAV)', 'Cover artwork', 'Release metadata', 'ISRC codes if available'],
    dsps: null,
  },
  {
    num: '05',
    title: 'Quality Control',
    intro: 'Each release is reviewed before delivery to platforms.',
    detail: null,
    bulletPrefix: 'This quality control step checks:',
    bullets: ['Metadata consistency', 'Artwork requirements', 'Audio format', 'Copyright information'],
    dsps: null,
  },
  {
    num: '06',
    title: 'Distribution',
    intro: 'Approved releases are delivered to major music and video platforms.',
    detail: null,
    bulletPrefix: null,
    bullets: null,
    dsps: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'TikTok', 'TIDAL', 'VEVO', 'Deezer'],
  },
  {
    num: '07',
    title: 'Reporting',
    intro: 'Streaming reports and revenue statements are provided periodically based on reports received from DSP platforms.',
    detail: null,
    bullets: null,
    bulletPrefix: null,
    dsps: null,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Manrope, sans-serif', color: '#E8E8F0' }}>
      <MusicraftNav />
      {/* HERO */}
      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: 'rgba(167,139,250,0.9)' }}>
            Distribution Workflow
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>
            How Musicraft Works
          </h1>
          <p className="text-base mb-3" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: '1.7' }}>
            Musicraft is a curated distribution service focused on quality control, metadata accuracy, and long-term catalogue management.
          </p>
          <p className="text-base" style={{ color: 'rgba(232,232,240,0.45)', lineHeight: '1.7' }}>
            Every catalogue is reviewed before acceptance.
          </p>
        </div>
      </section>
      {/* WORKFLOW */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.4), rgba(6,182,212,0.2), transparent)' }} />

            <div className="space-y-6">
              {STEPS?.map((step, idx) => (
                <div key={step?.num} className="relative flex gap-6 md:gap-10">
                  {/* Step number circle */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: 'rgba(10,10,15,1)',
                        border: '1px solid rgba(124,58,237,0.4)',
                        color: 'rgba(167,139,250,0.9)',
                        boxShadow: '0 0 0 4px rgba(10,10,15,1)',
                      }}
                    >
                      {step?.num}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-xl p-6 mb-2"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#E8E8F0' }}>
                      {step?.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: '1.7' }}>
                      {step?.intro}
                    </p>

                    {step?.detail && (
                      <p className="text-sm" style={{ color: 'rgba(232,232,240,0.45)', lineHeight: '1.7' }}>
                        {step?.detail}
                      </p>
                    )}

                    {step?.bulletPrefix && step?.bullets && (
                      <div>
                        <p className="text-xs font-medium mb-2" style={{ color: 'rgba(232,232,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {step?.bulletPrefix}
                        </p>
                        <ul className="space-y-1">
                          {step?.bullets?.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(232,232,240,0.55)' }}>
                              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(124,58,237,0.7)' }} />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step?.dsps && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {step?.dsps?.map((dsp) => (
                          <span
                            key={dsp}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{
                              background: 'rgba(124,58,237,0.1)',
                              border: '1px solid rgba(124,58,237,0.2)',
                              color: 'rgba(167,139,250,0.85)',
                            }}
                          >
                            {dsp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section className="pb-28 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>
              Apply for Distribution
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(232,232,240,0.55)', lineHeight: '1.7' }}>
              Musicraft works with artists and labels who value reliable distribution, metadata quality, and long-term catalogue management.
            </p>
            <Link
              href="/musicraft/apply"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              Apply for Distribution
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
