'use client';

import Script from 'next/script';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Replace with your actual Google Analytics measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID_PLACEHOLDER';

export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            // Privacy-focused configuration
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            // Custom events for WebP conversion tracking
            custom_map: {
              'custom_parameter_1': 'conversion_type',
              'custom_parameter_2': 'file_count'
            }
          });
        `}
      </Script>
    </>
  );
}

// Helper functions for tracking conversion events
export const trackConversion = (fileCount: number, conversionType: 'single' | 'bulk' = 'single') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_conversion', {
      event_category: 'conversion',
      event_label: conversionType,
      value: fileCount,
      custom_parameter_1: conversionType,
      custom_parameter_2: fileCount
    });
  }
};

export const trackDownload = (downloadType: 'individual' | 'zip', fileCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'download',
      event_label: downloadType,
      value: fileCount,
      custom_parameter_1: downloadType,
      custom_parameter_2: fileCount
    });
  }
};

export const trackError = (errorType: string, errorMessage: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion_error', {
      event_category: 'error',
      event_label: errorType,
      custom_parameter_1: errorType,
      custom_parameter_2: errorMessage
    });
  }
};