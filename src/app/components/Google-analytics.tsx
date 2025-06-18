'use client';

import Script from 'next/script';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? '';
// const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const GA_DEBUG = true;


export default function GoogleAnalytics() {
 
  if (!GA_TRACKING_ID) {
    if (IS_DEVELOPMENT) {
      console.warn('Google Analytics tracking ID is not provided');
    }
    return null;
  }


  if (IS_DEVELOPMENT && !GA_DEBUG) {
    console.log('Google Analytics disabled in development');
    return null;
  }

  return (
    <>
   
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        onLoad={() => {
          if (IS_DEVELOPMENT) {
            console.log('Google Analytics script loaded');
          }
        }}
        onError={(error) => {
          console.error('Failed to load Google Analytics script:', error);
        }}
      />
      
   
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              debug_mode: ${IS_DEVELOPMENT},
              ${IS_DEVELOPMENT ? `
              custom_map: {
                'custom_parameter': 'development'
              }` : ''}
            });
          `,
        }}
      />
    </>
  );
}