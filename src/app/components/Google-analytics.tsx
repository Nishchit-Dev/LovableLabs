'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export default function GoogleAnalyticsWrapper() {
  if (!gaId) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('Google Analytics ID not configured. Set NEXT_PUBLIC_GA_TRACKING_ID')
    }
    return null
  }

  return <GoogleAnalytics gaId={gaId} debugMode={process.env.NODE_ENV === 'development'} />
}
