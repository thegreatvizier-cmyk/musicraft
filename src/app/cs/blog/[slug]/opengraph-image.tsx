import { ImageResponse } from 'next/og';
import { POSTS, getPost } from '@/content/blog';
import { coverSvg } from '../icons';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Musicraft blog';

export function generateStaticParams() {
  return POSTS.filter((p) => p.lang === 'cs').map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost('cs', slug);
  const svg = coverSvg(post?.cover ?? 'globe', 'og', true);
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <img src={src} width={1200} height={630} alt="" />
      </div>
    ),
    size,
  );
}
