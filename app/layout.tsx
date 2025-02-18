import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Providers } from "@/lib/providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Shadownik Cybersecurity - Advanced Training Platform",
    template: "%s | Shadownik Cybersecurity",
  },
  description:
    "Industry-leading cybersecurity training platform offering hands-on Web3, offensive, and defensive security courses. Join 10,000+ security professionals advancing their careers.",
  keywords: [
    "cybersecurity training",
    "web3 security",
    "offensive security",
    "defensive security",
    "CTF challenges",
    "blockchain security",
    "penetration testing",
    "security certification",
    "hands-on labs",
    "cybersecurity courses",
  ],
  authors: [
    { name: "Shadownik", url: "https://cybersecurity.shadownik.online" },
  ],
  creator: "Shadownik",
  publisher: "Shadownik Technologies",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cybersecurity.shadownik.online"),
  alternates: {
    canonical: "https://cybersecurity.shadownik.online",
    languages: {
      "en-US": "https://cybersecurity.shadownik.online/en-us",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cybersecurity.shadownik.online",
    title: "Shadownik Cybersecurity - Advanced Training Platform",
    description:
      "Industry-leading cybersecurity training platform offering hands-on Web3, offensive, and defensive security courses.",
    siteName: "Shadownik Cybersecurity",
    images: [
      {
        url: "https://cybersecurity.shadownik.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shadownik Cybersecurity Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadownik - Advanced Cybersecurity Training Platform",
    description:
      "Industry-leading cybersecurity training platform offering hands-on Web3, offensive, and defensive security courses.",
    creator: "@shadownik",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.vercel-analytics.com;"
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
