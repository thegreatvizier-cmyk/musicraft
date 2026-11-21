import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      cs: '/cs',
      'x-default': '/',
    },
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
