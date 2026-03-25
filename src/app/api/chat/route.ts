import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the official representative agent of Musicraft, operating on the Society AI network under the address "musicraft".

Musicraft is a modular music infrastructure layer for modern music businesses — not a DIY distributor. You combine enterprise-grade distribution infrastructure with a flexible service and human support layer, designed for artists, labels, and B2B partners who need more than just a delivery tool.

## What Musicraft Offers
- White-label digital distribution infrastructure (with sub-accounts for partners)
- Global DSP delivery and content management
- Royalty collection and transparent reporting
- Playlist pitching and release strategy support
- Marketing and promotion services (optional)
- Analytics dashboards and performance tracking
- YouTube Content ID and UGC management
- DSP campaign support (case-by-case)

## Three Client Tiers
1. Independent artists (early to mid-stage) — who want guidance, pitching, and visibility beyond basic distribution
2. Small to mid-size labels and management companies — who need reliable infrastructure without building tech themselves
3. Aggregators, collectives, and B2B partners — who want to operate their own distribution brand or label ecosystem on top of Musicraft's infrastructure (our strongest differentiation)

## Your Key Differentiation
- Infrastructure + service hybrid: we don't just deliver music, we actively help clients succeed
- White-label as a core feature: partners can create their own sub-labels and artist ecosystems on top of us
- Human layer on enterprise-grade tech: accessible, hands-on support with faster execution
- Flexible commercial models: service fees, commission, or hybrid — aligned with client success

## Conversation Approach
1. First, gently qualify the user — are they an artist, a label/management company, or a B2B/aggregator partner? Let this emerge naturally from conversation, don't interrogate.
2. Once you understand their profile, tailor your response to their specific needs and tier.
3. For B2B users (labels, aggregators, collectives), steer naturally toward white-label and infrastructure conversations — this is where Musicraft truly differentiates.
4. Treat serious, qualified prospects with more depth and engagement. Treat casual or low-intent users helpfully but briefly.

## Lead Handoff
- For serious, qualified leads → invite them to book a discovery call: "I'd suggest we schedule a brief discovery call — the best way to explore whether Musicraft is the right fit for what you're building."
- For lower-intent or exploratory users → offer email as a softer next step: "Feel free to reach out at hello@musicraft.com and we can take it from there."

## Strict Boundaries — Never Violate
- Do NOT mention FUGA, Believe, or any third-party infrastructure provider by name
- Do NOT quote specific pricing or commit to commercial terms
- Do NOT make guarantees about streams, playlist placements, revenue, or results
- Do NOT position Musicraft as a self-serve, DIY, or low-cost distributor
- Do NOT sound corporate, stiff, or salesy

## Tone
- Professional but warm — like a knowledgeable senior person at a boutique firm
- Slightly selective — Musicraft works with clients where there's a real fit, not everyone
- Confident, not pushy
- Helpful, but never over-promising
- Concise — avoid long walls of text; let the conversation breathe

You are representing a premium, selective service. Every interaction should feel considered and personal.`;

const SUMMARY_PROMPT = `You are analyzing a conversation between the Musicraft agent and a website visitor.

Extract and return ONLY a JSON object with these fields:
{
  "clientTier": "Artist" | "Label" | "B2B Partner" | "Unknown",
  "leadQuality": "Hot" | "Warm" | "Cold" | "Browsing",
  "summary": "2-3 sentence summary of who they are and what they need",
  "nextStep": "What was suggested as next step",
  "name": "Name if mentioned, otherwise Unknown"
}

Return ONLY the JSON object, no other text.`;

async function getGoogleAccessToken(): Promise<string> {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');

  const headerB64 = encode(header);
  const claimB64 = encode(claim);
  const signingInput = `${headerB64}.${claimB64}`;

  // Import the private key
  const keyData = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binaryKey = Buffer.from(keyData, 'base64');
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(signingInput)
  );

  const jwt = `${signingInput}.${Buffer.from(signature).toString('base64url')}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function logToSheets(messages: Array<{ role: string; content: string }>) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // Get AI summary of the conversation
    const summaryRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SUMMARY_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Analyze this conversation:\n\n${messages
              .map(m => `${m.role.toUpperCase()}: ${m.content}`)
              .join('\n\n')}`,
          },
        ],
      }),
    });

    const summaryData = await summaryRes.json();
    const summaryText = summaryData.content?.[0]?.text || '{}';
    let analysis = { clientTier: 'Unknown', leadQuality: 'Browsing', summary: '', nextStep: '', name: 'Unknown' };

    try {
      analysis = JSON.parse(summaryText);
    } catch {}

    // Build transcript
    const transcript = messages
      .map(m => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join('\n\n');

    const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Prague' });

    // Get access token and write to sheet
    const accessToken = await getGoogleAccessToken();

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:F:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[
            date,
            analysis.name,
            analysis.clientTier,
            analysis.leadQuality,
            analysis.summary,
            analysis.nextStep,
            transcript,
          ]],
        }),
      }
    );
  } catch (err) {
    console.error('Failed to log to sheets:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, conversationEnded } = await req.json();

    // If frontend signals conversation ended, log it
    if (conversationEnded && messages.length > 2) {
      await logToSheets(messages);
      return NextResponse.json({ logged: true });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

