import type { MetadataRoute } from 'next';

// AI crawlers are allowed explicitly so the site can be read and cited by AI search tools.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/musicraft/dashboard', '/musicraft/admin', '/musicraft/login'] },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: ['/api/', '/musicraft/dashboard', '/musicraft/admin', '/musicraft/login'] },
    ],
    sitemap: 'https://www.musicraft.eu/sitemap.xml',
    host: 'https://www.musicraft.eu',
  };
}
