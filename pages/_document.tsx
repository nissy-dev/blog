import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_ID } from "utils/const";

export default class MyDocument extends Document {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    return (
      <Html lang={locale}>
        <Head>
          {/* Google Analytics */}
          {GA_ID !== "" && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
