'use client';

import { useState } from 'react';


import { redirect } from 'next/navigation';


type ReleaseStatus = 'Draft' | 'Submitted' | 'QC Review' | 'Approved for Distribution' | 'Delivered to DSPs' | 'Live' | 'Takedown';
type ReleaseType = 'Single' | 'EP' | 'Album';
type QCStatus = 'Pending' | 'In Review' | 'Changes Requested' | 'Approved' | 'Rejected';

interface Track {
  number: number;
  title: string;
  isrc: string;
  explicit: boolean;
  duration: string;
  audioFile: string;
  format: 'WAV' | 'FLAC' | 'MP3';
}

interface QCNote {
  id: number;
  author: string;
  initials: string;
  timestamp: string;
  actionType: 'Changes Requested' | 'Approved' | 'Rejected' | 'Note Added';
  note: string;
  flaggedIssues?: string[];
}

interface ReleaseDetail {
  id: number;
  title: string;
  primaryArtist: string;
  featuredArtists: string[];
  type: ReleaseType;
  releaseDate: string;
  upc: string;
  genre: string;
  subGenre: string;
  language: string;
  recordLabel: string;
  copyrightP: string;
  copyrightC: string;
  submittedDate: string;
  status: ReleaseStatus;
  qcStatus: QCStatus;
  artwork: string;
  tracks: Track[];
  dsps: string[];
  territories: string[];
  preSaveEnabled: boolean;
  preOrderEnabled: boolean;
  qcNotes: QCNote[];
}

const ALL_DSPS = [
  { key: 'Spotify', color: '#1DB954', symbol: 'SP' },
  { key: 'Apple Music', color: '#FA243C', symbol: 'AM' },
  { key: 'YouTube Music', color: '#FF0000', symbol: 'YT' },
  { key: 'TikTok', color: '#FF0050', symbol: 'TK' },
  { key: 'Deezer', color: '#A238FF', symbol: 'DZ' },
  { key: 'Amazon Music', color: '#00A8E1', symbol: 'AZ' },
  { key: 'Tidal', color: '#00FFFF', symbol: 'TD' },
  { key: 'Pandora', color: '#224099', symbol: 'PN' },
  { key: 'iHeartRadio', color: '#C6002B', symbol: 'IH' },
];

const TERRITORIES = [
  { key: 'North America', flag: '🌎' },
  { key: 'Europe', flag: '🌍' },
  { key: 'Asia Pacific', flag: '🌏' },
  { key: 'Latin America', flag: '🌎' },
  { key: 'Middle East & Africa', flag: '🌍' },
];

const ARTWORK_CHECKLIST = [
  { label: 'Minimum 3000×3000px resolution', pass: true },
  { label: 'RGB color mode', pass: true },
  { label: 'JPEG or PNG format', pass: true },
  { label: 'No URLs or social handles', pass: true },
  { label: 'No explicit content warnings', pass: true },
  { label: 'Accurate representation of release', pass: true },
];

