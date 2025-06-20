'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
  
    if (window.gtag && pathname) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      // Send pageview with path
      window.gtag('event', 'page_view', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}