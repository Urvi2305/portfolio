import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://urvi-solanki.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Urvi Solanki, Senior Backend Engineer",
  description:
    "Senior Backend Engineer building payment orchestration, event-driven pipelines, and real-time infrastructure with Python, Node.js, Kafka, and Postgres.",
  openGraph: {
    title: "Urvi Solanki, Senior Backend Engineer",
    description:
      "Payment orchestration, event-driven pipelines, and real-time infrastructure 5+ years building backend systems that move money and data reliably.",
    url: siteUrl,
    siteName: "Urvi Solanki",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urvi Solanki, Senior Backend Engineer",
    description:
      "Payment orchestration, event-driven pipelines, and real-time infrastructure 5+ years building backend systems that move money and data reliably.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-ink">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
