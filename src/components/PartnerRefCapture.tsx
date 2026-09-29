'use client';

import { useEffect } from 'react';
import { captureRefFromUrl } from '@/lib/partnerRef';

export default function PartnerRefCapture() {
  useEffect(() => {
    captureRefFromUrl();
  }, []);
  return null;
}
