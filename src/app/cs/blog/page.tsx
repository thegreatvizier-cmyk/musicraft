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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>Blog</h1>
        <p className="text-lg mb-14 max-w-2xl" style={{ color: 'rgba(232,232,240,0.8)', lineHeight: 1.7 }}>
          Praktické návody k distribuci hudby, jak je řešíme s našimi umělci a labely.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/cs/blog/${post.slug}`}
              className="flex flex-col rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <img src={`/cs/blog/${post.slug}/opengraph-image`} alt={post.title} width={1200} height={630} loading={idx < 3 ? 'eager' : 'lazy'} style={{ display: 'block', width: '100%', height: 'auto' }} />
              <div className="p-6 flex-1">
              <p className="text-sm mb-2" style={{ color: 'rgba(232,232,240,0.7)' }}>
                {formatDateCs(post.date)} · {post.readingMinutes} min čtení
              </p>
              <h2 className="sr-only">{post.title}</h2>
              <p className="text-sm" style={{ color: 'rgba(232,232,240,0.85)', lineHeight: 1.7 }}>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BlogShell>
  );
}
