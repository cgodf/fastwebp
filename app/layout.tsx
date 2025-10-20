import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Analytics from './components/Analytics';
import StructuredData from './components/StructuredData';
import FAQSchema from './components/FAQSchema';
import Footer from './components/Footer';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FastWebP - Fast & Free WebP to JPG Converter",
  description: "Convert WebP files to JPG instantly in your browser. No uploads, completely private, bulk conversion supported. Fast, free, and secure WebP converter.",
  keywords: "WebP to JPG, WebP to JPEG, WebP converter, convert WebP to JPG online, online WebP converter, free WebP converter, WebP to JPG online free, image converter, browser WebP converter, private WebP converter, batch WebP converter, bulk convert WebP, no upload WebP converter",
  authors: [{ name: "FastWebP" }],
  creator: "FastWebP",
  publisher: "FastWebP",
  category: "Technology",
  applicationName: "FastWebP",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "FastWebP - Fast & Free WebP to JPG Converter",
    description: "Convert WebP files to JPG instantly in your browser. No uploads, completely private, bulk conversion supported.",
    url: "https://www.fastwebptojpg.com",
    siteName: "FastWebP",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.fastwebptojpg.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastWebP - Convert WebP to JPG instantly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FastWebP - Fast & Free WebP to JPG Converter",
    description: "Convert WebP files to JPG instantly in your browser. Private and secure.",
    images: ["https://www.fastwebptojpg.com/og-image.jpg"],
    creator: "@fastwebp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here after claiming your site
    // google: 'your-verification-code-here',
  },
  alternates: {
    canonical: "https://www.fastwebptojpg.com",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/fastwebplogo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_ID || '',
    'msapplication-TileColor': '#7c3aed',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const THEME_VERSION = '2.0';
                const savedVersion = localStorage.getItem('theme-version');
                const savedTheme = localStorage.getItem('theme');
                
                // Force light mode if version changed or new user
                if (savedVersion !== THEME_VERSION || !savedTheme) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                  localStorage.setItem('theme', 'light');
                  localStorage.setItem('theme-version', THEME_VERSION);
                } else if (savedTheme === 'dark') {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <StructuredData />
        <FAQSchema />
        <Analytics />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
