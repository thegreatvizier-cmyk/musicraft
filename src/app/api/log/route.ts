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
      console.error('Failed to parse summary:', summaryText);
    }

    // Step 2: Send to Google Sheet via Apps Script
    const transcript = messages
      .map((m: { role: string; content: string }) => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join('\n\n');

    const date = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Prague' });

    const scriptRes = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        name: analysis.name,
        clientTier: analysis.clientTier,
        leadQuality: analysis.leadQuality,
        summary: analysis.summary,
        nextStep: analysis.nextStep,
        transcript,
      }),
    });

    const scriptText = await scriptRes.text();
    console.log('Apps Script response:', scriptText);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Log endpoint error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
