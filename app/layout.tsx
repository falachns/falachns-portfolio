import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import AskFalachDrawerWrapper from "@/components/AskFalachDrawerWrapper";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-manrope",
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
    default: "Falach Noor Syahid — Product Designer",
    template: "%s | Falach Noor Syahid",
  },
  description:
    "Product Designer building digital products into usable, meaningful experiences. Currently designing for the Indonesian railway ecosystem at PT KAI (Persero).",
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
    "Accessibility",
  ],
  authors: [{ name: "Falach Noor Syahid", url: "https://falachns.web.id" }],
  creator: "@falachns",
  publisher: "Falach Noor Syahid",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "https://falachns.web.id",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://falachns.web.id",
    title: "Falach Noor Syahid — Product Designer",
    description:
      "Product Designer building digital products into usable, meaningful experiences. Currently designing for the Indonesian railway ecosystem at PT KAI (Persero).",
    siteName: "Falach Noor Syahid",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falach Noor Syahid Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Falach Noor Syahid — Product Designer",
    description:
      "Product Designer building digital products into usable, meaningful experiences. Currently designing for the Indonesian railway ecosystem at PT KAI (Persero).",
    images: ["/og-image.png"],
    creator: "@falachns",
    site: "@falachns",
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
      className={manrope.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://framerusercontent.com" />
        <link rel="dns-prefetch" href="https://framerusercontent.com" />
        <link
          rel="preload"
          as="image"
          href="https://framerusercontent.com/images/7yUAmetmI8toA1NRXVLoFyq7O24.png?scale-down-to=1024"
          {...{ fetchPriority: "high" }}
          type="image/webp"
        />
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
        <AskFalachDrawerWrapper />
      </body>
    </html>
  );
}
