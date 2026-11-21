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
  { num: '01', icon: '📝', title: 'Přihláška', desc: 'Vyplníte krátkou přihlášku a popíšete svůj projekt nebo katalog.' },
  { num: '02', icon: '🔎', title: 'Posouzení katalogu', desc: 'Projdeme váš katalog, vydání a to, co od distribuce potřebujete.' },
  { num: '03', icon: '⚙️', title: 'Nastavení', desc: 'Po přijetí pro vás nastavíme distribuci a příjem nových vydání.' },
  { num: '04', icon: '🔍', title: 'Příjem vydání a kontrola', desc: 'Každé vydání projde kontrolou metadat a obalu.' },
  { num: '05', icon: '🚀', title: 'Distribuce', desc: 'Schválená vydání doručíme na hudební a video platformy.' },
];

const ADDONS = [
  { icon: '🔖', title: 'Pre-save odkazy', desc: 'Stránka pro předuložení chystaného vydání.' },
  { icon: '🎵', title: 'Synchronizované texty', desc: 'Časované texty písní pro podporované platformy.' },
  { icon: '🃏', title: 'Spotify promo karty', desc: 'Grafické karty ke sdílení při propagaci vydání.' },
  { icon: '🎯', title: 'Balíček podpory vydání', desc: 'Vlastní koordinátor, přednostní kontrola a opravy ještě týž den.' },
];

const WHY_ITEMS = [
  { icon: '🛡️', title: 'Kontrolovaná distribuce', desc: 'Každé vydání před odesláním na platformy zkontrolujeme.' },
  { icon: '💡', title: 'Transparentní ceny', desc: 'Jasné tarify a podíl z výnosů. Všechny poplatky znáte předem.' },
  { icon: '🚫', title: 'Žádné zkratky', desc: 'Neslibujeme žebříčky ani místa v playlistech.' },
  { icon: '📚', title: 'Dlouhodobý katalog', desc: 'Pro umělce, kteří přemýšlejí i o tom, co bude po vydání.' },
];

const SLA_ROWS = [
  { service: 'Odpověď podpory', lite: 'do 3 pracovních dnů', pro: 'do 1 pracovního dne' },
  { service: 'Kontrola vydání', lite: 'do 5 pracovních dnů', pro: 'do 2 pracovních dnů' },
  { service: 'Doručení na platformy', lite: 'Standardní', pro: 'Přednostní' },
  { service: 'Opravy metadat', lite: 'do 3 pracovních dnů', pro: 'do 1 pracovního dne' },
  { service: 'Stažení vydání', lite: 'do 5 pracovních dnů', pro: 'do 2 pracovních dnů' },
];

const FOR_ITEMS = [
  'vydáváte hudbu s jasným záměrem,',
  'vám záleží na správných metadatech a souladu s pravidly platforem,',
  'přemýšlíte o svém katalogu dlouhodobě.',
];

const NOT_FOR_ITEMS = [
  'chcete okamžitou samoobslužnou distribuci,',
  'čekáte propagaci nebo umisťování do playlistů,',
  'plánujete vydávat nedokončený materiál.',
];

const WHAT_WE_DO_CARDS = [
  { icon: '📡', title: 'Distribuce na platformy', desc: 'Doručení audio vydání i videoklipů na Spotify, Apple Music, YouTube Music, VEVO, TIDAL a další.' },
  { icon: '🔎', title: 'Kontrola metadat', desc: 'Každé vydání ručně zkontrolujeme ještě před odesláním na platformy.' },
  { icon: '🖼️', title: 'Kontrola obalu', desc: 'Ověříme, že artwork splňuje požadavky platforem.' },
  { icon: '🎧', title: 'Kontrola zvuku', desc: 'Ověříme formát a technické parametry nahrávky.' },
  { icon: '📂', title: 'Správa katalogu', desc: 'Postaráme se o vaše vydání i dlouho po datu vydání.' },
];

