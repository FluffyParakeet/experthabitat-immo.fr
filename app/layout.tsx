import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { defaultMetadata, businessJsonLd } from "@/lib/metadata";
import { isComingSoonEnabled } from "@/lib/coming-soon";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { Footer } from "@/components/layout/footer";
import { AppProviders } from "./providers";
import { CookieConsentProvider } from "@/components/cookie-consent/cookie-consent-provider";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = { ...defaultMetadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const soon = isComingSoonEnabled();
  if (soon) {
    return (
      <html lang="fr" className={`${jakarta.variable} ${inter.variable}`}>
        <head />
        <body className="min-h-dvh font-sans text-text-primary">
          <AppProviders>
            <main className="min-h-dvh w-full min-w-0 overflow-x-hidden">{children}</main>
          </AppProviders>
        </body>
      </html>
    );
  }
  return (
    <html lang="fr" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="min-h-dvh font-sans text-text-primary">
        <AppProviders>
          <CookieConsentProvider>
            <ConditionalNavbar />
            <main className="min-h-[60vh] w-full min-w-0 overflow-x-hidden text-pretty">{children}</main>
            <Footer />
          </CookieConsentProvider>
        </AppProviders>
      </body>
    </html>
  );
}
