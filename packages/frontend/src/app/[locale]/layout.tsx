import { siteMetaData } from "@blog/libs/constant";
import type { Metadata, Viewport } from "next";
import type React from "react";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { I18nProvider } from "../../i18n/client";
import { RESOURCES, isSupportLocale } from "../../i18n/resources";
import { ThemeInitScript, ThemeProvider } from "../../theme/theme";

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
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  if (!isSupportLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  const resource = await RESOURCES[locale]();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeInitScript />
        <ThemeProvider>
          <I18nProvider value={{ locale, resource }}>
            <Header />
            {children}
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
