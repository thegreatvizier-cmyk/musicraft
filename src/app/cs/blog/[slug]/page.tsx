import React from 'react';
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
        <p className="text-sm mb-10" style={{ color: 'rgba(232,232,240,0.7)' }}>
          {formatDateCs(post.date)} · {post.readingMinutes} min čtení
        </p>
        <div className="mb-12 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <img src={`/cs/blog/${post.slug}/opengraph-image`} alt={post.title} width={1200} height={630} style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>

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
            case 'steps':
              return (
                <ol key={i} className="mb-8 space-y-4">
                  {block.items.map((step, j) => (
                    <li key={j} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold text-white" style={j === 0 ? { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' } : { background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)' }}>{j + 1}</span>
                      <div className="flex-1 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
                        <p className="text-lg font-bold mb-1" style={{ color: '#E8E8F0' }}><Inline text={step.title} /></p>
                        <p className="text-base" style={{ color: textColor, lineHeight: 1.7 }}><Inline text={step.text} /></p>
                      </div>
                    </li>
                  ))}
                </ol>
              );
            case 'callout': {
              const tip = block.variant === 'tip';
              return (
                <aside key={i} className="mb-8 p-6 rounded-2xl flex gap-4" style={tip ? { background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.35)' } : { background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.4)' }}>
                  <span className="flex-shrink-0 text-2xl leading-none" aria-hidden="true">{tip ? '💡' : '⚠️'}</span>
                  <div>
                    <p className="text-xs font-bold uppercase mb-1" style={{ letterSpacing: '0.1em', color: tip ? '#67E8F9' : '#FCD34D' }}>{tip ? 'Tip' : 'Pozor'}</p>
                    <p className="text-lg font-bold mb-2" style={{ color: '#E8E8F0' }}><Inline text={block.title} /></p>
                    <p className="text-base" style={{ color: textColor, lineHeight: 1.7 }}><Inline text={block.text} /></p>
                  </div>
                </aside>
              );
            }
            case 'flow':
              return (
                <figure key={i} className="mb-8 p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <div className="flex flex-col md:flex-row items-stretch gap-3">
                    {block.nodes.map((node, j) => (
                      <React.Fragment key={j}>
                        {j > 0 && (
                          <div className="flex md:flex-col items-center justify-center gap-2 py-1 md:py-0 md:px-1">
                            <span className="text-2xl leading-none rotate-90 md:rotate-0" style={{ color: '#A78BFA' }} aria-hidden="true">→</span>
                            {block.link && <span className="text-xs font-semibold text-center" style={{ color: '#C4B5FD', maxWidth: '7rem' }}>{block.link}</span>}
                          </div>
                        )}
                        <div className="flex-1 p-4 rounded-xl text-center" style={j === block.nodes.length - 1 ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))', border: '1px solid rgba(124,58,237,0.45)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                          <p className="text-base font-bold" style={{ color: '#E8E8F0' }}>{node.label}</p>
                          {node.sub && <p className="text-sm mt-1" style={{ color: 'rgba(232,232,240,0.78)' }}>{node.sub}</p>}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  {block.caption && <figcaption className="text-sm mt-4 text-center" style={{ color: 'rgba(232,232,240,0.78)' }}>{block.caption}</figcaption>}
                </figure>
              );
            case 'table':
              return (
                <div key={i} className="mb-8 rounded-2xl overflow-x-auto" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {block.head.map((h, j) => <th key={j} className="px-5 py-3 text-sm font-bold" style={{ color: '#E8E8F0' }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: r % 2 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                          {row.map((cell, c) => <td key={c} className="px-5 py-3 text-base align-top" style={{ color: c === 0 ? '#E8E8F0' : textColor, fontWeight: c === 0 ? 600 : 400, lineHeight: 1.6 }}><Inline text={cell} /></td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
