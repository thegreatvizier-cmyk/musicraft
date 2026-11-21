import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/content/blog';
import { BlogShell, formatDateCs } from './BlogShell';

export const metadata: Metadata = {
  title: 'Blog — Musicraft',
  description: 'Praktické návody k distribuci hudby: vydávání na Spotify a Apple Music, přechod mezi distributory, výplaty a péče o katalog.',
  alternates: { canonical: '/cs/blog' },
};

export default function BlogIndexCs() {
  const posts = POSTS.filter((p) => p.lang === 'cs').sort((a, b) => b.date.localeCompare(a.date));

  return (
    <BlogShell>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>Blog</h1>
        <p className="text-lg mb-14" style={{ color: 'rgba(232,232,240,0.8)', lineHeight: 1.7 }}>
          Praktické návody k distribuci hudby, jak je řešíme s našimi umělci a labely.
        </p>
        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/cs/blog/${post.slug}`}
              className="block p-7 rounded-2xl transition-all hover:scale-[1.01]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="text-sm mb-2" style={{ color: 'rgba(232,232,240,0.7)' }}>
                {formatDateCs(post.date)} · {post.readingMinutes} min čtení
              </p>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#E8E8F0' }}>{post.title}</h2>
              <p className="text-base" style={{ color: 'rgba(232,232,240,0.8)', lineHeight: 1.7 }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </BlogShell>
  );
}
