import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - FastWebP Converter",
  description:
    "FastWebP Privacy Policy - Learn how we protect your privacy with local file processing, no uploads, and minimal data collection.",
  keywords: "WebP privacy, secure file conversion, private image converter, no upload converter, local file processing",
  openGraph: {
    title: "Privacy Policy - FastWebP Converter",
    description:
      "FastWebP Privacy Policy - Learn how we protect your privacy with local file processing, no uploads, and minimal data collection.",
  },
};

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="border-2 border-border rounded-lg p-6 mb-8">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🔒</span>
              <h2 className="text-xl font-semibold text-foreground">
                Your Privacy is Our Priority
              </h2>
            </div>
            <p className="text-foreground font-medium">
              FastWebP processes all files locally in your browser. Your images never leave your device,
              and we cannot access, store, or view your files in any way.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            <strong>Last updated:</strong> {currentDate}
          </p>

          <div className="space-y-8">
            {/* Data We Don't Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Data We DON&apos;T Collect
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <strong className="text-foreground">Your files:</strong>{" "}
                    WebP images, converted JPG files, or any file content
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <strong className="text-foreground">
                      Personal information:
                    </strong>{" "}
                    Names, email addresses, or contact details
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <strong className="text-foreground">File metadata:</strong>{" "}
                    EXIF data, GPS locations, or timestamps
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <strong className="text-foreground">
                      Account information:
                    </strong>{" "}
                    No accounts or user profiles exist
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    <strong className="text-foreground">
                      Browsing history:
                    </strong>{" "}
                    What files you convert or when
                  </li>
                </ul>
              </div>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How Local Processing Works
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="text-2xl mr-2">💻</span>
                    In Your Browser
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Files are processed using Canvas API</li>
                    <li>• Conversion happens in browser memory</li>
                    <li>• No network requests for processing</li>
                    <li>• Files are cleared when you close the tab</li>
                  </ul>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="text-2xl mr-2">🚫</span>
                    Never on Our Servers
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• No file uploads to our servers</li>
                    <li>• No temporary file storage</li>
                    <li>• No server-side processing</li>
                    <li>• No file backups or caching</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data We May Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Data We May Collect
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    📊 Anonymous Analytics
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    We use Google Analytics to understand how users interact
                    with our service. This helps us improve the tool.
                  </p>
                  <div className="border border-border p-4 rounded">
                    <p className="text-sm font-medium text-foreground mb-2">
                      What we track:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Page visits and session duration</li>
                      <li>• General location (country/region only)</li>
                      <li>• Device type and browser used</li>
                      <li>• Which features are used most</li>
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    <strong>Note:</strong> Analytics data cannot be linked to
                    your files or personal identity.
                  </p>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    🍪 Essential Cookies
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    We use minimal cookies only for essential functionality:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-foreground">
                          Preference cookies:
                        </strong>{" "}
                        Remember your settings like theme preference
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <div>
                        <strong className="text-foreground">
                          Analytics cookies:
                        </strong>{" "}
                        Google Analytics tracking (can be disabled)
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your Rights and Controls
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    🎛️ Browser Controls
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Block cookies in browser settings</li>
                    <li>• Use private/incognito browsing</li>
                    <li>• Clear browser data anytime</li>
                    <li>• Opt out of Google Analytics</li>
                  </ul>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    🔐 Data Protection
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Files never leave your device</li>
                    <li>• No personal data to delete</li>
                    <li>• No accounts to manage</li>
                    <li>• GDPR compliant by design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third Party Services */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Third-Party Services
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Google Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      We use Google Analytics to analyze website traffic and
                      usage patterns.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Data is anonymized and aggregated</li>
                      <li>• IP addresses are masked</li>
                      <li>• No personal identification possible</li>
                      <li>
                        • You can opt out:{" "}
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Analytics Opt-out
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Content Delivery Network (CDN)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We use a CDN to deliver the website faster. CDNs only see
                      basic request information (IP address, user agent) but
                      never your files.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Security
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-foreground">
                        HTTPS encryption:
                      </strong>{" "}
                      All traffic is encrypted in transit
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-foreground">
                        Browser security:
                      </strong>{" "}
                      Processing happens in browser&apos;s secure sandbox
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-foreground">
                        No data retention:
                      </strong>{" "}
                      No files or personal data stored anywhere
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong className="text-foreground">
                        Regular updates:
                      </strong>{" "}
                      Security patches applied promptly
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Children&apos;s Privacy
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground">
                  FastWebP is safe for users of all ages since we don&apos;t collect
                  personal information. However, we recommend parental guidance
                  for users under 13, as required by COPPA. Since no personal
                  data is collected, no special procedures are needed for
                  children&apos;s privacy.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Changes to This Policy
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-3">
                  We may update this privacy policy occasionally to reflect
                  changes in our practices or legal requirements. Any changes
                  will be posted on this page with an updated &ldquo;Last modified&rdquo;
                  date.
                </p>
                <p className="text-muted-foreground">
                  Since we don&apos;t collect contact information, we cannot notify
                  you directly of changes. Please review this policy
                  periodically.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Questions or Concerns?
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  If you have questions about this privacy policy or our
                  practices:
                </p>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Contact Methods:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email: info@fastwebptojpg.com</li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  We&apos;ll respond to privacy inquiries within 7 business days.
                </p>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Ready to convert your WebP files with complete privacy?
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Converting →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
