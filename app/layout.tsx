import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Falach — Product Designer",
  description: "Portfolio of Falach, a product designer based in Indonesia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