// TODO: nahradit skutečnými jmény po souhlasu klientů
const CLIENT_NAMES = ['[Interpret 1]', '[Interpret 2]', '[Interpret 3]', '[Label 1]', '[Label 2]', '[Label 3]'];

// TODO: nahradit skutečnými citacemi po souhlasu klientů
const TESTIMONIALS = [
  { quote: '[Krátká citace o spolehlivosti a komunikaci.]', name: '[Jméno]', role: '[interpret]' },
  { quote: '[Krátká citace o kontrole kvality nebo royalty portálu.]', name: '[Jméno]', role: '[label]' },
  { quote: '[Krátká citace o přechodu od jiného distributora.]', name: '[Jméno]', role: '[interpret]' },
];

const FAQ_ITEMS = [
  { q: 'Jaký je rozdíl mezi Lite a Pro?', a: 'Lite je pro občasná vydání a menší katalogy. Pro je pro umělce a labely, kteří vydávají pravidelně. Nabízí přednostní vyřízení a rychlejší kontrolu.' },
  { q: 'Na kolik interpretů se tarif vztahuje?', a: 'Tarif Lite pokrývá jednoho interpreta. Pokud vydáváte pod více jmény nebo zastupujete label, domluvíme individuální podmínky.' },
  { q: 'Platí se za jednotlivá vydání?', a: 'Ne. Platíte měsíční nebo roční tarif a podíl z výnosů z distribuovaných vydání. Za jednotlivá vydání nic neplatíte.' },
  { q: 'Vystavujete faktury?', a: 'Ano, tarif fakturujeme v korunách. K cenám připočítáváme DPH.' },
  { q: 'Jak dlouho distribuce trvá?', a: 'Kontrolu vydání zvládneme do 5 pracovních dnů v Lite a do 2 pracovních dnů v Pro. Vydání proto zadávejte alespoň 14 dní před datem vydání. Za zpracování na straně platforem odpovídají jednotlivé platformy.' },
  { q: 'Dá se vydat i rychleji?', a: 'Ano, vydání s kratším předstihem přijímáme, ale termín nemůžeme zaručit. V tarifu Pro ho vyřizujeme přednostně.' },
  { q: 'Jaký je rozdíl mezi Musicraftem a OSA nebo Intergramem?', a: 'OSA spravuje autorská práva ke skladbám (hudba a text). Intergram zastupuje výkonné umělce a výrobce nahrávek u veřejného provozu a vysílání. My doručujeme vaše nahrávky na streamovací platformy a vyplácíme vám výnosy z nich. Tyto služby se doplňují.' },
  { q: 'Jak a kdy dostanu peníze?', a: 'Výnosy uvidíte v royalty portálu v uzavřených měsíčních výkazech. Vyplácíme od zůstatku 100 EUR. Nižší částka zůstává na vašem účtu a přechází do dalších období.' },
  { q: 'Jak získám Spotify for Artists?', a: 'Profil si nárokujete sami na artists.spotify.com. Stačí, aby na Spotify bylo alespoň jedno vaše vydání.' },
  { q: 'Můžu přejít od jiného distributora?', a: 'Ano. Při přechodu zachováme původní kódy ISRC, takže vaše přehrání a statistiky na platformách zůstanou.' },
  { q: 'Distribuujete i videoklipy?', a: 'Ano. Oficiální videoklipy doručujeme na platformy jako VEVO, Apple Music a TIDAL.' },
];

const PRICES = {
  monthly: { lite: '490 Kč', pro: '890 Kč', unit: '/ měsíc' },
  yearly: { lite: '4 900 Kč', pro: '8 900 Kč', unit: '/ rok' },
};

