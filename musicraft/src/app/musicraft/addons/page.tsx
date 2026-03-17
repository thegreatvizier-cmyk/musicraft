'use client';

import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';

interface Addon {
  icon: string;
  title: string;
  description: string;
  price: string;
  perRelease: boolean;
  isBestValue: boolean;
  includes: string[] | null;
  savingsNote: string | null;
}

const ADDONS: Addon[] = [
  {
    icon: '🔖',
    title: 'Pre-save Campaign',
    description: 'Create a custom pre-save landing page for your upcoming release and allow fans to save the track before release day.',
    price: '€19',
    perRelease: true,
    isBestValue: false,
    includes: null,
    savingsNote: null,
  },
  {
    icon: '🎵',
    title: 'Lyrics Distribution',
    description: 'Preparation and distribution of song lyrics to supported DSP platforms and social media.',
    price: '€19',
    perRelease: true,
    isBestValue: false,
    includes: null,
    savingsNote: null,
  },
  {
    icon: '🎨',
    title: 'Spotify Promo Cards',
    description: 'Custom promotional graphics designed for sharing your release across social media and messaging platforms.',
    price: '€14',
    perRelease: false,
    isBestValue: false,
    includes: null,
    savingsNote: null,
  },
  {
    icon: '📦',
    title: 'Release Support Pack',
    description: 'Bundle of selected services designed to support a single release.',
    price: '€45',
    perRelease: false,
    isBestValue: true,
    includes: ['Pre-save Campaign', 'Lyrics Distribution', 'Spotify Promo Cards'],
    savingsNote: 'Save €7 compared to individual services',
  },
];

export default function AddonsPage() {
  return (
    <div className="min-h-screen" style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}>
      <MusicraftNav />
      <main className="pt-32 pb-24 px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#E8E8F0', letterSpacing: '-0.03em' }}>Add-ons</h1>
            <p className="text-lg" style={{ color: 'rgba(232,232,240,0.5)' }}>Optional services designed to support professional release campaigns.</p>
          </div>

          {/* Add-ons Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {ADDONS.map((addon) => (
              <div
                key={addon.title}
                className="p-8 rounded-2xl flex flex-col relative"
                style={{
                  background: addon.isBestValue
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.10) 100%)'
                    : 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(6,182,212,0.05) 100%)',
                  border: addon.isBestValue
                    ? '1px solid rgba(124,58,237,0.45)'
                    : '1px solid rgba(124,58,237,0.25)',
                  boxShadow: addon.isBestValue
                    ? '0 0 50px rgba(124,58,237,0.20)'
                    : '0 0 40px rgba(124,58,237,0.10)',
                }}
              >
                {addon.isBestValue && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: '#fff', letterSpacing: '0.03em' }}
                  >
                    Best Value
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                  >
                    {addon.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: '#E8E8F0' }}>{addon.title}</h3>
                    <p className="text-sm" style={{ color: 'rgba(232,232,240,0.55)', lineHeight: 1.7 }}>{addon.description}</p>
                  </div>
                </div>

                {addon.includes && (
                  <ul className="mb-4 space-y-1 pl-1">
                    {addon.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(232,232,240,0.60)' }}>
                        <span style={{ color: '#7C3AED', fontSize: '10px' }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: '#E8E8F0' }}>{addon.price}</span>
                    {addon.perRelease && (
                      <span className="text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>/ release</span>
                    )}
                  </div>
                  {addon.savingsNote && (
                    <p className="mt-1 text-xs" style={{ color: 'rgba(232,232,240,0.38)' }}>{addon.savingsNote}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* VAT note */}
          <p className="text-xs text-center mb-20" style={{ color: 'rgba(232,232,240,0.35)' }}>
            Prices include VAT where applicable. For EU business customers with a valid VAT ID, reverse charge may apply.
          </p>

          {/* CTA Section */}
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.08) 100%)',
              border: '1px solid rgba(124,58,237,0.2)',
              boxShadow: '0 0 60px rgba(124,58,237,0.10)',
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Need additional services?</h2>
            <p className="text-base mb-8" style={{ color: 'rgba(232,232,240,0.55)' }}>Add-ons are available for Musicraft releases.</p>
            <Link
              href="/musicraft/apply"
              className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            >
              Apply for Distribution
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
