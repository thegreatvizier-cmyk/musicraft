import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPost } from '@/content/blog';
import { BlogShell, Inline, formatDateCs } from '../BlogShell';

type Params = { slug: string };

export function generateStaticParams() {
  return POSTS.filter((p) => p.lang === 'cs').map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost('cs', slug);
  if (!post) return {};
  return {
    title: `${post.title} — Musicraft`,
    description: post.description,
    alternates: { canonical: `/cs/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'cs_CZ',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostCs({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost('cs', slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    inLanguage: 'cs',
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: `https://www.musicraft.eu/cs/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'Musicraft', url: 'https://www.musicraft.eu/cs' },
    publisher: { '@type': 'Organization', name: 'Musicraft', url: 'https://www.musicraft.eu' },
  };

  const textColor = 'rgba(232,232,240,0.85)';

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto">
        <Link href="/cs/blog" className="text-sm font-semibold" style={{ color: '#A78BFA' }}>← Blog</Link>
        <h1 className="font-bold mt-6 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{post.title}</h1>
        <p className="text-sm mb-12" style={{ color: 'rgba(232,232,240,0.7)' }}>
          {formatDateCs(post.date)} · {post.readingMinutes} min čtení
        </p>

        {post.body.map((block, i) => {
          switch (block.type) {
            case 'h2':
              return <h2 key={i} className="text-2xl md:text-3xl font-bold mt-14 mb-5" style={{ color: '#E8E8F0', letterSpacing: '-0.01em' }}>{block.text}</h2>;
            case 'p':
              return <p key={i} className="text-lg mb-6" style={{ color: textColor, lineHeight: 1.8 }}><Inline text={block.text} /></p>;
            case 'ul':
              return (
                <ul key={i} className="mb-6 space-y-3 pl-6" style={{ listStyle: 'disc', color: textColor }}>
                  {block.items.map((item, j) => <li key={j} className="text-lg" style={{ lineHeight: 1.7 }}><Inline text={item} /></li>)}
                </ul>
              );
            case 'ol':
              return (
                <ol key={i} className="mb-6 space-y-3 pl-6" style={{ listStyle: 'decimal', color: textColor }}>
                  {block.items.map((item, j) => <li key={j} className="text-lg pl-1" style={{ lineHeight: 1.7 }}><Inline text={item} /></li>)}
                </ol>
              );
            case 'cta':
              return (
                <aside key={i} className="mt-16 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(124,58,237,0.4)' }}>
                  <h2 className="text-2xl font-bold mb-3" style={{ color: '#E8E8F0' }}>{block.title}</h2>
                  <p className="text-base mb-6" style={{ color: textColor, lineHeight: 1.7 }}>{block.text}</p>
                  <Link href={block.href} className="inline-block px-8 py-3 rounded-xl text-base font-semibold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}>
                    {block.button}
                  </Link>
                </aside>
              );
          }
        })}
      </article>
    </BlogShell>
  );
}
