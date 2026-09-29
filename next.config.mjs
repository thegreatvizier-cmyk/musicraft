import { imageHosts } from './image-hosts.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: imageHosts,
  },
  async redirects() {
    // Short public URLs (used e.g. by partner referral links) -> actual routes under /musicraft.
    // Query strings (e.g. ?ref=CODE) are preserved automatically.
    const pages = ['pricing', 'how-it-works', 'artists', 'addons', 'apply', 'contact', 'support', 'terms', 'privacy'];
    return [
      ...pages.map((p) => ({ source: `/${p}`, destination: `/musicraft/${p}`, permanent: false })),
      { source: '/partners', destination: 'https://partners.musicraft.eu', permanent: false },
      { source: '/musicraft/partners', destination: 'https://partners.musicraft.eu', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.anthropic.com https://script.google.com https://script.googleusercontent.com https://accounts.google.com https://oauth2.googleapis.com https://sheets.googleapis.com",
              "frame-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
export default nextConfig;
