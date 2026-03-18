'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MusicraftNav() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4" style={{ background: scrollY > 40 ? 'rgba(10,10,15,0.92)' : 'transparent', backdropFilter: scrollY > 40 ? 'blur(20px)' : 'none', borderBottom: scrollY > 40 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all 0.4s ease' }}>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/musicraft-logo-1773170717567.png"
          alt="Musicraft logo"
          width={140}
          height={36}
          className="object-contain"
          priority
        />
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {[['Pricing', '/musicraft/pricing'], ['How It Works', '/musicraft/how-it-works'], ['Artists & Labels', '/musicraft/artists'], ['Support', '/musicraft/support']]?.map(([label, href]) => (
          <Link key={label} href={href} className="text-sm font-medium transition-colors" style={{ color: 'rgba(232,232,240,0.6)', fontFamily: 'Manrope, sans-serif' }} onMouseEnter={e => (e.currentTarget.style.color = '#E8E8F0')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,232,240,0.6)')}>{label}</Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/musicraft/apply" className="text-sm font-semibold px-5 py-2 rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', fontFamily: 'Manrope, sans-serif' }}>Apply for Distribution</Link>
      </div>
    </nav>
  );
}
