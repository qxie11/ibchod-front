'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { pageview } from '@/lib/gtm';

export function useGTM() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);
}
