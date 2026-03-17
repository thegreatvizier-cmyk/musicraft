import MusicraftFooter from './components/MusicraftFooter';
import CookieConsentBanner from './components/CookieConsentBanner';

export default function MusicraftLayout({ children }: { children: React.ReactNode }) {
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
      `}</style>

      {/* Global background layers */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>

        {/* Layer 0: Animated global gradient base — very subtle shifting */}
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

        {/* Layer 1: Purple glow — top-left */}
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

        {/* Layer 2: Blue/teal glow — bottom-right */}
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

        {/* Layer 3: Grid pattern overlay — sits on top of glows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Layer 4: Original radial gradient accents — preserved on top */}
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

        {/* Layer 5: Noise / grain texture overlay — sits above glows, behind content */}
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
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#musicraft-grain)" />
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
        <MusicraftFooter />
        <CookieConsentBanner />
      </div>
    </div>
  );
}