const MOCK_RELEASES: Record<string, ReleaseDetail> = {
  '1': {
    id: 1, title: 'Void Signal', primaryArtist: 'Zara Okonkwo', featuredArtists: ['Kai Morrow'],
    type: 'Album', releaseDate: '2025-07-01', upc: '196871234567',
    genre: 'Electronic', subGenre: 'Ambient', language: 'English',
    recordLabel: 'Neon Collective', copyrightP: '℗ 2025 Neon Collective', copyrightC: '© 2025 Zara Okonkwo',
    submittedDate: '2025-06-09', status: 'QC Review', qcStatus: 'Pending',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    tracks: [
      { number: 1, title: 'Void Signal (Intro)', isrc: 'USRC12500001', explicit: false, duration: '2:14', audioFile: 'void_signal_intro.wav', format: 'WAV' },
      { number: 2, title: 'Dark Matter', isrc: 'USRC12500002', explicit: false, duration: '3:47', audioFile: 'dark_matter.wav', format: 'WAV' },
      { number: 3, title: 'Frequency Collapse', isrc: 'USRC12500003', explicit: true, duration: '4:12', audioFile: 'frequency_collapse.flac', format: 'FLAC' },
      { number: 4, title: 'Signal Lost', isrc: 'USRC12500004', explicit: false, duration: '5:01', audioFile: 'signal_lost.wav', format: 'WAV' },
    ],
    dsps: ['Spotify', 'Apple Music', 'YouTube Music', 'Deezer'],
    territories: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
    preSaveEnabled: true, preOrderEnabled: false,
    qcNotes: [
      { id: 1, author: 'Marcus Webb', initials: 'MW', timestamp: '2025-06-10T14:32:00', actionType: 'Note Added', note: 'Release entered QC queue. Initial metadata review in progress.' },
    ],
  },
  '2': {
    id: 2, title: 'Prism Wave', primaryArtist: 'Zara Okonkwo', featuredArtists: [],
    type: 'EP', releaseDate: '2025-06-28', upc: '196871234568',
    genre: 'Synthwave', subGenre: 'Electronic', language: 'English',
    recordLabel: 'Neon Collective', copyrightP: '℗ 2025 Neon Collective', copyrightC: '© 2025 Zara Okonkwo',
    submittedDate: '2025-06-07', status: 'QC Review', qcStatus: 'In Review',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    tracks: [
      { number: 1, title: 'Prism Wave', isrc: 'USRC12500010', explicit: false, duration: '3:22', audioFile: 'prism_wave.wav', format: 'WAV' },
      { number: 2, title: 'Neon Cascade', isrc: 'USRC12500011', explicit: false, duration: '4:05', audioFile: 'neon_cascade.flac', format: 'FLAC' },
      { number: 3, title: 'Glass Horizon', isrc: 'USRC12500012', explicit: false, duration: '3:58', audioFile: 'glass_horizon.wav', format: 'WAV' },
    ],
    dsps: ['Spotify', 'Apple Music', 'TikTok', 'Amazon Music'],
    territories: ['North America', 'Europe'],
    preSaveEnabled: true, preOrderEnabled: true,
    qcNotes: [
      { id: 1, author: 'Sarah Chen', initials: 'SC', timestamp: '2025-06-08T09:15:00', actionType: 'Note Added', note: 'Release entered QC queue. Artwork and metadata look clean at first glance.' },
      { id: 2, author: 'Marcus Webb', initials: 'MW', timestamp: '2025-06-09T11:45:00', actionType: 'Changes Requested', note: 'Please verify ISRC codes for tracks 2 and 3. Format appears non-standard.', flaggedIssues: ['ISRC missing or incorrect'] },
    ],
  },
  '3': {
    id: 3, title: 'Lunar Drift', primaryArtist: 'Kai Morrow', featuredArtists: [],
    type: 'Single', releaseDate: '2025-06-20', upc: '',
    genre: 'Lo-fi', subGenre: 'Hip-Hop', language: 'English',
    recordLabel: 'Independent', copyrightP: '℗ 2025 Kai Morrow', copyrightC: '© 2025 Kai Morrow',
    submittedDate: '2025-06-05', status: 'QC Review', qcStatus: 'Changes Requested',
    artwork: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&q=80',
    tracks: [
      { number: 1, title: 'Lunar Drift', isrc: '', explicit: false, duration: '2:58', audioFile: 'lunar_drift.mp3', format: 'MP3' },
    ],
    dsps: ['Spotify', 'Apple Music'],
    territories: ['North America'],
    preSaveEnabled: false, preOrderEnabled: false,
    qcNotes: [
      { id: 1, author: 'Sarah Chen', initials: 'SC', timestamp: '2025-06-06T10:00:00', actionType: 'Note Added', note: 'Release received. Missing UPC and ISRC — flagging for artist.' },
      { id: 2, author: 'Marcus Webb', initials: 'MW', timestamp: '2025-06-07T14:20:00', actionType: 'Changes Requested', note: 'UPC is missing and ISRC for the track is not provided. Please supply both before resubmitting.', flaggedIssues: ['UPC missing or incorrect', 'ISRC missing or incorrect'] },
    ],
  },
  '4': {
    id: 4, title: 'Phantom Signal', primaryArtist: 'Echo Veil', featuredArtists: [],
    type: 'Single', releaseDate: '2025-06-15', upc: '196871234570',
    genre: 'Indie', subGenre: 'Alternative', language: 'English',
    recordLabel: 'Veil Records', copyrightP: '℗ 2025 Veil Records', copyrightC: '© 2025 Echo Veil',
    submittedDate: '2025-06-03', status: 'Approved for Distribution', qcStatus: 'Approved',
    artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    tracks: [
      { number: 1, title: 'Phantom Signal', isrc: 'USRC12500020', explicit: false, duration: '3:44', audioFile: 'phantom_signal.wav', format: 'WAV' },
    ],
    dsps: ['Spotify', 'Apple Music', 'YouTube Music', 'Deezer', 'Amazon Music'],
    territories: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
    preSaveEnabled: true, preOrderEnabled: false,
    qcNotes: [
      { id: 1, author: 'Sarah Chen', initials: 'SC', timestamp: '2025-06-04T09:00:00', actionType: 'Note Added', note: 'Metadata verified. Artwork passes all requirements.' },
      { id: 2, author: 'Marcus Webb', initials: 'MW', timestamp: '2025-06-04T16:30:00', actionType: 'Approved', note: 'All metadata and audio files verified. Release approved for distribution.' },
    ],
  },
  '5': {
    id: 5, title: 'Midnight Frequencies', primaryArtist: 'Zara Okonkwo', featuredArtists: [],
    type: 'Single', releaseDate: '2024-01-15', upc: '196871234560',
    genre: 'Electronic', subGenre: 'Ambient', language: 'English',
    recordLabel: 'Neon Collective', copyrightP: '℗ 2024 Neon Collective', copyrightC: '© 2024 Zara Okonkwo',
    submittedDate: '2024-01-01', status: 'Live', qcStatus: 'Approved',
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80',
    tracks: [
      { number: 1, title: 'Midnight Frequencies', isrc: 'USRC12400001', explicit: false, duration: '3:45', audioFile: 'midnight_frequencies.wav', format: 'WAV' },
    ],
    dsps: ['Spotify', 'Apple Music', 'YouTube Music', 'TikTok', 'Deezer', 'Amazon Music'],
    territories: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'],
    preSaveEnabled: false, preOrderEnabled: false,
    qcNotes: [
      { id: 1, author: 'Marcus Webb', initials: 'MW', timestamp: '2024-01-02T10:00:00', actionType: 'Approved', note: 'All checks passed. Release approved and delivered to DSPs.' },
    ],
  },
};

