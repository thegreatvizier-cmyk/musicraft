import React from 'react';
import { coverSvg, type CoverIcon } from './icons';

export default function BlogCover({ icon, id }: { icon: CoverIcon; id: string }) {
  return <div role="img" aria-hidden="true" dangerouslySetInnerHTML={{ __html: coverSvg(icon, id) }} />;
}
