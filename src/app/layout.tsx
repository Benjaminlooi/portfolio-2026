import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";

import Providers from "@/components/providers";
import AnimatedBackground from "@/components/animated/animated-background";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildWebSiteSchema } from "@/lib/seo/structured-data";
import { DEFAULT_METADATA, DEFAULT_OG_IMAGE } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.benjaminlooi.dev"),
  title: {
    default: DEFAULT_METADATA.title,
    template: `%s - Benjamin Looi`,
  },
  description: DEFAULT_METADATA.description,
  keywords: DEFAULT_METADATA.keywords,
  authors: [{ name: "Benjamin Looi", url: "https://www.benjaminlooi.dev" }],
  creator: "Benjamin Looi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.benjaminlooi.dev",
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    siteName: "Benjamin Looi Portfolio",
    images: [
      {
        url: `https://www.benjaminlooi.dev${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Benjamin Looi - Software Engineer & 10x Vibe Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
    creator: "@benjaminlooi",
    images: [`https://www.benjaminlooi.dev${DEFAULT_OG_IMAGE}`],
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
  other: {
    "google-site-verification": process.env
      .NEXT_PUBLIC_GOOGLE_VERIFICATION_ID as string,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Build WebSite schema for the root layout
  const websiteSchema = buildWebSiteSchema({
    name: "Benjamin Looi Portfolio",
    description: DEFAULT_METADATA.description,
    url: "https://www.benjaminlooi.dev",
  });

  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${poppins.className} antialiased`}>
        {/* Structured Data for entire site */}
        <StructuredData schema={websiteSchema} />

        <Providers>
          {children}
          <AnimatedBackground />
        </Providers>
      </body>
    </html>
  );
}
