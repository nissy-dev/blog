import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { BaseLayout } from "../components/BaseLayout";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { GlobalStyle } from "../styles/global";
import { GA_ID } from "../utils/const";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // PVカウント用コード
  const router = useRouter();
  useEffect(() => {
    if (GA_ID === "") {
      return;
    }

    const handleRouteChange = (path: string) => {
      window.gtag("config", GA_ID, { page_path: path });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <Head>
        {/* 文字コードの指定 */}
        <meta charSet="utf-8" />
        {/* viewportの指定 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Chrome for Androidのタブの色指定 */}
        <meta name="theme-color" content="#ffffff" />
        {/* 電話番号などの自動リンク機能の制御 */}
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        {/* faviconの指定 */}
        <link rel="icon" href="/images/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/icon-32x32.png" />
        {/* タッチアイコンの指定 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
        {/* web app manifestの指定 */}
        <link rel="manifest" href="/site.webmanifest" />
        {/* safariでページがピンされたときに表示されるアイコン */}
        <link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" />
      </Head>
      {/* html, body タグへのスタイル定義 */}
      <GlobalStyle />
      {/* Google Analytics */}
      <GoogleAnalytics />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}
