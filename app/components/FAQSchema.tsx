export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a WebP file?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebP is a modern image format developed by Google that provides superior compression compared to JPG and PNG. While widely supported by modern browsers, some older systems and applications may not support WebP files."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I need to convert WebP to JPG?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JPG is universally supported across all devices, browsers, and platforms. Converting WebP to JPG ensures your images can be viewed and shared anywhere without compatibility issues."
        }
      },
      {
        "@type": "Question",
        "name": "Is FastWebP really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, FastWebP is completely free to use with no file limits, watermarks, or hidden fees. All processing happens in your browser, so we don't incur server costs for conversions."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files uploaded to your server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. FastWebP converts files entirely in your browser using native Canvas API technology. Your files never leave your device, ensuring complete privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "How many files can I convert at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can convert up to 10 files simultaneously with a maximum file size of 50MB per file and 200MB total. For best performance, we recommend converting smaller batches."
        }
      },
      {
        "@type": "Question",
        "name": "Does FastWebP work on mobile devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! FastWebP works on all modern browsers including mobile Safari, Chrome, and Firefox on iOS and Android devices."
        }
      },
      {
        "@type": "Question",
        "name": "Will the image quality be affected?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FastWebP converts WebP files to high-quality JPG (90% quality) which preserves excellent image quality while ensuring broad compatibility."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation required. FastWebP is a web-based tool that works directly in your browser. Just visit the website and start converting."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  );
}
