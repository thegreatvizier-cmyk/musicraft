'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MusicraftNav from '../components/MusicraftNav';


const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Bolivia',
  'Brazil', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark',
  'Ecuador', 'Egypt', 'Ethiopia', 'Finland', 'France', 'Germany', 'Ghana', 'Greece',
  'Hungary', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kenya', 'South Korea', 'Lebanon', 'Malaysia', 'Mexico',
  'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore',
  'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
  'Venezuela', 'Vietnam', 'Zimbabwe',
];

const GENRES = [
  'Pop', 'Hip-Hop/Rap', 'R&B/Soul', 'Electronic/Dance', 'Rock', 'Indie',
  'Afrobeats', 'Latin', 'Classical', 'Jazz', 'Country', 'Other',
];

const CATALOG_SIZES = [
  '1–5 releases',
  '6–20 releases',
  '21–50 releases',
  '50+ releases',
];

interface FormData {
  artistName: string;
  country: string;
  genres: string[];
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  catalogSize: string;
  previousDistributor: string;
  contactEmail: string;
  description: string;
}

export default function ApplyPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    artistName: '',
    country: '',
    genres: [],
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    catalogSize: '',
    previousDistributor: '',
    contactEmail: '',
    description: '',
  });

  const toggleGenre = (genre: string) => {
    setForm(prev => {
      const already = prev.genres.includes(genre);
      if (already) {
        return { ...prev, genres: prev.genres.filter(g => g !== genre) };
      }
      if (prev.genres.length >= 3) return prev;
      return { ...prev, genres: [...prev.genres, genre] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistName: form.artistName,
          contactEmail: form.contactEmail,
          country: form.country,
          genres: form.genres,
          spotifyUrl: form.spotifyUrl,
          appleMusicUrl: form.appleMusicUrl,
          youtubeUrl: form.youtubeUrl,
          catalogSize: form.catalogSize,
          previousDistributor: form.previousDistributor,
          description: form.description,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      window.location.href = '/musicraft/apply/thank-you';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ color: '#E8E8F0', fontFamily: 'Manrope, sans-serif' }}>
      <MusicraftNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#A78BFA' }} />
              Invite-Only Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Apply for Distribution</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              MUSICRAFT reviews every application. Approved artists and labels receive a personal invite to access the distribution dashboard.
            </p>

            {/* Trust points */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              {[
                { icon: '✦', label: 'Curated platform' },
                { icon: '🌍', label: 'Global DSP delivery' },
                { icon: '💬', label: 'Dedicated support' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>
                  <span style={{ color: '#A78BFA' }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card or Confirmation */}
          {false ? (
            <div className="p-12 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))', border: '1px solid rgba(124,58,237,0.4)' }}>✓</div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8E8F0' }}>Application Received</h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
                Thank you. We&apos;ll review your application and be in touch within 5–7 business days.
              </p>
              <Link href="/musicraft" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#A78BFA' }}>
                ← Back to Homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="p-8 md:p-10 rounded-2xl space-y-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>

                {/* Artist or Label Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#E8E8F0' }}>Artist or Label Name <span style={{ color: '#A78BFA' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Zara Okonkwo or Neon Records"
                    value={form.artistName}
                    onChange={e => setForm({ ...form, artistName: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E8E8F0' }}
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#E8E8F0' }}>Country <span style={{ color: '#A78BFA' }}>*</span></label>
                  <select
                    value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: form.country ? '#E8E8F0' : 'rgba(232,232,240,0.4)' }}
                  >
                    <option value="" disabled style={{ background: '#111118', color: 'rgba(232,232,240,0.4)' }}>Select your country</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c} style={{ background: '#111118', color: '#E8E8F0' }}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Primary Genres */}
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#E8E8F0' }}>Primary Genres <span style={{ color: '#A78BFA' }}>*</span></label>
                  <p className="text-xs mb-3" style={{ color: 'rgba(232,232,240,0.4)' }}>Select up to 3 genres</p>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map(genre => {
                      const selected = form.genres.includes(genre);
                      return (
                        <button
                          key={genre}
                          type="button"
                          onClick={() => toggleGenre(genre)}
                          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                          style={{
                            background: selected ? 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(6,182,212,0.3))' : 'rgba(255,255,255,0.06)',
                            border: selected ? '1px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.1)',
                            color: selected ? '#E8E8F0' : 'rgba(232,232,240,0.6)',
                          }}
                        >
                          {genre}
                        </button>
                      );
                    })}
                  </div>
                  {form.genres.length === 0 && (
                    <p className="text-xs mt-2" style={{ color: 'rgba(232,232,240,0.3)' }}>Please select at least one genre</p>
                  )}
                </div>

                {/* Streaming Profile Links */}
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#E8E8F0' }}>Streaming Profile Links</label>
                  <p className="text-xs mb-4" style={{ color: 'rgba(232,232,240,0.4)' }}>Providing links helps us review your catalog faster</p>
                  <div className="space-y-3">
                    {[
                      { key: 'spotifyUrl', label: 'Spotify Artist URL', placeholder: 'https://open.spotify.com/artist/...' },
                      { key: 'appleMusicUrl', label: 'Apple Music Artist URL', placeholder: 'https://music.apple.com/artist/...' },
                      { key: 'youtubeUrl', label: 'YouTube Channel URL', placeholder: 'https://youtube.com/@...' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-xs font-medium w-36 flex-shrink-0" style={{ color: 'rgba(232,232,240,0.5)' }}>{label}</span>
                        <input
                          type="url"
                          placeholder={placeholder}
                          value={form[key as keyof FormData] as string}
                          onChange={e => setForm({ ...form, [key]: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E8E8F0' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Catalog Size */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#E8E8F0' }}>Catalog Size <span style={{ color: '#A78BFA' }}>*</span></label>
                  <select
                    value={form.catalogSize}
                    onChange={e => setForm({ ...form, catalogSize: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: form.catalogSize ? '#E8E8F0' : 'rgba(232,232,240,0.4)' }}
                  >
                    <option value="" disabled style={{ background: '#111118', color: 'rgba(232,232,240,0.4)' }}>Select catalog size</option>
                    {CATALOG_SIZES.map(s => (
                      <option key={s} value={s} style={{ background: '#111118', color: '#E8E8F0' }}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Previous Distributor */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#E8E8F0' }}>Previous Distributor <span className="text-xs font-normal" style={{ color: 'rgba(232,232,240,0.4)' }}>(optional)</span></label>
                  <input
                    type="text"
                    placeholder="e.g. DistroKid, TuneCore, CD Baby (leave blank if none)"
                    value={form.previousDistributor}
                    onChange={e => setForm({ ...form, previousDistributor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E8E8F0' }}
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#E8E8F0' }}>Contact Email <span style={{ color: '#A78BFA' }}>*</span></label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.contactEmail}
                    onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E8E8F0' }}
                  />
                </div>

                {/* Short Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold" style={{ color: '#E8E8F0' }}>Short Description of Your Project <span style={{ color: '#A78BFA' }}>*</span></label>
                    <span className="text-xs" style={{ color: form.description.length > 450 ? '#F87171' : 'rgba(232,232,240,0.4)' }}>{form.description.length}/500</span>
                  </div>
                  <textarea
                    placeholder="Tell us about your music, your audience, and why you want to distribute with MUSICRAFT"
                    value={form.description}
                    onChange={e => { if (e.target.value.length <= 500) setForm({ ...form, description: e.target.value }); }}
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E8E8F0' }}
                  />
                </div>

                {/* Submit */}
                <div>
                  {error && (
                    <p className="text-sm mb-4 text-center" style={{ color: '#F87171' }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={form.genres.length === 0 || submitting}
                    className="w-full py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 40px rgba(124,58,237,0.3)' }}
                  >
                    {submitting ? 'Submitting…' : 'Submit Application'}
                  </button>
                  <p className="text-center text-xs mt-4" style={{ color: 'rgba(232,232,240,0.4)' }}>
                    Applications are reviewed within 5–7 business days. You will be contacted via email with a decision.
                  </p>
                </div>

              </div>
            </form>
          )}
        </div>
      </main>

    </div>
  );
}
