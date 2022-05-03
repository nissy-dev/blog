import Script from "next/script";

import { GA_ID } from "../utils/const";

export const GoogleAnalytics = () => (
  <>
    {GA_ID !== "" && (
      <>
        <Script strategy="worker" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <Script type="text/partytown" id="ga">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
            });
          `}
        </Script>
      </>
    )}
  </>
);
