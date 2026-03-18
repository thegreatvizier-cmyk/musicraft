'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MusicraftNav from '../musicraft/components/MusicraftNav';
import MusicraftFooter from '../musicraft/components/MusicraftFooter';
import CookieConsentBanner from '../musicraft/components/CookieConsentBanner';

const DSP_LOGOS = [
  { name: 'Spotify', color: '#1DB954', icon: '♫' },
  { name: 'Apple Music', color: '#FA243C', icon: '♪' },
  { name: 'YouTube Music', color: '#FF0000', icon: '▶' },
  { name: 'TikTok', color: '#FF0050', icon: '▶' },
  { name: 'Amazon Music', color: '#00A8E1', icon: '◉' },
  { name: 'Deezer', color: '#A238FF', icon: '◈' },
  { name: 'VEVO', color: '#FF0000', icon: '▶' },
  { name: 'TIDAL', color: '#00FFFF', icon: '◎' },
  { name: 'Audiomack', color: '#FFA500', icon: '♬' },
];

const HOW_IT_WORKS = [
  { num: '01', icon: '📝', title: 'Application', desc: 'Submit a short application describing your project or catalogue.' },
  { num: '02', icon: '🔎', title: 'Catalogue Review', desc: 'We review your catalogue, releases, and distribution needs.' },
  { num: '03', icon: '⚙️', title: 'Setup', desc: 'Once accepted, we set up your distribution workflow and release intake.' },
  { num: '04', icon: '🔍', title: 'Release Intake & QC', desc: 'Each release goes through metadata and artwork quality control.' },
  { num: '05', icon: '🚀', title: 'Distribution', desc: 'Approved releases are delivered to DSPs and video platforms.' },
];

const ADDONS = [
  { icon: '🔖', title: 'Pre-save Links', desc: 'Pre-save page for your upcoming release.' },
  { icon: '🎵', title: 'Lyrics Synchronisation', desc: 'Timed lyrics submission to supported DSPs.' },
  { icon: '🃏', title: 'Spotify Promo Cards', desc: 'Branded share cards for release promotion.' },
  { icon: '🎯', title: 'Release Support Pack', desc: 'Dedicated coordinator, priority QC, same-day corrections.' },
];

const WHY_ITEMS = [
  { icon: '🛡️', title: 'Controlled Distribution', desc: 'Every release is reviewed before DSP delivery.' },
  { icon: '💡', title: 'Transparent Pricing', desc: 'Clear monthly plans and revenue share. All fees are communicated upfront.' },
  { icon: '🚫', title: 'No Shortcuts', desc: 'No chart promises, no playlist guarantees.' },
  { icon: '📚', title: 'Long-term Catalogue', desc: 'Built for artists thinking beyond the release date.' },
];

const SLA_ROWS = [
  { service: 'Support response', lite: 'Up to 3 business days', pro: 'Up to 1 business day' },
  { service: 'QC turnaround', lite: 'Up to 5 business days', pro: 'Up to 2 business days' },
  { service: 'DSP delivery', lite: 'Standard', pro: 'Priority' },
  { service: 'Metadata corrections', lite: 'Up to 3 business days', pro: 'Up to 1 business day' },
  { service: 'Takedown requests', lite: 'Up to 5 business days', pro: 'Up to 2 business days' },
];

const FOR_ITEMS = [
  'You release music with intent',
  'You care about correct metadata and platform compliance',
  'You think long-term about your catalogue',
];

const NOT_FOR_ITEMS = [
  'You want instant self-service distribution',
  'You expect promotion or playlist pitching',
  'You plan to release unfinished material',
];

const WHAT_WE_DO_CARDS = [
  { icon: '📡', title: 'DSP Distribution', desc: 'Delivery of audio releases and music videos to major platforms including Spotify, Apple Music, YouTube Music, VEVO, TIDAL and others.' },
  { icon: '🔎', title: 'Metadata Quality Control', desc: 'Manual verification before DSP delivery.' },
  { icon: '🖼️', title: 'Artwork Review', desc: 'Ensuring artwork meets platform requirements.' },
  { icon: '🎧', title: 'Audio Quality Check', desc: 'Validation of audio format and technical standards.' },
  { icon: '📂', title: 'Catalogue Management', desc: 'Support for long-term release maintenance.' },
];

const FAQ_ITEMS = [
  { q: 'What is the difference between Lite and Pro?', a: 'Lite is suited for occasional releases or smaller catalogues. Pro is designed for artists and labels releasing regularly, with priority handling and faster QC turnaround.' },
  { q: 'Is there a per-release fee?', a: 'No. Musicraft charges a monthly plan fee plus a revenue share on royalties generated through distributed releases. There are no per-release fees.' },
  { q: 'How long does distribution take?', a: 'QC turnaround is up to 5 business days on Lite and up to 2 business days on Pro. DSP processing times are controlled by each platform.' },
  { q: 'Does Musicraft distribute music videos?', a: 'Yes. Musicraft supports distribution of official music videos to platforms such as VEVO, Apple Music and TIDAL where applicable.' },
];

