import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      artistName,
      contactEmail,
      country,
      genres,
      spotifyUrl,
      appleMusicUrl,
      youtubeUrl,
      catalogSize,
      previousDistributor,
      description,
    } = body;

    if (!artistName || !contactEmail) {
      return NextResponse.json({ error: 'artistName and email are required' }, { status: 400 });
    }

    const genreList = Array.isArray(genres) ? genres.join(', ') : genres;

    const html = `
      <h2>New Distribution Application</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Artist / Label Name</strong></td><td>${esc(artistName)}</td></tr>
        <tr><td><strong>Contact Email</strong></td><td>${esc(contactEmail)}</td></tr>
        <tr><td><strong>Country</strong></td><td>${esc(country) || '—'}</td></tr>
        <tr><td><strong>Genres</strong></td><td>${esc(genreList) || '—'}</td></tr>
        <tr><td><strong>Catalog Size</strong></td><td>${esc(catalogSize) || '—'}</td></tr>
        <tr><td><strong>Previous Distributor</strong></td><td>${esc(previousDistributor) || '—'}</td></tr>
        <tr><td><strong>Spotify URL</strong></td><td>${esc(spotifyUrl) || '—'}</td></tr>
        <tr><td><strong>Apple Music URL</strong></td><td>${esc(appleMusicUrl) || '—'}</td></tr>
        <tr><td><strong>YouTube URL</strong></td><td>${esc(youtubeUrl) || '—'}</td></tr>
        <tr><td><strong>Description</strong></td><td>${esc(description) || '—'}</td></tr>
      </table>
    `;

    const { error } = await resend.emails.send({
      from: 'MUSICRAFT Applications <noreply@musicraft.eu>',
      to: ['info@musicraft.eu'],
      subject: `New Application: ${artistName}`,
      html,
      reply_to: contactEmail,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Screening agent — runs in the background, never blocks the applicant
    if (process.env.TRIAGE_WEBHOOK_SECRET) {
      void fetch('https://forms.musicraft.eu/api/triage-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-triage-secret': process.env.TRIAGE_WEBHOOK_SECRET,
        },
        body: JSON.stringify({
          artistName,
          email: contactEmail,
          country,
          genres: genreList,
          catalogSize,
          previousDistributor,
          spotifyUrl,
          appleMusicUrl,
          youtubeUrl,
          description,
        }),
      }).catch((err) => console.error('Triage webhook failed:', err));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
