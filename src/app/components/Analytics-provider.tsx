'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      // Check if gtag is available and if we have a pathname
      if (!window.gtag) {
        if (process.env.NODE_ENV === 'development') {
          console.info('Google Analytics not loaded: window.gtag is not available');
        }
        return;
      }

      if (!pathname) {
        return;
      }

      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      // Send pageview with path
      window.gtag('event', 'page_view', {
        page_path: url,
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.info(`Google Analytics pageview sent for: ${url}`);
      }
    } catch (error) {
      console.error('Error tracking pageview:', error);
    }
  }, [pathname, searchParams]);

  return null;
}