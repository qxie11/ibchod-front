'use client';

import { useGTM } from '@/hooks/use-gtm';

export function GTMTracker() {
  useGTM();
  return null;
}
