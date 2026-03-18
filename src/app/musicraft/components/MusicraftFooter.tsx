import Link from 'next/link';
import Image from 'next/image';

export default function MusicraftFooter() {
  return (
    <footer className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Manrope, sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/assets/images/musicraft-logo-1773170717567.png"
                alt="Musicraft logo"
                width={120}
                height={30}
                className="object-contain"
              />
            </div>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(232,232,240,0.4)' }}>Controlled music distribution for artists and labels who care about quality.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <div className="text-xs font-semibold mb-4" style={{ color: 'rgba(232,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Product</div>
              {[['Pricing', '/musicraft/pricing'], ['Add-ons', '/musicraft/addons'], ['How It Works', '/musicraft/how-it-works'], ['Artists & Labels', '/musicraft/artists']]?.map(([l, href]) => (
                <Link key={l} href={href} className="block text-sm mb-2 transition-colors" style={{ color: 'rgba(232,232,240,0.5)' }}>{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold mb-4" style={{ color: 'rgba(232,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company</div>
              {[['Support', '/musicraft/support'], ['Contact', '/musicraft/contact']]?.map(([l, href]) => (
                <Link key={l} href={href} className="block text-sm mb-2 transition-colors" style={{ color: 'rgba(232,232,240,0.5)' }}>{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold mb-4" style={{ color: 'rgba(232,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</div>
              {[['Terms of Service', '/musicraft/terms'], ['Privacy Policy', '/musicraft/privacy']]?.map(([l, href]) => (
                <Link key={l} href={href} className="block text-sm mb-2 transition-colors" style={{ color: 'rgba(232,232,240,0.5)' }}>{l}</Link>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold mb-4" style={{ color: 'rgba(232,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</div>
              <a href="mailto:support@musicraft.eu" className="block text-sm mb-2 transition-colors" style={{ color: 'rgba(232,232,240,0.5)' }}>support@musicraft.eu</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-xs" style={{ color: 'rgba(232,232,240,0.3)' }}>© 2026 MUSICRAFT by Great Vizier Entertainment Ltd. All rights reserved.</span>
          <span className="text-xs" style={{ color: 'rgba(232,232,240,0.3)' }}>Distributing music to 180+ countries</span>
        </div>
      </div>
    </footer>
  );
}
