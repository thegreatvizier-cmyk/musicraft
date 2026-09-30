import { Resend } from 'resend';
import { waitUntil } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

const REFERRAL_WEBHOOK_URL =
  process.env.REFERRAL_WEBHOOK_URL || 'https://partners.musicraft.eu/api/partners/referrals';

// Report a partner referral to the Partner Program (partners.musicraft.eu).
// Signed with HMAC-SHA256 of the raw body using REFERRAL_WEBHOOK_SECRET.
async function reportReferral(code: string, client: { name: string; email: string; country: string }) {
  const secret = process.env.REFERRAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[referral] REFERRAL_WEBHOOK_SECRET is not set – referral not reported:', code);
    return;
  }
  const rawBody = JSON.stringify({
    submission_id: crypto.randomUUID(),
    submitted_at: new Date().toISOString(),
    code,
    client,
  });
  const signature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    const res = await fetch(REFERRAL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Musicraft-Signature': signature },
      body: rawBody,
    });
    const text = await res.text();
    if (!res.ok) console.error('[referral] webhook failed', res.status, text);
    else console.log('[referral] webhook', res.status, text);
  } catch (err) {
    console.error('[referral] webhook error', err);
  }
}

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
      partnerCode: rawPartnerCode,
    } = body;

    const partnerCode = /^[A-Z0-9]{4,12}$/.test(String(rawPartnerCode ?? '').trim().toUpperCase())
      ? String(rawPartnerCode).trim().toUpperCase()
      : '';

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
        <tr><td><strong>Partner Code</strong></td><td>${esc(partnerCode) || '—'}</td></tr>
      </table>
    `;

    const { error } = await resend.emails.send({
      from: 'MUSICRAFT Applications <noreply@musicraft.eu>',
      to: ['info@musicraft.eu'],
      subject: partnerCode ? `New Application: ${artistName} [partner ${partnerCode}]` : `New Application: ${artistName}`,
      html,
      reply_to: contactEmail,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Partner referral – runs after the response, never blocks the applicant.
    if (partnerCode) {
      waitUntil(
        reportReferral(partnerCode, {
          name: String(artistName),
          email: String(contactEmail).trim(),
          country: String(country ?? ''),
        })
      );
    }

    // Screening agent — runs in the background, never blocks the applicant.
    // waitUntil keeps the request alive after the response is returned;
    // a plain un-awaited fetch gets cancelled when the function shuts down.
    if (process.env.TRIAGE_WEBHOOK_SECRET) {
      waitUntil(
        fetch('https://forms.musicraft.eu/api/triage-webhook', {
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
            partnerCode,
          }),
        }).catch((err) => console.error('Triage webhook failed:', err))
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
