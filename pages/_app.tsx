import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { GlobalStyle } from "../styles/global";
import { BaseLayout } from "../layouts/BaseLayout";
import { usePageView } from "../lib/ga";

function App({ Component, pageProps }: AppProps) {
  // PVカウント用コード
  usePageView();
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
        {/* 代替URLの指定 */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        {/* safariでページがピンされたときに表示されるアイコン */}
        <link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" />
      </Head>
      {/* html, body タグへのスタイル定義 */}
      <GlobalStyle />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
