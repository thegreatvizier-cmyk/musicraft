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

      // Legacy URLs from the previous site — still indexed by search engines.
      // Specific paths first, catch-all last.
      { source: '/en/plans', destination: '/musicraft/pricing', permanent: true },
      { source: '/en/service', destination: '/musicraft/how-it-works', permanent: true },
      { source: '/en/services', destination: '/musicraft/how-it-works', permanent: true },
      { source: '/en/contact', destination: '/musicraft/contact', permanent: true },
      { source: '/en/about', destination: '/musicraft/artists', permanent: true },
      { source: '/en/order/:slug*', destination: '/musicraft/apply', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/', permanent: true },
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