export default function MusicraftHomeCs() {
  const [scrollY, setScrollY] = useState(0);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = 'cs';
    return () => { document.documentElement.lang = prev; };
  }, []);

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
        <MusicraftNav lang="cs" />

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
              Kurátorovaná distribuce, na základě přihlášky
            </div>

            <h1 className="font-bold leading-tight mb-6" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
              <span style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 60%, #7C3AED 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundSize: '200% auto', animation: 'gradientShift 4s linear infinite' }}>Žádné sliby.</span>
              <span style={{ color: '#E8E8F0' }}> Jen pořádná distribuce.</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
              Distribuce hudby a videoklipů s důrazem na kvalitu, správná metadata a dlouhodobou péči o katalog.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/musicraft/apply" className="px-8 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
                Podat přihlášku
              </Link>
              <a href="#how-it-works" className="px-8 py-4 rounded-xl text-base font-medium transition-all hover:scale-105" style={{ color: 'rgba(232,232,240,0.8)', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
                Jak to funguje
              </a>
            </div>
            <p className="text-sm mt-4" style={{ color: 'rgba(232,232,240,0.4)' }}>Každý katalog před přijetím posoudíme.</p>

            <div className="mt-10">
              <p className="text-xs font-medium mb-3" style={{ color: 'rgba(232,232,240,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Distribuujeme pro</p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {CLIENT_NAMES.map((n) => (
                  <span key={n} className="text-sm font-semibold" style={{ color: 'rgba(232,232,240,0.75)' }}>{n}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-20 w-full max-w-3xl mx-auto">
            <p className="text-center text-xs font-medium mb-6" style={{ color: 'rgba(232,232,240,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Doručujeme na hlavní hudební a video platformy</p>
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
                  <h3 className="text-lg font-bold" style={{ color: '#A78BFA' }}>Musicraft se k vám hodí, pokud:</h3>
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
                  <h3 className="text-lg font-bold" style={{ color: 'rgba(232,232,240,0.7)' }}>Spíš hledáte něco jiného, pokud:</h3>
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
              Samoobslužných distributorů je na trhu spousta a mnozí z nich jsou dobří. Musicraft je postavený pro jiný způsob práce.
            </p>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Co děláme</h2>
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

        {/* ROYALTY PORTAL */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA' }}>
                Pro naše umělce a labely
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Royalty portál</h2>
              <p className="text-base mb-8" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
                Umělci a labely, které distribuujeme, se přihlásí do portálu a najdou tam uzavřené měsíční výkazy: výdělky podle platforem a skladeb, ke stažení v PDF.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: '📊', t: 'Přehledné výkazy', d: 'každé uzavřené období sedí na cent.' },
                  { icon: '🎧', t: 'Rozpad podle platforem a skladeb', d: 'vidíte, odkud vaše příjmy přicházejí.' },
                  { icon: '⬇️', t: 'Výkazy v PDF', d: 'oficiální výkaz si stáhnete pro své účetnictví.' },
                ].map((f) => (
                  <li key={f.t} className="flex gap-3 items-start">
                    <span className="text-xl leading-none mt-0.5">{f.icon}</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.7)', lineHeight: 1.6 }}>
                      <strong style={{ color: '#E8E8F0' }}>{f.t}</strong> — {f.d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboard preview (sample data) */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 50px rgba(124,58,237,0.15)' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#171128' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span className="text-xs ml-3" style={{ color: '#b0a8cf' }}>royalties.musicraft.eu</span>
              </div>
              <div style={{ background: '#ffffff', padding: '18px 18px 20px' }}>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { l: 'Čistý výnos', v: '€948.20' },
                    { l: 'Přehrání', v: '512k' },
                    { l: 'Období', v: '9' },
                  ].map((s) => (
                    <div key={s.l} style={{ background: '#f4f5f8', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '.04em', textTransform: 'uppercase', color: '#8a8896' }}>{s.l}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#141018' }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#141018', marginBottom: '10px' }}>Čistý výnos podle období</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '7px', height: '120px' }}>
                  {[79, 76, 67, 94, 83, 93, 82, 63, 71].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: '#6a24e0', borderRadius: '5px 5px 0 0' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#a4a3ae' }}>
                  <span>2026-01</span><span>2026-05</span><span>2026-09</span>
                </div>
                <p style={{ fontSize: '11px', color: '#a4a3ae', marginTop: '12px' }}>Ukázková data pro ilustraci.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Jak to funguje</h2>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Ceník</h2>
              <p className="text-base font-medium" style={{ color: 'rgba(232,232,240,0.5)' }}>Jednoduché tarify plus podíl z výnosů. Žádné poplatky za jednotlivá vydání.</p>
            </div>

            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {([['monthly', 'Měsíčně'], ['yearly', 'Ročně · 2 měsíce zdarma']] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBilling(key)}
                    className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={billing === key ? { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: '#fff' } : { color: 'rgba(232,232,240,0.7)' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#E8E8F0' }}>Lite</h3>
                  <p className="text-sm mb-5" style={{ color: 'rgba(232,232,240,0.5)' }}>Pro soustředěná vydání s jednoduchými potřebami.</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{PRICES[billing].lite}</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>{PRICES[billing].unit}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>10%</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>podíl z výnosů</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Digitální distribuce', 'Kontrola kvality', 'Zpracování vydání (singly, EP, alba)', 'Přístup k royalty výkazům', 'Jasná komunikace'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.7)' }}>
                      <span className="flex-shrink-0" style={{ color: '#06B6D4' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/musicraft/apply" className="block text-center py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.08)', color: '#E8E8F0', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Podat přihlášku
                </Link>
              </div>

              <div className="p-8 rounded-2xl relative" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white' }}>Doporučujeme</div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: '#E8E8F0' }}>Pro</h3>
                  <p className="text-sm mb-5" style={{ color: 'rgba(232,232,240,0.5)' }}>Pro umělce, kteří vydávají pravidelně, a pro složitější katalogy.</p>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{PRICES[billing].pro}</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>{PRICES[billing].unit}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>5%</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.5)' }}>podíl z výnosů</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {['Vše z tarifu Lite', 'Přednostní vyřízení', 'Podpora složitějších vydání', 'Průběžná správa katalogu', 'Větší provozní flexibilita'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,232,240,0.7)' }}>
                      <span className="flex-shrink-0" style={{ color: '#A78BFA' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/musicraft/apply" className="block text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}>
                  Podat přihlášku
                </Link>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.4)' }}>Ceny jsou uvedeny bez DPH. Podíl z výnosů se týká jen royalties z vydání distribuovaných přes Musicraft. Poplatek za tarif i podíl z výnosů platí jen po dobu aktivního tarifu.</p>
            </div>
          </div>
        </section>

        {/* SERVICE LEVELS */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Servisní úrovně</h2>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="grid grid-cols-3 px-6 py-4" style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-semibold" style={{ color: 'rgba(232,232,240,0.5)' }}>Služba</div>
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
              Lhůty platí v pracovní dny. Za zpracování na straně platforem odpovídají jednotlivé platformy.
            </p>
          </div>
        </section>

        {/* ADD-ONS */}
        <section className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Doplňky</h2>
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
              Dostupnost a ceny doplňků vám rádi upřesníme.
            </p>
          </div>
        </section>

        {/* WHY MUSICRAFT */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Proč Musicraft</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-10" style={{ color: '#E8E8F0', letterSpacing: '0.18em' }}>Pro umělce a labely</h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(232,232,240,0.6)' }}>Musicraft je kurátorovaná distribuční služba zaměřená na spolehlivé doručení, kvalitu metadat a dlouhodobou správu katalogu.</p>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(232,232,240,0.6)' }}>Spolupracujeme s nezávislými umělci a labely, pro které je distribuce spolehlivý základ, ne propagace.</p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.6)' }}>Každý katalog před přijetím posoudíme.</p>
          </div>
        </section>

        {/* REFERENCE */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Co říkají naši klienti</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="p-6 rounded-2xl flex flex-col justify-between gap-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <blockquote className="text-base leading-relaxed" style={{ color: 'rgba(232,232,240,0.85)' }}>„{t.quote}“</blockquote>
                  <figcaption className="text-sm">
                    <span className="font-bold" style={{ color: '#E8E8F0' }}>{t.name}</span>
                    <span style={{ color: 'rgba(232,232,240,0.6)' }}>, {t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNER PROGRAM */}
        <section className="py-24 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Partner dashboard preview (sample data) */}
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 0 50px rgba(6,182,212,0.15)' }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#171128' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                <span className="text-xs ml-3" style={{ color: '#b0a8cf' }}>partners.musicraft.eu</span>
              </div>
              <div style={{ background: '#0B0B0F', padding: '18px 18px 20px' }}>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { l: 'Aktivní klienti', v: '6' },
                    { l: 'Tento měsíc', v: '1 115 Kč' },
                    { l: 'Vyplaceno', v: '7 950 Kč' },
                  ].map((s) => (
                    <div key={s.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '.04em', textTransform: 'uppercase', color: 'rgba(232,232,240,0.45)' }}>{s.l}</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#E8E8F0' }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8E8F0', marginBottom: '8px' }}>Poslední provize</div>
                {[
                  { c: 'M. (Pro)', d: 'Bonus za nového klienta Pro', v: '+750 Kč' },
                  { c: 'M. (Pro)', d: '30 % z měsíčního poplatku', v: '+267 Kč' },
                  { c: 'K. (Lite)', d: '20 % z měsíčního poplatku', v: '+98 Kč' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderTop: i ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#E8E8F0' }}>{r.c}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(232,232,240,0.45)' }}>{r.d}</div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#34D399' }}>{r.v}</div>
                  </div>
                ))}
                <p style={{ fontSize: '11px', color: 'rgba(232,232,240,0.35)', marginTop: '10px' }}>Ukázková data pro ilustraci.</p>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)', color: '#67E8F9' }}>
                Pro manažery, producenty a studia
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Partner Program</h2>
              <p className="text-base mb-8" style={{ color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
                Pracujete s umělci nebo labely? Doporučte jim Musicraft a získejte pravidelnou provizi z každého klienta, kterého přivedete.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: '💶', t: 'Až 30% pravidelná provize', d: 'po dobu 12 měsíců z každého doporučeného klienta.' },
                  { icon: '🎁', t: 'Bonus 750 Kč', d: 'za každého nového klienta na tarifu Pro.' },
                  { icon: '🤝', t: '20% sleva pro vaše klienty', d: 'na první 3 měsíce tarifu Pro, bez dopadu na vaši provizi.' },
                ].map((f) => (
                  <li key={f.t} className="flex gap-3 items-start">
                    <span className="text-xl leading-none mt-0.5">{f.icon}</span>
                    <span className="text-sm" style={{ color: 'rgba(232,232,240,0.7)', lineHeight: 1.6 }}>
                      <strong style={{ color: '#E8E8F0' }}>{f.t}</strong> — {f.d}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="https://partners.musicraft.eu"
                className="inline-block px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ color: '#E8E8F0', border: '1px solid rgba(6,182,212,0.5)', background: 'rgba(6,182,212,0.08)' }}
              >
                Stát se partnerem →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Časté dotazy</h2>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.02em' }}>Podat přihlášku</h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(232,232,240,0.6)' }}>Musicraft je kurátorovaná distribuce. Každý katalog před přijetím posoudíme.</p>
            <a
              href="/musicraft/apply"
              className="inline-block px-10 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
            >
              Podat přihlášku
            </a>
          </div>
        </section>

        <MusicraftFooter lang="cs" />
        <CookieConsentBanner />
      </div>
    </div>
  );
}
