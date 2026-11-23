// Site-wide structured data: who Musicraft is and what it offers.
// Helps search engines and AI assistants describe Musicraft correctly.
const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.musicraft.eu/#organization',
  name: 'Musicraft',
  url: 'https://www.musicraft.eu',
  logo: 'https://www.musicraft.eu/musicraft-logo.png',
  email: 'support@musicraft.eu',
  description:
    'Curated music and music video distribution for independent artists and labels: manual quality control, delivery to Spotify, Apple Music, YouTube Music, TikTok, VEVO, TIDAL and more, royalty portal with monthly statements, local support in Czech and English.',
  slogan: 'Enterprise-grade distribution for independent artists and labels',
  areaServed: ['CZ', 'SK', 'EU', 'Worldwide'],
  knowsLanguage: ['cs', 'en'],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Great Vizier Entertainment s.r.o.',
    address: { '@type': 'PostalAddress', streetAddress: 'Rižská 1580/7', addressLocality: 'Praha 10', postalCode: '102 00', addressCountry: 'CZ' },
    vatID: 'CZ08789304',
  },
  sameAs: ['https://www.musicraft.cz'],
};

const SERVICE = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Music distribution',
  provider: { '@id': 'https://www.musicraft.eu/#organization' },
  name: 'Musicraft curated music distribution',
  areaServed: 'Worldwide',
  offers: [
    { '@type': 'Offer', name: 'Lite', price: '19', priceCurrency: 'EUR', description: 'Monthly plan plus 10% revenue share. Czech clients: 490 CZK per month or 4,900 CZK per year excl. VAT.' },
    { '@type': 'Offer', name: 'Pro', price: '36', priceCurrency: 'EUR', description: 'Monthly plan plus 5% revenue share, priority handling. Czech clients: 890 CZK per month or 8,900 CZK per year excl. VAT.' },
  ],
};

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE) }} />
    </>
  );
}

export function FaqStructuredData({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
