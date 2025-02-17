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
    default: "Shadownik - Advanced Cybersecurity Solutions",
    template: "%s | Shadownik",
  },
  description:
    "Leading provider of cybersecurity solutions, services, and education. Protecting your digital assets with cutting-edge Web3 security.",
  keywords: [
    "cybersecurity",
    "web3 security",
    "security training",
    "blockchain security",
    "SIEM",
  ],
  authors: [{ name: "Shadownik" }],
  creator: "Shadownik",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shadownik - Advanced Cybersecurity Solutions",
    description:
      "Leading provider of cybersecurity solutions, services, and education.",
    siteName: "Shadownik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadownik - Advanced Cybersecurity Solutions",
    description:
      "Leading provider of cybersecurity solutions, services, and education.",
    creator: "@shadownik",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
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
