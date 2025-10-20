export default function StructuredData() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FastWebP",
    "url": "https://www.fastwebptojpg.com",
    "description": "Convert WebP files to JPG instantly in your browser. No uploads, completely private, bulk conversion supported.",
    "applicationCategory": "PhotographyApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "FastWebP"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "WebP to JPG conversion",
      "Bulk file processing", 
      "Private browser-based conversion",
      "No file uploads required",
      "Fast processing",
      "Cross-platform compatibility"
    ],
    "screenshot": "https://www.fastwebptojpg.com/app-screenshot.jpg"
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FastWebP",
    "url": "https://www.fastwebptojpg.com",
    "description": "Fast and free WebP to JPG converter tool",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/fastwebp"
    ]
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FastWebP - WebP to JPG Converter",
    "applicationCategory": "PhotographyApplication",
    "operatingSystem": "Web Browser",
    "url": "https://www.fastwebptojpg.com",
    "description": "Convert WebP files to JPG instantly in your browser. No uploads, completely private, bulk conversion supported.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "author": {
      "@type": "Organization", 
      "name": "FastWebP"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.fastwebptojpg.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}