import React from 'react';
import Link from 'next/link';
import MusicraftNav from '../../musicraft/components/MusicraftNav';
import MusicraftFooter from '../../musicraft/components/MusicraftFooter';
import SetLangCs from '../SetLangCs';

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background:
          'radial-gradient(ellipse at 0% 0%, rgba(124, 58, 237, 0.10) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 55%), #0A0A0F',
        color: '#E8E8F0',
        fontFamily: 'Manrope, sans-serif',
        minHeight: '100vh',
      }}
    >
      <SetLangCs />
      <MusicraftNav lang="cs" />
      <main className="px-6 pt-32 pb-24">{children}</main>
      <MusicraftFooter lang="cs" />
    </div>
  );
}

// Renders **bold** and [text](url) inside a line of text.
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(<strong key={i++} style={{ color: '#FFFFFF' }}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const internal = href.startsWith('/');
      parts.push(
        internal ? (
          <Link key={i++} href={href} style={{ color: '#A78BFA', textDecoration: 'underline' }}>{m[2]}</Link>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', textDecoration: 'underline' }}>{m[2]}</a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function formatDateCs(iso: string) {
  const [y, mo, d] = iso.split('-').map(Number);
  return `${d}. ${mo}. ${y}`;
}
