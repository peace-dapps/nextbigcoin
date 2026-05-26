import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nextbigcoin.xyz"),
  title: "$NBC — The Next Big Coin. On Solana.",
  description: "The Next Big Coin is launching June 4th. 75% of creator fees go back to holders via RevShare. Community-first, fair launch, all early.",
  openGraph: {
    title: "$NBC · The Next Big Coin",
    description: "75% of creator fees go to holders. Launching June 4th, 20:00 UTC.",
    images: ["/banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BigCoinNext",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className="grain font-sans antialiased">{children}</body>
    </html>
  );
}
