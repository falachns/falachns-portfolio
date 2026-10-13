import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import AskFalachDrawer from "@/components/AskFalachDrawer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://falachns.web.id"),
  title: {
    default: "Falachns — Product Designer",
    template: "%s | Falachns — Product Designer",
  },
  description:
    "Product Designer building software into usable, meaningful digital experiences. Currently designing railway platform ecosystems at PT KAI (Persero).",
  keywords: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "Falach Noor Syahid",
    "Falachns",
    "Design System",
    "SaaS Design",
    "Qiscus",
    "KAI",
    "Portfolio",
  ],
  authors: [{ name: "Falach Noor Syahid", url: "https://falachns.web.id" }],
  creator: "Falach Noor Syahid",
  publisher: "Falach Noor Syahid",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://falachns.web.id",
    title: "Falachns — Product Designer",
    description:
      "Product Designer building software into usable, meaningful digital experiences. Currently designing railway platform ecosystems at PT KAI (Persero).",
    siteName: "Falachns Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falachns — Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Falachns — Product Designer",
    description:
      "Product Designer building software into usable, meaningful digital experiences. Currently designing railway platform ecosystems at PT KAI (Persero).",
    images: ["/og-image.png"],
    creator: "@falachns",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Falach Noor Syahid",
    alternateName: "Falachns",
    jobTitle: "Product Designer",
    worksFor: {
      "@type": "Organization",
      name: "PT KAI (Persero)",
    },
    url: "https://falachns.web.id",
    sameAs: [
      "https://www.linkedin.com/in/falachnoorsyahid/",
      "https://github.com/falachns",
      "https://falachns.framer.website/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={manrope.className}>
        {children}
        <AskFalachDrawer />
      </body>
    </html>
  );
}
