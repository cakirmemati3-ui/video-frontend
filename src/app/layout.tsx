import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Video Downloader Pro - Instagram, TikTok, YouTube",
  description: "Instagram, TikTok ve YouTube videolarını kolayca indirin. Watermark-free TikTok downloads, yüksek kalite, hızlı ve ücretsiz.",
  keywords: ["video downloader", "instagram downloader", "tiktok downloader", "youtube downloader", "video indirici", "watermark-free"],
  authors: [{ name: "Elite Full-Stack Developer" }],
  openGraph: {
    title: "Video Downloader Pro",
    description: "Instagram, TikTok, YouTube videolarını saniyeler içinde indir",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
