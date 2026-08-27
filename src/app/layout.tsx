import type { Metadata, Viewport } from "next";
import { Newsreader, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CORPORATE } from "@/lib/content";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ddam.ai"),
  title: {
    default: "Dentsu Data Artist Mongol — Intelligence, engineered in Ulaanbaatar",
    template: "%s — Dentsu Data Artist Mongol",
  },
  description: `${CORPORATE.headcount} specialists in AI development, data engineering and digital marketing — building production systems for Dentsu Digital and its clients in Japan and across APAC.`,
  openGraph: {
    type: "website",
    siteName: CORPORATE.legalName,
    title: "Intelligence, engineered in Ulaanbaatar",
    description: `${CORPORATE.headcount} specialists in AI development, data engineering and digital marketing, backed by dentsu.`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07090F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <body className="bg-ink text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-ink focus:font-medium"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
