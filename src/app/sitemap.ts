import type { MetadataRoute } from 'next';
import { POSTS } from '@/content/blog';

const BASE = 'https://www.musicraft.eu';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { en: `${BASE}/`, cs: `${BASE}/cs` } },
    },
    {
      url: `${BASE}/cs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: { en: `${BASE}/`, cs: `${BASE}/cs` } },
    },
    ...['pricing', 'how-it-works', 'artists', 'addons', 'support', 'contact', 'apply', 'terms', 'privacy'].map((p) => ({
      url: `${BASE}/musicraft/${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: ['terms', 'privacy'].includes(p) ? 0.3 : 0.7,
    })),
  ];

  const csPosts = POSTS.filter((p) => p.lang === 'cs');
  if (csPosts.length) {
    pages.push({ url: `${BASE}/cs/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 });
    for (const post of csPosts) {
      pages.push({
        url: `${BASE}/cs/blog/${post.slug}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return pages;
}
