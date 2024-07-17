import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import type React from "react";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { siteMetadata } from "../../constant";
import { I18nProvider } from "../../i18n/client";
import { RESOURCES, isSupportLocale } from "../../i18n/resources";

import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  authors: { name: siteMetadata.author, url: siteMetadata.profileSiteUrl },
  alternates: { canonical: siteMetadata.siteUrl },
  icons: {
    icon: "/images/icons/icon-16x16.png",
    apple: "/images/icons/apple-touch-icon.png",
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: "/images/ogps/icon-320x320.png",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: `@${siteMetadata.twitter}`,
    creator: `@${siteMetadata.twitter}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isSupportLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  const resource = await RESOURCES[locale]();
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body>
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