const STATUS_CONFIG: Record<ReleaseStatus, { bg: string; color: string; border: string; label: string; description: string; icon: string }> = {
  'Draft':                    { bg: 'rgba(107,114,128,0.15)', color: '#9CA3AF', border: 'rgba(107,114,128,0.25)', label: 'Draft',                    description: 'In preparation',            icon: '○' },
  'Submitted':                { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA', border: 'rgba(59,130,246,0.25)',  label: 'Submitted',                description: 'Awaiting QC Review',         icon: '↑' },
  'QC Review':                { bg: 'rgba(139,92,246,0.15)',  color: '#A78BFA', border: 'rgba(139,92,246,0.3)',   label: 'QC Review',                description: 'Under internal review',      icon: '🔍' },
  'Approved for Distribution':{ bg: 'rgba(99,102,241,0.15)',  color: '#818CF8', border: 'rgba(99,102,241,0.3)',   label: 'Approved for Distribution', description: 'Ready for DSP delivery',     icon: '✓' },
  'Delivered to DSPs':        { bg: 'rgba(6,182,212,0.15)',   color: '#22D3EE', border: 'rgba(6,182,212,0.25)',   label: 'Delivered to DSPs',         description: 'Sent to selected platforms', icon: '◈' },
  'Live':                     { bg: 'rgba(16,185,129,0.15)',  color: '#34D399', border: 'rgba(16,185,129,0.25)',  label: 'Live',                     description: 'Available on DSPs',          icon: '●' },
  'Takedown':                 { bg: 'rgba(239,68,68,0.15)',   color: '#FCA5A5', border: 'rgba(239,68,68,0.25)',   label: 'Takedown',                 description: 'Removed from platforms',     icon: '⊘' },
};

const TYPE_CONFIG: Record<ReleaseType, { bg: string; color: string }> = {
  Single: { bg: 'rgba(124,58,237,0.15)', color: '#A78BFA' },
  EP:     { bg: 'rgba(6,182,212,0.12)',  color: '#22D3EE' },
  Album:  { bg: 'rgba(245,158,11,0.12)', color: '#FCD34D' },
};

const FORMAT_CONFIG: Record<string, { bg: string; color: string }> = {
  WAV:  { bg: 'rgba(99,102,241,0.15)',  color: '#818CF8' },
  FLAC: { bg: 'rgba(6,182,212,0.12)',   color: '#22D3EE' },
  MP3:  { bg: 'rgba(245,158,11,0.12)',  color: '#FCD34D' },
};

const QC_NOTE_CONFIG: Record<string, { bg: string; color: string; border: string; icon: string }> = {
  'Changes Requested': { bg: 'rgba(249,115,22,0.12)',  color: '#FB923C', border: 'rgba(249,115,22,0.3)',  icon: '↩' },
  'Approved':          { bg: 'rgba(16,185,129,0.12)',  color: '#34D399', border: 'rgba(16,185,129,0.3)',  icon: '✓' },
  'Rejected':          { bg: 'rgba(239,68,68,0.12)',   color: '#FCA5A5', border: 'rgba(239,68,68,0.3)',   icon: '⊘' },
  'Note Added':        { bg: 'rgba(139,92,246,0.12)',  color: '#A78BFA', border: 'rgba(139,92,246,0.3)',  icon: '◎' },
};

function formatDate(dateStr: string) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' · ' +
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-xs px-1.5 py-0.5 rounded transition-all"
      style={{ background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.06)', color: copied ? '#34D399' : 'rgba(232,232,240,0.4)', border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.08)'}` }}
      title="Copy to clipboard"
    >
      {copied ? '✓' : '⎘'}
    </button>
  );
}

export default function CatalogDetailPage() {
  redirect('/musicraft');
}
