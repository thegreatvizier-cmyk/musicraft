'use client';

import { useState } from 'react';
import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';

const PLANS = [
  {
    name: 'LITE',
    monthlyPrice: 19,
    annualPrice: 190,
    revenueShare: '10% revenue share',
    desc: 'For occasional releases or smaller catalogues.',
    features: [
      'DSP distribution',
      'Metadata and artwork review',
      'Audio format validation',
      'Release handling (singles, EPs, albums)',
      'Basic catalogue management',
    ],
    highlight: false,
  },
  {
    name: 'PRO',
    monthlyPrice: 36,
    annualPrice: 360,
    revenueShare: '5% revenue share',
    desc: 'For artists and labels releasing regularly.',
    features: [
      'Everything in Lite',
      'Priority handling',
      'Faster QC turnaround',
      'Ongoing catalogue management',
      'Support for more complex releases',
    ],
    highlight: true,
  },
];

const FAQS = [
  { q: 'How long does distribution take?', a: 'Most releases go live within 24–48 hours. Some DSPs like Spotify and Apple Music can take up to 5 business days for first-time submissions.' },
  { q: 'What is the revenue share?', a: 'Revenue share applies only to royalties generated through Musicraft-distributed releases. The Lite plan has a 10% revenue share and the Pro plan has a 5% revenue share.' },
  { q: 'Can I distribute music I co-wrote with others?', a: 'Yes. You can add multiple contributors with custom royalty splits directly in the metadata step of your release upload.' },
  { q: 'What happens if I want to take down a release?', a: 'You can submit a takedown request from your dashboard at any time. Takedowns are processed within 5–7 business days across all DSPs.' },
  { q: 'Is there a contract or lock-in period?', a: 'No contracts, no lock-in. You can cancel or downgrade your plan at any time. Your music stays live unless you request a takedown.' },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen" style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}>
      <MusicraftNav />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#E8E8F0', letterSpacing: '-0.03em' }}>Simple pricing for curated distribution</h1>
            <p className="text-lg" style={{ color: 'rgba(232,232,240,0.5)' }}>Two plans. Monthly fee plus revenue share. No per-release fees.</p>
          </div>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => setIsAnnual(false)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                style={!isAnnual
                  ? { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }
                  : { color: 'rgba(232,232,240,0.5)', background: 'transparent' }
                }
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                style={isAnnual
                  ? { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }
                  : { color: 'rgba(232,232,240,0.5)', background: 'transparent' }
                }
              >
                Annual
                <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: isAnnual ? 'rgba(255,255,255,0.2)' : 'rgba(124,58,237,0.3)', color: isAnnual ? 'white' : '#A78BFA' }}>
                  Save 20%
                </span>
              </button>
            </div>
            {isAnnual && (
              <p className="text-xs font-medium" style={{ color: '#06B6D4' }}>
                🎁 2 months free — pay for 10, get 12
              </p>
            )}
          </div>

          {/* Plans availability note */}
          <p className="text-center text-sm mb-8" style={{ color: 'rgba(232,232,240,0.45)' }}>Plans are available after catalogue review.</p>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {PLANS?.map((plan) => {
              const displayPrice = isAnnual ? `€${plan?.annualPrice}` : `€${plan?.monthlyPrice}`;
              const displayPeriod = isAnnual ? '/ year' : '/ month';
              const equivMonthly = isAnnual ? (plan?.annualPrice / 12)?.toFixed(2) : null;

              return (
                <div key={plan?.name} className="p-8 rounded-2xl relative" style={{
                  background: plan?.highlight
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${plan?.highlight ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: plan?.highlight ? '0 0 60px rgba(124,58,237,0.15)' : 'none',
                }}>
                  {plan?.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }}>Recommended</div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(232,232,240,0.5)' }}>{plan?.name}</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-bold" style={{ color: '#E8E8F0' }}>{displayPrice}</span>
                      <span className="text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>{displayPeriod}</span>
                    </div>
                    {isAnnual && equivMonthly && (
                      <p className="text-xs mb-1" style={{ color: 'rgba(232,232,240,0.4)' }}>
                        €{equivMonthly} / mo · <span style={{ color: 'rgba(232,232,240,0.3)', textDecoration: 'line-through' }}>€{plan?.monthlyPrice} / mo</span>
                      </p>
                    )}
                    {isAnnual && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)' }}>
                        <span className="text-xs font-semibold" style={{ color: '#06B6D4' }}>2 months free</span>
                      </div>
                    )}
                    <p className="text-sm font-semibold mb-3" style={{ color: plan?.highlight ? '#06B6D4' : 'rgba(232,232,240,0.55)' }}>{plan?.revenueShare}</p>
                    <p className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>{plan?.desc}</p>
                  </div>
                  <Link
                    href="/musicraft/apply"
                    className="block text-center py-3 rounded-xl text-sm font-semibold mb-6 transition-all hover:scale-105"
                    style={plan?.highlight
                      ? { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }
                      : { background: 'rgba(255,255,255,0.08)', color: '#E8E8F0', border: '1px solid rgba(255,255,255,0.1)' }
                    }
                  >
                    Apply for Distribution
                  </Link>
                  <ul className="space-y-3">
                    {plan?.features?.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.7)' }}>
                        <span style={{ color: '#06B6D4' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Revenue share note */}
          <p className="text-center text-xs mb-20" style={{ color: 'rgba(232,232,240,0.35)', maxWidth: '560px', margin: '0 auto 5rem' }}>
            Revenue share applies only to royalties generated through Musicraft-distributed releases. Plan fees and revenue share apply only during active plan periods.
          </p>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#E8E8F0' }}>Frequently asked questions</h2>
            <div className="space-y-3">
              {FAQS?.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="text-sm font-semibold" style={{ color: '#E8E8F0' }}>{faq?.q}</span>
                    <span className="text-lg transition-transform" style={{ color: 'rgba(232,232,240,0.4)', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-sm" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>{faq?.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
