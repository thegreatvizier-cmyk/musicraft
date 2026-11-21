import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { POSTS, getPost } from '@/content/blog';
import { coverSvg, iconSvg } from '../icons';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Musicraft blog';

export function generateStaticParams() {
  return POSTS.filter((p) => p.lang === 'cs').map((p) => ({ slug: p.slug }));
}

const dataUri = (mime: string, buf: Buffer | string) => `data:${mime};base64,${Buffer.from(buf).toString('base64')}`;

// The cover of a blog post: the post's title on the brand background, with the Musicraft logo.
// The same image is the post's social preview and the cover at the top of the article.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost('cs', slug);
  const title = post?.title ?? 'Musicraft blog';
  const icon = post?.cover ?? 'globe';

  const fontDir = path.join(process.cwd(), 'src/app/cs/blog/fonts');
  const [bold, medium, logo] = await Promise.all([
    readFile(path.join(fontDir, 'manrope-cs-800.woff')),
    readFile(path.join(fontDir, 'manrope-cs-500.woff')),
    readFile(path.join(process.cwd(), 'public/assets/images/musicraft-logo-1773170717567.png')),
  ]);

  const titleSize = title.length > 60 ? 58 : title.length > 40 ? 66 : 76;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'Manrope' }}>
        <img src={dataUri('image/svg+xml', coverSvg(icon, 'og', true, true))} width={1200} height={630} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', flexDirection: 'column', padding: '64px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={dataUri('image/png', logo)} width={236} height={50} alt="" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderRadius: 999, background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: '#FFFFFF', fontSize: 24, fontWeight: 800 }}>
              <img src={dataUri('image/svg+xml', iconSvg(icon, 28))} width={28} height={28} alt="" />
              Blog
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <div style={{ display: 'flex', color: '#FFFFFF', fontSize: titleSize, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 1000 }}>{title}</div>
          </div>
          <div style={{ display: 'flex', color: '#C4B5FD', fontSize: 26, fontWeight: 500, marginBottom: 40 }}>musicraft.cz</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: bold, weight: 800, style: 'normal' },
        { name: 'Manrope', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
