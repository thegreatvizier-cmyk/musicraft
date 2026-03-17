'use client';

import { useState } from 'react';
import MusicraftNav from '../components/MusicraftNav';


const SUPPORT_TOPICS = [
  {
    icon: '📦',
    title: 'Distribution & Releases',
    description: 'Questions about submitting releases, delivery timelines, and platform availability.',
  },
  {
    icon: '🎤',
    title: 'Metadata & Artist Profiles',
    description: 'Issues related to artist profiles, name collisions, and metadata corrections.',
  },
  {
    icon: '💰',
    title: 'Royalties & Revenue Share',
    description: 'Information about royalty reporting and revenue share structure.',
  },
  {
    icon: '📚',
    title: 'Catalogue Management',
    description: 'Questions about updating, removing, or managing existing releases.',
  },
  {
    icon: '📋',
    title: 'Applications & Onboarding',
    description: 'Information about the application process and onboarding steps.',
  },
];

const FAQS = [
  {
    question: 'How long does distribution take?',
    answer:
      'After QC approval, releases are typically delivered to DSPs within 2–5 business days. Processing times on individual platforms may vary.',
  },
  {
    question: 'Can Musicraft fix artist profile issues on DSPs?',
    answer:
      'We can assist with artist profile corrections and name collision issues as part of our distribution setup. Resolution timelines depend on each platform.',
  },
  {
    question: 'Does Musicraft provide marketing or playlist promotion?',
    answer:
      'No. Musicraft is a distribution service only. We do not provide marketing, PR, playlist pitching, or audience development services.',
  },
  {
    question: 'What happens if I pause my plan?',
    answer:
      'Pausing your plan retains your releases on DSPs. Revenue share drops to 0% during the paused period. You can resume at any time.',
  },
  {
    question: 'Can I distribute music videos as well?',
    answer:
      'Yes. Musicraft supports distribution of official music videos to platforms such as VEVO, Apple Music, and TIDAL where applicable.',
  },
  {
    question: 'How long does the application review take?',
    answer: 'Applications are typically reviewed within 3–5 business days.',
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      className="min-h-screen"
      style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}
    >

      <MusicraftNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* ── 1. HERO ── */}
          <div className="text-center mb-24">
            <h1
              className="text-5xl md:text-6xl font-bold mb-5"
              style={{ color: '#E8E8F0', letterSpacing: '-0.03em' }}
            >
              Support
            </h1>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: 'rgba(232,232,240,0.55)', lineHeight: '1.7' }}
            >
              Find answers to common questions about distribution, releases, and catalogue management.
            </p>
          </div>

          {/* ── 2. SUPPORT TOPICS ── */}
          <section className="mb-28">
            <h2
              className="text-2xl font-bold mb-10 text-center"
              style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}
            >
              Support Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SUPPORT_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="p-7 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="text-3xl mb-4">{topic.icon}</div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: '#E8E8F0' }}
                  >
                    {topic.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(232,232,240,0.55)' }}
                  >
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. FAQ ── */}
          <section className="mb-28">
            <h2
              className="text-2xl font-bold mb-10 text-center"
              style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: openIndex === i
                      ? 'rgba(124,58,237,0.08)'
                      : 'rgba(255,255,255,0.03)',
                    border: openIndex === i
                      ? '1px solid rgba(124,58,237,0.3)'
                      : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => toggle(i)}
                  >
                    <span
                      className="text-sm font-semibold pr-4"
                      style={{ color: '#E8E8F0' }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                      style={{
                        background: openIndex === i
                          ? 'linear-gradient(135deg, #7C3AED, #06B6D4)'
                          : 'rgba(255,255,255,0.08)',
                        transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="#E8E8F0" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-5">
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(232,232,240,0.65)' }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. CONTACT SUPPORT CTA ── */}
          <section className="text-center">
            <div
              className="inline-block w-full max-w-2xl rounded-3xl px-10 py-14"
              style={{
                background:
                  'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)',
                border: '1px solid rgba(124,58,237,0.25)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}
              >
                Still need help?
              </h2>
              <p
                className="text-base mb-8 max-w-md mx-auto"
                style={{ color: 'rgba(232,232,240,0.6)', lineHeight: '1.7' }}
              >
                If you cannot find the answer you&apos;re looking for, feel free to contact us.
              </p>
              <a
                href="mailto:support@musicraft.eu"
                className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
              >
                Contact Support
              </a>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
