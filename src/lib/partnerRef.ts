// Partner referral code handling (client-side only).
// A visitor arriving from https://partners.musicraft.eu/r/CODE lands on
// musicraft.eu/?ref=CODE. We remember the code so the application form
// can be prefilled:
//   - with marketing consent  -> cookie "mc_ref" on .musicraft.eu for 90 days
//   - without consent         -> sessionStorage only (until the tab is closed)

const REF_KEY = 'mc_ref';
const CONSENT_KEY = 'musicraft_cookie_consent';
const COOKIE_DAYS = 90;
const CODE_RE = /^[A-Z0-9]{4,12}$/;

export function normalizeRef(value: string | null | undefined): string | null {
  const code = String(value ?? '').trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function setRefCookie(code: string) {
  const domain = window.location.hostname.endsWith('musicraft.eu') ? '; domain=.musicraft.eu' : '';
  const maxAge = COOKIE_DAYS * 24 * 60 * 60;
  document.cookie = `${REF_KEY}=${code}; path=/; max-age=${maxAge}; SameSite=Lax; Secure${domain}`;
}

function getRefCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${REF_KEY}=([^;]*)`));
  return match ? normalizeRef(decodeURIComponent(match[1])) : null;
}

/** Read ?ref=CODE from the current URL, store it, and remove it from the address bar. */
export function captureRefFromUrl() {
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get('ref');
    if (raw === null) return;
    const code = normalizeRef(raw);
    if (code) {
      sessionStorage.setItem(REF_KEY, code);
      if (hasConsent()) setRefCookie(code);
    }
    url.searchParams.delete('ref');
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  } catch {
    /* ignore */
  }
}

/** Call when the visitor accepts cookies: persist a session-only code as a cookie. */
export function promoteRefToCookie() {
  try {
    const code = normalizeRef(sessionStorage.getItem(REF_KEY));
    if (code) setRefCookie(code);
  } catch {
    /* ignore */
  }
}

/** The remembered partner code, if any (cookie first, then this session). */
export function getStoredRef(): string | null {
  try {
    return getRefCookie() ?? normalizeRef(sessionStorage.getItem(REF_KEY));
  } catch {
    return null;
  }
}
