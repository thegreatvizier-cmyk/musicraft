import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Musicraft — Curated Music & Video Distribution',
  description: 'Curated music and video distribution for artists and labels who value quality, metadata accuracy and long-term catalogue management.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    title: 'Musicraft — Curated Music & Video Distribution',
    description: 'Curated music and video distribution focused on quality and long-term catalogue management.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}
</body>
    </html>
  );
}