export default function MusicraftHome() {
  const [scrollY, setScrollY] = useState(0);
  const [formState, setFormState] = useState({ name: '', email: '', plan: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      style={{
        background: '#0A0A0F',
        color: '#E8E8F0',
        fontFamily: 'Manrope, sans-serif',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Glow animation keyframes */}
      <style>{`
        @keyframes glowDriftPurple {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(18px, -22px) scale(1.03); }
          50%  { transform: translate(28px, 12px) scale(1.02); }
          75%  { transform: translate(-14px, 20px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes glowDriftTeal {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(-20px, 16px) scale(1.02); }
          50%  { transform: translate(-28px, -18px) scale(0.97); }
          75%  { transform: translate(12px, -24px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes bgGradientShift {
          0%   { background-position: 0% 0%; }
          25%  { background-position: 30% 20%; }
          50%  { background-position: 60% 40%; }
          75%  { background-position: 30% 60%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Global background layers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 0% 0%, rgba(124, 58, 237, 0.10) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 55%), #0A0A0F',
            backgroundSize: '200% 200%',
            animation: 'bgGradientShift 35s ease-in-out infinite',
            willChange: 'background-position',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '-200px',
            width: '900px',
            height: '900px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 65%)',
            filter: 'blur(80px)',
            opacity: 0.9,
            animation: 'glowDriftPurple 28s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-200px',
            right: '-200px',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, transparent 65%)',
            filter: 'blur(80px)',
            opacity: 0.9,
            animation: 'glowDriftTeal 22s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle at top left, rgba(124, 58, 237, 0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.16) 0%, transparent 70%)',
          }}
        />
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.06,
            pointerEvents: 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="musicraft-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#musicraft-grain)" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* NAV */}
        <MusicraftNav />

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 8s ease-in-out infinite' }} />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 10s ease-in-out infinite reverse' }} />
            <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Curated distribution — by application
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
              <span style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 60%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto', animation: 'gradientShift 4s linear infinite' }}>Less hype.</span>
              <span style={{ color: '#E8E8F0' }}> More control.</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              Curated music and video distribution focused on quality, metadata accuracy, and long-term catalogue management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/musicraft/apply" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
                Apply for Distribution
              </Link>
              <a href="#how-it-works" className="px-8 py-4 rounded-xl text-base font-medium transition-all hover:scale-105" style={{ color: 'rgba(232,232,240,0.8)', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                How It Works
              </a>
            </div>
            <p className="text-sm mt-4" style={{ color: 'rgba(232,232,240,0.4)' }}>Every catalogue is reviewed before acceptance.</p>
          </div>

          <div className="relative z-10 mt-20 w-full max-w-3xl mx-auto">
            <p className="text-center text-xs font-medium mb-6" style={{ color: 'rgba(232,232,240,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Distributed to major music and video platforms</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {DSP_LOGOS.map((dsp) => (
                <div key={dsp.name} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${dsp.color}20`, color: dsp.color }}>{dsp.icon}</div>
                  <span className="text-xs font-medium text-center hidden sm:block" style={{ color: 'rgba(232,232,240,0.5)' }}>{dsp.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR / WHO IT'S NOT */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.25)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.3)' }}>✓</div>
                  <h3 className="text-lg font-bold" style={{ color: '#A78BFA' }}>Musicraft is a good fit if:</h3>
                </div>
                <ul className="space-y-3">
                  {FOR_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.75)' }}>
                      <span className="flex-shrink-0" style={{ color: '#A78BFA' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>✕</div>
                  <h3 className="text-lg font-bold" style={{ color: 'rgba(232,232,240,0.7)' }}>Musicraft may not be the right fit if:</h3>
                </div>
                <ul className="space-y-3">
                  {NOT_FOR_ITEMS.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.55)' }}>
                      <span className="flex-shrink-0" style={{ color: 'rgba(232,232,240,0.35)' }}>✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>
              There are many great self-service distributors available. Musicraft is built for a different workflow.
            </p>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>What We Do</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {WHAT_WE_DO_CARDS.map((card, index) => (
                <div key={card.title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl" style={index === 0 ? { background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.45)', boxShadow: '0 0 24px rgba(124,58,237,0.18)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}>{card.icon}</div>
                  <p className="text-sm font-semibold" style={{ color: '#E8E8F0' }}>{card.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,232,240,0.55)' }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>How It Works</h2>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute left-[2.25rem] top-10 bottom-10 w-px" style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(6,182,212,0.5))' }} />
              <div className="space-y-6">
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={step.num} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl flex flex-col items-center justify-center relative z-10" style={{ background: i === 0 ? 'linear-gradient(135deg, #7C3AED, #06B6D4)' : 'rgba(255,255,255,0.03)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
                      <span className="text-xl">{step.icon}</span>
                      <span className="text-xs font-bold mt-0.5" style={{ color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(232,232,240,0.4)' }}>{step.num}</span>
                    </div>
                    <div className="flex-1 p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <h3 className="text-lg font-bold mb-1" style={{ color: '#E8E8F0' }}>{step.title}</h3>
                      <p className="text-sm" style={{ color: 'rgba(232,232,240,0.6)' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Pricing</h2>
              <p className="text-base font-medium" style={{ color: 'rgba(232,232,240,0.5)' }}>Simple monthly plans plus revenue share. No per-release fees.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#E8E8F0' }}>Lite</h3>
                  <p className="text-sm mb-5" style={{ color: 'rgba(232,232,240,0.5)' }}>For focused releases with straightforward needs.</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>€19</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>/ month</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>10%</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>revenue share</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Digital distribution', 'Quality control', 'Release handling (singles, EPs, albums)', 'Royalty reporting access', 'Clear communication'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.7)' }}>
                      <span className="flex-shrink-0" style={{ color: '#06B6D4' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/musicraft/apply" className="block text-center py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.08)', color: '#E8E8F0', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Apply for Distribution
                </Link>
              </div>

              <div className="p-8 rounded-2xl relative" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }}>Recommended</div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#E8E8F0' }}>Pro</h3>
                  <p className="text-sm mb-5" style={{ color: 'rgba(232,232,240,0.5)' }}>For artists releasing regularly or managing more complex catalogues.</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>€49</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>/ month</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>5%</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>revenue share</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Everything in Lite', 'Priority handling', 'Support for more complex releases', 'Ongoing catalogue management', 'Greater operational flexibility'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.7)' }}>
                      <span className="flex-shrink-0" style={{ color: '#A78BFA' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/musicraft/apply" className="block text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}>
                  Apply for Distribution
                </Link>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>Revenue share applies only to royalties generated through Musicraft-distributed releases. Monthly plan fees and revenue share apply only during active plan periods.</p>
            </div>
          </div>
        </section>

        {/* SERVICE LEVELS */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Service Levels</h2>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid grid-cols-3 px-6 py-4" style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-semibold" style={{ color: 'rgba(232,232,240,0.5)' }}>Service</div>
                <div className="text-sm font-semibold text-center" style={{ color: '#A78BFA' }}>Lite</div>
                <div className="text-sm font-semibold text-center" style={{ color: '#06B6D4' }}>Pro</div>
              </div>
              {SLA_ROWS.map((row, i) => (
                <div key={row.service} className="grid grid-cols-3 px-6 py-4" style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderBottom: i < SLA_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div className="text-sm font-medium" style={{ color: '#E8E8F0' }}>{row.service}</div>
                  <div className="text-sm text-center" style={{ color: 'rgba(232,232,240,0.6)' }}>{row.lite}</div>
                  <div className="text-sm text-center font-medium" style={{ color: 'rgba(232,232,240,0.8)' }}>{row.pro}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm mt-6" style={{ color: 'rgba(232,232,240,0.4)' }}>
              Service levels apply Mon–Fri. DSP processing times are controlled by each platform.
            </p>
          </div>
        </section>

        {/* ADD-ONS */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Add-ons</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-4">
              {ADDONS.map((addon) => (
                <div key={addon.title} className="p-6 rounded-2xl flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.2)' }}>{addon.icon}</div>
                  <div>
                    <h3 className="text-base font-bold mb-1" style={{ color: '#E8E8F0' }}>{addon.title}</h3>
                    <p className="text-sm" style={{ color: 'rgba(232,232,240,0.55)' }}>{addon.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-2" style={{ color: 'rgba(232,232,240,0.35)' }}>
              Contact us for details on add-on availability and pricing.
            </p>
          </div>
        </section>

        {/* WHY MUSICRAFT */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Why Musicraft</h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {WHY_ITEMS.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#E8E8F0' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(232,232,240,0.55)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOR ARTISTS AND LABELS */}
        <section className="py-24 px-6">
          <div className="max-w-[680px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-10" style={{ color: '#E8E8F0', letterSpacing: '0.18em' }}>For Artists and Labels</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(232,232,240,0.6)' }}>Musicraft is a curated distribution service focused on reliable delivery, metadata quality, and long-term catalogue management.</p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(232,232,240,0.6)' }}>We work with independent artists and labels who treat music distribution as infrastructure rather than promotion.</p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.6)' }}>Every catalogue is reviewed before acceptance.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>FAQ</h2>
            </div>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="text-base font-bold mb-3" style={{ color: '#E8E8F0' }}>{item.q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,232,240,0.6)' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* APPLY CTA */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Apply for Distribution</h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(232,232,240,0.6)' }}>Musicraft is a curated distribution service. Every catalogue is reviewed before acceptance.</p>
            <a
              href="/musicraft/apply"
              className="inline-block px-10 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
            >
              Apply for Distribution
            </a>
          </div>
        </section>

        <MusicraftFooter />
        <CookieConsentBanner />
      </div>
    </div>
  );
}
