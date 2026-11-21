'use client';

import { useEffect } from 'react';

// The root layout renders <html lang="en">; Czech pages switch it on the client.
export default function SetLangCs() {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = 'cs';
    return () => { document.documentElement.lang = prev; };
  }, []);
  return null;
}
