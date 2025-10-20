import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - FastWebP Converter",
  description:
    "FastWebP Terms of Service - Usage terms, disclaimers, and user responsibilities for our WebP to JPG conversion service.",
  keywords: "WebP converter terms, image converter terms of service, free converter license, FastWebP usage terms",
  openGraph: {
    title: "Terms of Service - FastWebP Converter",
    description:
      "FastWebP Terms of Service - Usage terms, disclaimers, and user responsibilities for our WebP to JPG conversion service.",
  },
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>

          <div className="border-2 border-border rounded-lg p-6 mb-8">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📋</span>
              <h2 className="text-xl font-semibold text-foreground">
                Agreement to Terms
              </h2>
            </div>
            <p className="text-foreground">
              By using FastWebP, you agree to these terms. Our service is provided free of charge 
              for legitimate file conversion purposes.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            <strong>Last updated:</strong> {currentDate}
          </p>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  By accessing and using FastWebP (&ldquo;the Service&rdquo;), you accept
                  and agree to be bound by the terms and provision of this
                  agreement. These Terms of Service (&ldquo;Terms&rdquo;) constitute a
                  legally binding agreement between you and FastWebP.
                </p>
                <p className="text-muted-foreground">
                  If you do not agree to these Terms, please do not use our
                  Service.
                </p>
              </div>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Description of Service
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  FastWebP is a free, browser-based service that converts WebP
                  files to JPG format. WebP is a modern image format developed by Google
                  that provides superior compression. The service operates entirely within 
                  your web browser using Canvas API technology.
                </p>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Key Features:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Local file processing (no uploads to servers)</li>
                    <li>• Batch conversion support</li>
                    <li>• Free to use with no registration required</li>
                    <li>• Compatible with modern web browsers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Acceptable Use Policy
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Permitted Uses
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Converting your own WebP files to JPG format</li>
                    <li>• Converting files you have permission to modify</li>
                    <li>• Personal, educational, and commercial use</li>
                    <li>• Batch processing multiple files</li>
                    <li>
                      • Using the service for legitimate business purposes
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Prohibited Uses
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>
                      • Converting copyrighted material without permission
                    </li>
                    <li>• Processing illegal, harmful, or offensive content</li>
                    <li>
                      • Attempting to reverse engineer or circumvent the service
                    </li>
                    <li>• Using automated tools to overload the service</li>
                    <li>• Violating any applicable laws or regulations</li>
                    <li>
                      • Distributing malware or harmful code through the service
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. User Responsibilities
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Content Ownership
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You are solely responsible for ensuring you have the right
                      to convert any files you process through our service. You
                      warrant that you own or have permission to use all content
                      you convert.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Browser Compatibility
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You are responsible for using a compatible, modern web
                      browser that supports Canvas API. We recommend keeping
                      your browser updated for optimal performance and security.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Data Backup
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      While our service processes files locally, you should
                      maintain backups of your original files. We are not
                      responsible for any data loss that may occur.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Service Availability
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  We strive to provide reliable service, but we cannot guarantee
                  100% uptime or availability. The service may be temporarily
                  unavailable due to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Scheduled maintenance and updates</li>
                  <li>• Technical issues or server problems</li>
                  <li>• Network connectivity issues</li>
                  <li>• Force majeure events</li>
                </ul>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm text-foreground font-medium">
                    💡 <strong>Tip:</strong> Since processing happens in your
                    browser, you can continue using the service even if our
                    website experiences issues, as long as the page has already
                    loaded.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Disclaimers
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    Service &ldquo;As Is&rdquo;
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    FastWebP is provided &ldquo;as is&rdquo; without any warranties,
                    expressed or implied. We make no representations or
                    warranties regarding the accuracy, reliability, or
                    availability of the service.
                  </p>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    Conversion Quality
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    While we strive to maintain image quality during conversion,
                    we cannot guarantee that converted files will be identical
                    to the original in all aspects. Factors that may affect
                    quality include:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>
                      • Compression differences between WebP and JPG formats
                    </li>
                    <li>• Color space variations</li>
                    <li>• Metadata preservation limitations</li>
                    <li>• Browser-specific rendering differences</li>
                  </ul>
                </div>

                <div className="border-2 border-border p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">
                    Third-Party Dependencies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our service relies on browser technologies and third-party
                    libraries. Changes to these dependencies may affect service
                    functionality, and we cannot guarantee compatibility with
                    all browser versions or configurations.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Limitation of Liability
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">
                    To the fullest extent permitted by law
                  </strong>
                  , FastWebP and its operators shall not be liable for any
                  direct, indirect, incidental, special, consequential, or
                  punitive damages arising from or related to your use of the
                  service, including but not limited to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                  <li>• Data loss or corruption</li>
                  <li>• Service interruptions or downtime</li>
                  <li>• Conversion errors or quality issues</li>
                  <li>• Business losses or lost profits</li>
                  <li>• Privacy or security breaches</li>
                  <li>• Third-party claims or actions</li>
                </ul>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm text-foreground">
                    <strong>Maximum Liability:</strong> In any case, our total
                    liability to you for all damages shall not exceed the amount
                    you paid for using the service (which is $0 for our free
                    service).
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Privacy and Data Handling
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Our service is designed with privacy in mind. Please review
                  our
                  <a
                    href="/privacy"
                    className="text-primary hover:underline mx-1"
                  >
                    Privacy Policy
                  </a>
                  for detailed information about data handling.
                </p>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Key Privacy Points:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your files are processed locally in your browser</li>
                    <li>• No files are uploaded to our servers</li>
                    <li>
                      • We collect minimal analytics data for service
                      improvement
                    </li>
                    <li>• No personal information is required or collected</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Intellectual Property
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Our Rights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The FastWebP service, including its design, code,
                      trademarks, and content, is owned by us and protected by
                      intellectual property laws. You may not copy, modify, or
                      distribute our service.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Your Rights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You retain all rights to your original files and converted
                      files. We claim no ownership or rights over any content
                      you process through our service.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Open Source Components
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our service uses open-source libraries and components. The
                      use of these components is governed by their respective
                      licenses, which we comply with fully.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Termination
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  We reserve the right to terminate or suspend access to our
                  service immediately, without prior notice or liability, for
                  any reason whatsoever, including without limitation if you
                  breach the Terms.
                </p>
                <p className="text-muted-foreground">
                  You may discontinue use of the service at any time. Upon
                  termination, your right to use the service will cease
                  immediately.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Changes to Terms
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify or replace these Terms at any
                  time at our sole discretion. If a revision is material, we
                  will try to provide at least 30 days notice prior to any new
                  terms taking effect.
                </p>
                <p className="text-muted-foreground">
                  What constitutes a material change will be determined at our
                  sole discretion. Your continued use of the service after any
                  such changes constitutes your acceptance of the new Terms.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                12. Governing Law
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  These Terms shall be interpreted and governed by the laws of
                  the United States, without regard to its conflict of law
                  provisions.
                </p>
                <p className="text-muted-foreground">
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                13. Contact Information
              </h2>
              <div className="border-2 border-border p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="border border-border p-4 rounded">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Contact Methods:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email: info@fastwebptojpg.com</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Agreement Confirmation */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <div className="bg-primary/10 p-6 rounded-lg mb-6">
              <p className="text-foreground font-medium mb-2">
                By using FastWebP, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated: {currentDate}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              I Understand, Start Converting →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
