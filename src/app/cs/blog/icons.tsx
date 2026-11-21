// Simple stroke icons (24×24 grid) used on blog covers. Drawn for Musicraft, no third-party marks.
export type CoverIcon =
  | 'switch'
  | 'profile'
  | 'rejected'
  | 'checklist'
  | 'calendar'
  | 'coins'
  | 'video'
  | 'label'
  | 'globe';

const ICONS: Record<CoverIcon, string> = {
  switch: '<path d="M4 8h14"/><path d="M14 4l4 4-4 4"/><path d="M20 16H6"/><path d="M10 12l-4 4 4 4"/>',
  profile: '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3.5-6.5 7-6.5"/><path d="M14.5 18.5l2 2 4.5-4.5"/>',
  rejected: '<path d="M12 3L2.5 20h19L12 3z"/><path d="M12 10v4.5"/><path d="M12 17.2v.3"/>',
  checklist: '<path d="M10 6h10"/><path d="M10 12h10"/><path d="M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5"/><path d="M3.5 12l1.5 1.5L7.5 11"/><path d="M3.5 18l1.5 1.5L7.5 17"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M8.5 15l2 2 4-4"/>',
  coins: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 18c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M10 9l5 3-5 3V9z"/>',
  label: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 9 9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
};

// Colour pairs and background motifs that covers rotate through, all within the Musicraft palette.
export const PALETTES = [
  { a: '#7C3AED', b: '#06B6D4' }, // purple → teal (brand)
  { a: '#DB2777', b: '#7C3AED' }, // magenta → purple
  { a: '#06B6D4', b: '#1DB954' }, // teal → green
  { a: '#2563EB', b: '#A855F7' }, // blue → violet
  { a: '#F59E0B', b: '#DB2777' }, // amber → magenta
] as const;
export const MOTIFS = ['bars', 'vinyl', 'waves', 'dots'] as const;
export type CoverVariant = { palette: number; motif: number };

// Bar heights of the waveform motif (0–1).
const WAVE = [0.35, 0.55, 0.42, 0.7, 0.5, 0.82, 0.6, 0.38, 0.66, 0.9, 0.58, 0.44, 0.72, 0.52, 0.8, 0.62, 0.4, 0.68, 0.48, 0.76, 0.56, 0.36, 0.64, 0.46];

function motifSvg(motif: (typeof MOTIFS)[number], fill: string, stroke: string, background: boolean): string {
  switch (motif) {
    case 'bars': {
      const barW = 30, gap = 18;
      const x0 = (1200 - (WAVE.length * barW + (WAVE.length - 1) * gap)) / 2;
      return WAVE.map((h, i) => {
        const height = background ? 30 + h * 120 : 60 + h * 220;
        return `<rect x="${x0 + i * (barW + gap)}" y="${630 - height}" width="${barW}" height="${height}" rx="${barW / 2}" fill="${fill}"/>`;
      }).join('');
    }
    case 'vinyl': {
      const cx = 1010, cy = 560;
      const rings = Array.from({ length: 11 }, (_, i) => `<circle cx="${cx}" cy="${cy}" r="${70 + i * 26}" fill="none" stroke="${stroke}" stroke-opacity="${0.5 - i * 0.035}" stroke-width="${i % 3 === 0 ? 2.5 : 1.2}"/>`).join('');
      return `${rings}<circle cx="${cx}" cy="${cy}" r="56" fill="${fill}"/><circle cx="${cx}" cy="${cy}" r="8" fill="#0A0A0F"/>`;
    }
    case 'waves': {
      const lines = Array.from({ length: 5 }, (_, k) => {
        const amp = 26 + k * 10, base = 520 + k * 22, len = 300 - k * 30;
        let d = `M0 ${base}`;
        for (let x = 0; x <= 1200; x += 20) d += ` L${x} ${(base + amp * Math.sin((x / len) * Math.PI * 2 + k)).toFixed(1)}`;
        return `<path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${0.55 - k * 0.08}" stroke-width="${3 - k * 0.3}" stroke-linecap="round"/>`;
      }).join('');
      return lines;
    }
    case 'dots': {
      let out = '';
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 14; col++) {
          const x = 620 + col * 42, y = 330 + row * 42;
          const r = 2 + 6 * Math.abs(Math.sin(col * 0.55 + row * 0.8));
          out += `<circle cx="${x}" cy="${y}" r="${r.toFixed(1)}" fill="${stroke}" fill-opacity="${(0.15 + 0.04 * row).toFixed(2)}"/>`;
        }
      }
      return out;
    }
  }
}

// Abstract brand cover as an SVG string (1200×630): two coloured glows, a grid and a motif.
// Without `background`, a large icon tile is drawn in the middle as well.
export function coverSvg(icon: CoverIcon, id: string, fixedSize = false, background = false, variant: CoverVariant = { palette: 0, motif: 0 }): string {
  const g = (n: string) => `${n}-${id}`;
  const pal = PALETTES[variant.palette % PALETTES.length];
  const motif = MOTIFS[variant.motif % MOTIFS.length];
  const sizeAttrs = fixedSize ? 'width="1200" height="630"' : 'style="display:block;width:100%;height:auto"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" ${sizeAttrs} aria-hidden="true">
<defs>
<radialGradient id="${g('glowA')}" cx="15%" cy="10%" r="70%"><stop offset="0%" stop-color="${pal.a}" stop-opacity="0.55"/><stop offset="100%" stop-color="${pal.a}" stop-opacity="0"/></radialGradient>
<radialGradient id="${g('glowB')}" cx="90%" cy="95%" r="65%"><stop offset="0%" stop-color="${pal.b}" stop-opacity="0.45"/><stop offset="100%" stop-color="${pal.b}" stop-opacity="0"/></radialGradient>
<linearGradient id="${g('brand')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${pal.a}"/><stop offset="100%" stop-color="${pal.b}"/></linearGradient>
<linearGradient id="${g('fade')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${pal.a}" stop-opacity="0.6"/><stop offset="100%" stop-color="${pal.b}" stop-opacity="0.08"/></linearGradient>
<linearGradient id="${g('line')}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${pal.a}"/><stop offset="100%" stop-color="${pal.b}"/></linearGradient>
<pattern id="${g('grid')}" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/></pattern>
</defs>
<rect width="1200" height="630" fill="#0A0A0F"/>
<rect width="1200" height="630" fill="url(#${g('grid')})"/>
<rect width="1200" height="630" fill="url(#${g('glowA')})"/>
<rect width="1200" height="630" fill="url(#${g('glowB')})"/>
${motifSvg(motif, `url(#${g('fade')})`, `url(#${g('line')})`, background)}
${background ? '' : `<rect x="480" y="155" width="240" height="240" rx="56" fill="url(#${g('brand')})"/>
<rect x="484" y="159" width="232" height="232" rx="52" fill="#120F1F" fill-opacity="0.55"/>
<g transform="translate(528 203) scale(6)" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</g>`}
</svg>`;
}

// CSS gradient of a variant's colour pair, for pills and buttons beside the cover.
export function variantGradient(variant: CoverVariant): string {
  const pal = PALETTES[variant.palette % PALETTES.length];
  return `linear-gradient(135deg, ${pal.a}, ${pal.b})`;
}

// Small white icon as a standalone SVG string, for use beside text.
export function iconSvg(icon: CoverIcon, size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</svg>`;
}
