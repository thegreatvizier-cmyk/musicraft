import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const html = `
      <h2>New Distribution Application</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Artist / Label Name</strong></td><td>${artistName}</td></tr>
        <tr><td><strong>Contact Email</strong></td><td>${contactEmail}</td></tr>
        <tr><td><strong>Country</strong></td><td>${country || '—'}</td></tr>
        <tr><td><strong>Genres</strong></td><td>${Array.isArray(genres) ? genres.join(', ') : genres || '—'}</td></tr>
        <tr><td><strong>Catalog Size</strong></td><td>${catalogSize || '—'}</td></tr>
        <tr><td><strong>Previous Distributor</strong></td><td>${previousDistributor || '—'}</td></tr>
        <tr><td><strong>Spotify URL</strong></td><td>${spotifyUrl || '—'}</td></tr>
        <tr><td><strong>Apple Music URL</strong></td><td>${appleMusicUrl || '—'}</td></tr>
        <tr><td><strong>YouTube URL</strong></td><td>${youtubeUrl || '—'}</td></tr>
        <tr><td><strong>Description</strong></td><td>${description || '—'}</td></tr>
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
