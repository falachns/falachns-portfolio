import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://falachns.web.id"),
  title: "Falachns, Product Designer",
  description: "Building products into usable digital experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://framerusercontent.com" />
        <meta name="theme-color" content="#FDFCFA" />
      </head>
      <body>{children}</body>
    </html>
  );
}
