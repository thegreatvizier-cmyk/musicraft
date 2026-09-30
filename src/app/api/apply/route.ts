import { Resend } from 'resend';
import { waitUntil } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

// Partner Program referrals are written straight to the Partner Program database
// (Supabase) through the pp_register_referral() function. The call uses the public
// (publishable) key and is only accepted with the shared secret REFERRAL_WEBHOOK_SECRET.
const PP_SUPABASE_URL = process.env.PP_SUPABASE_URL;
const PP_SUPABASE_PUBLISHABLE_KEY = process.env.PP_SUPABASE_PUBLISHABLE_KEY;
const PARTNER_PORTAL_URL = 'https://partners.musicraft.eu/portal';

async function reportReferral(code: string, client: { name: string; email: string; country: string }) {
  const secret = process.env.REFERRAL_WEBHOOK_SECRET;
  if (!secret || !PP_SUPABASE_URL || !PP_SUPABASE_PUBLISHABLE_KEY) {
    console.error('[referral] missing env (REFERRAL_WEBHOOK_SECRET / PP_SUPABASE_URL / PP_SUPABASE_PUBLISHABLE_KEY) – not reported:', code);
    return;
  }
  try {
    const res = await fetch(`${PP_SUPABASE_URL}/rest/v1/rpc/pp_register_referral`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: PP_SUPABASE_PUBLISHABLE_KEY },
      body: JSON.stringify({
        p_secret: secret,
        p_submission_id: crypto.randomUUID(),
        p_code: code,
        p_name: client.name,
        p_email: client.email,
        p_country: client.country,
      }),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error('[referral] rpc failed', res.status, text.slice(0, 500));
      return;
    }
    const result = JSON.parse(text);
    console.log('[referral]', code, result.status, result.referral_status ?? '');

    // Notify the partner about a new referral (only for normal, non-rejected referrals)
    if (result.status === 'created' && result.referral_status === 'applied' && result.partner_email) {
      const { error } = await resend.emails.send({
        from: 'Musicraft Partners <partners@musicraft.eu>',
        to: [result.partner_email],
        subject: `New referral: ${result.masked_name} applied`,
        html: `<p>Hi ${esc(String(result.partner_name ?? '').split(' ')[0])},</p>
<p>${esc(result.masked_name)} has just applied to Musicraft with your partner code <strong>${esc(code)}</strong>.</p>
<p>We review every application personally. You'll get another email once the client is accepted.</p>
<p><a href="${PARTNER_PORTAL_URL}/referrals">View your referrals in the partner portal</a></p>
<p>Musicraft Partner Program</p>`,
      });
      if (error) console.error('[referral] partner email failed', error);
    }
  } catch (err) {
    console.error('[referral] error', err);
  }
}

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
