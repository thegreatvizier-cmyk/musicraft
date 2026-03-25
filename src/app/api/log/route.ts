export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

const SUMMARY_PROMPT = `You are analyzing a conversation between the Musicraft agent and a website visitor.

Extract and return ONLY a JSON object with these fields:
{
  "clientTier": "Artist" | "Label" | "B2B Partner" | "Unknown",
  "leadQuality": "Hot" | "Warm" | "Cold" | "Browsing",
  "summary": "2-3 sentence summary of who they are and what they need",
  "nextStep": "What was suggested as next step",
  "name": "Name if mentioned, otherwise Unknown"
}

Return ONLY the JSON object, no markdown, no backticks, no other text.`;

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
  if (!tokenData.access_token) {
    throw new Error(`Token error: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length < 2) {
      return NextResponse.json({ error: 'Not enough messages' }, { status: 400 });
    }

    // Step 1: Get AI summary
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
        messages: [{
          role: 'user',
          content: `Analyze this conversation:\n\n${messages
            .map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n\n')}`,
        }],
      }),
    });

    const summaryData = await summaryRes.json();
    const summaryText = summaryData.content?.[0]?.text || '{}';

    let analysis = {
      clientTier: 'Unknown',
      leadQuality: 'Browsing',
      summary: 'No summary available',
      nextStep: 'None',
      name: 'Unknown',
    };

    try {
      analysis = JSON.parse(summaryText);
    } catch (e) {
      console.error('Failed to parse summary JSON:', summaryText);
    }

    // Step 2: Get Google access token
    const accessToken = await getGoogleAccessToken();

    // Step 3: Write to sheet
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const transcript = messages
      .map((m: { role: string; content: string }) => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join('\n\n');

    const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Prague' });

    const sheetRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:G:append?valueInputOption=USER_ENTERED`,
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

    const sheetData = await sheetRes.json();

    if (sheetData.error) {
      console.error('Sheets API error:', JSON.stringify(sheetData.error));
      return NextResponse.json({ error: sheetData.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, updatedRange: sheetData.updates?.updatedRange });
  } catch (err) {
    console.error('Log endpoint error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
