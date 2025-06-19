'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { pageview } from '../lib/gtag';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Combine pathname with search params for complete URL tracking
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}