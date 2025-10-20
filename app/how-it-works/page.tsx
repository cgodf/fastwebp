import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works - FastWebP Converter",
  description: "Learn how FastWebP converts WebP files to JPG entirely in your browser. No uploads, complete privacy, and lightning-fast conversion.",
  keywords: "how to convert WebP, WebP conversion process, browser WebP converter, Canvas API WebP, local file conversion, private WebP converter",
  openGraph: {
    title: "How It Works - FastWebP Converter",
    description: "Learn how FastWebP converts WebP files to JPG entirely in your browser. No uploads, complete privacy, and lightning-fast conversion.",
  },
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            How It Works
          </h1>

          <div className="grid gap-8 md:gap-12">
            {/* Browser-Based Processing */}
            <section className="border-2 border-border p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
                  1
                </div>
                <h2 className="text-2xl font-semibold text-foreground">
                  100% Browser-Based Processing
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                FastWebP uses the native Canvas API to convert your WebP files 
                directly in your browser. This means your files never leave your device - they&apos;re 
                processed locally on your computer using built-in browser capabilities for
                maximum speed and compatibility.
              </p>
              <div className="border-2 border-border p-4 rounded">
                <p className="text-sm text-foreground font-medium">
                  🔒 Your files never touch our servers - complete privacy guaranteed
                </p>
              </div>
            </section>

            {/* Step by Step Process */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                The Conversion Process
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">File Selection</h3>
                    <p className="text-muted-foreground">
                      Drag and drop your WebP files or click to browse. You can select multiple 
                      files for batch conversion - no limits on quantity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Local Processing</h3>
                    <p className="text-muted-foreground">
                      The browser&apos;s native image decoder reads the WebP format and loads it onto a Canvas. 
                      The conversion happens entirely within your browser&apos;s sandbox environment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quality Optimization</h3>
                    <p className="text-muted-foreground">
                      The image is re-encoded as a high-quality JPG with optimized compression 
                      settings to maintain image quality while ensuring broad compatibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Download</h3>
                    <p className="text-muted-foreground">
                      Download individual files as they complete or use our bulk download feature 
                      to get all converted images in a single ZIP file.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section className="border-2 border-border p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Technical Implementation
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    WebP Decoding
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Uses native browser image loading for WebP format support - no external libraries needed
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    JPG Encoding
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Canvas API with optimized quality settings for the best size-to-quality ratio
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Memory Management
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Efficient memory usage with automatic cleanup to handle large files and batches
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                    Error Handling
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Robust error recovery with detailed feedback for any conversion issues
                  </p>
                </div>
              </div>
            </section>

            {/* Why This Approach */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Why Browser-Based Conversion?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Complete Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your files are never uploaded anywhere. Processing happens entirely on your device.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    No network delays. Conversion starts immediately and runs at full CPU speed.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">♾️</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">No Limits</h3>
                  <p className="text-sm text-muted-foreground">
                    Convert as many files as you want, any size, without restrictions or quotas.
                  </p>
                </div>
              </div>
            </section>

            {/* Browser Compatibility */}
            <section className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Browser Compatibility
              </h2>
              <p className="text-muted-foreground mb-4">
                FastWebP works on all modern browsers that support the Canvas API:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center text-foreground">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  All Chrome
                </div>
                <div className="flex items-center text-foreground">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  All Firefox
                </div>
                <div className="flex items-center text-foreground">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  All Safari
                </div>
                <div className="flex items-center text-foreground">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  All Edge
                </div>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try FastWebP Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}