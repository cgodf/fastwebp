export default function HowToSchema() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert WebP to JPG",
    description:
      "Step-by-step guide to convert WebP files to JPG format using FastWebP in your browser.",
    totalTime: "PT1M",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload WebP Files",
        text: "Drag and drop your WebP files onto the converter or click to browse and select files from your device. You can select multiple files for batch conversion.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Automatic Conversion",
        text: "The browser automatically converts your WebP files to JPG format using Canvas API. All processing happens locally on your device with no uploads to servers.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Download Converted Files",
        text: "Download individual JPG files as they complete, or use the bulk download feature to get all converted images in a single ZIP file.",
        position: 3,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(howToSchema),
      }}
    />
  );
}
