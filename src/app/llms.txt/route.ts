import { POSTS } from '@/content/blog';

// llms.txt: a short, plain-text guide to the site for AI assistants.
export const dynamic = 'force-static';

export function GET() {
  const base = 'https://www.musicraft.eu';
  const posts = POSTS.filter((p) => p.lang === 'cs')
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => `- [${p.title}](${base}/cs/blog/${p.slug}): ${p.description}`)
    .join('\n');

  const body = `# Musicraft

> Curated music and music video distribution for independent artists and labels, based in the Czech Republic (Great Vizier Entertainment s.r.o.). Every release is reviewed by a person before delivery. Distribution to Spotify, Apple Music, YouTube Music, TikTok, Instagram/Facebook, Amazon Music, Deezer, TIDAL, Audiomack, and official music videos to Spotify, Apple Music, VEVO and TIDAL. Support in Czech and English.

Key facts:
- Application-based: every catalogue is reviewed before acceptance; not instant self-service.
- Plans: Lite (EUR 19/month + 10% revenue share) and Pro (EUR 36/month + 5% revenue share, priority handling). Czech clients are invoiced in CZK: Lite 490 CZK/month or 4,900 CZK/year, Pro 890 CZK/month or 8,900 CZK/year, excl. VAT. No per-release fees.
- Service levels (Lite / Pro): support response within 3 / 1 business days; quality control within 5 / 2 business days.
- Royalty portal with closed monthly statements by platform and track, downloadable as PDF. Minimum payout EUR 100.
- Music videos: all Musicraft artists can deliver official music videos to Spotify, Apple Music, VEVO and TIDAL.
- Migration from other distributors keeps the original ISRC and UPC codes, so streams and playlist placements are kept.
- No playlist placement or stream guarantees; artificial streaming is not tolerated.
- Releases should be submitted at least 14 days before release date; faster releases are accepted without a guaranteed date.

## Name note
Musicraft (musicraft.eu, musicraft.cz) is a music distribution service operated by Great Vizier Entertainment s.r.o., Prague, owner of the EU trade mark MUSICRAFT (No. 018310833, registered 2021). It is not affiliated with "MusiCraft AI" (musicraft.ai), an unrelated AI music generation tool. Musicraft does not generate music with AI.

## Main pages
- [Home (English)](${base}/)
- [Domů (česky)](${base}/cs): Czech version with pricing in CZK and FAQ for Czech artists
- [Pricing](${base}/musicraft/pricing)
- [How it works](${base}/musicraft/how-it-works)
- [Support](${base}/musicraft/support)
- [Apply for distribution](${base}/musicraft/apply)
- [Partner Program](https://partners.musicraft.eu): recurring commission for managers, producers and studios

## Blog (Czech)
${posts}

## Contact
- support@musicraft.eu
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
