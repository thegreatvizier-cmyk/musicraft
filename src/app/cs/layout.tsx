import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Musicraft — kurátorovaná distribuce hudby a videoklipů',
  description:
    'Distribuce hudby a videoklipů na Spotify, Apple Music, YouTube Music, TikTok a další platformy. Ruční kontrola metadat, ceny v korunách a royalty portál pro české umělce a labely.',
  alternates: {
    canonical: '/cs',
    languages: {
      en: '/',
      cs: '/cs',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Musicraft — kurátorovaná distribuce hudby a videoklipů',
    description: 'Distribuce hudby s ruční kontrolou kvality a dlouhodobou péčí o katalog.',
    type: 'website',
    locale: 'cs_CZ',
  },
};

export default function CsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
