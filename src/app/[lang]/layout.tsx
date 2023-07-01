import { Metadata } from "next";

import { Footer } from "../../components/Footer";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import { Header } from "../../components/Header";
import { siteMetadata } from "../../const";

import { Providers } from "./providers";

import "./global.scss";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  authors: { name: siteMetadata.author, url: siteMetadata.profileSiteUrl },
  themeColor: "#ffffff",
  viewport: "width=device-width, initial-scale=1",
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <GoogleAnalytics />
      <body>
        <Providers lang={params.lang}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
