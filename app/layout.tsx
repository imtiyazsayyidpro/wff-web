import type { Metadata, Viewport } from "next";
import { Marcellus, Mulish } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { ServiceWorkerRegistrar } from "@/components/pwa/ServiceWorkerRegistrar";

const SITE_URL = "https://worthfightingfor.in";
const SITE_NAME = "Worth Fighting For";
const SITE_DESCRIPTION =
  "A calm AI counselor gently guides a turn-based conversation between the two of you — so the hard moments bring you closer.";

// Serif display face for headings; single weight (400) as the design uses.
const marcellus = Marcellus({
  variable: "--font-marcellus",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Variable sans for UI/body text.
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base for resolving relative og:image / icon URLs into absolute ones.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "couples counseling",
    "relationship",
    "AI counselor",
    "marriage",
    "conflict resolution",
    "partners",
    "Worth Fighting For",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // og:image / twitter:image are auto-wired from app/opengraph-image.png
  // and app/twitter-image.png (see README note for the files to add).
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Theme color follows the OS scheme — First Light day vs. night backgrounds.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf8f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1622" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes sets data-theme on <html> client-side.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${marcellus.variable} ${mulish.variable}`}
    >
      <body>
        <AppProviders>{children}</AppProviders>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
