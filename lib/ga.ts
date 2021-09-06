import { useEffect } from "react";
import { useRouter } from "next/router";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const existsGaId = GA_ID !== "";

// PVを測定する
const pageview = (path: string) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

export function usePageView() {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
}
