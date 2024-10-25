import { siteMetaData } from "@blog/libs/constant";
import type { Metadata, Viewport } from "next";
import type React from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ThemeInitScript, ThemeProvider } from "../theme/theme";

import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetaData.siteUrl),
  authors: { name: siteMetaData.author, url: siteMetaData.profileSiteUrl },
  alternates: { canonical: siteMetaData.siteUrl },
  icons: {
    icon: `${siteMetaData.siteUrl}/images/icon-16x16.png`,
    apple: `${siteMetaData.siteUrl}/images/apple-touch-icon.png`,
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: siteMetaData.siteUrl,
    siteName: siteMetaData.title,
    images: [{ url: `${siteMetaData.siteUrl}/images/icon-320x320.png` }],
  },
  twitter: {
    card: "summary",
    site: `@${siteMetaData.twitter}`,
    creator: `@${siteMetaData.twitter}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeInitScript />
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
