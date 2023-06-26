import { Metadata } from "next";
import { Suspense } from "react";

import { Home } from "../../components/Home";
import { Locale, SUPPORTED_LOCALES } from "../../i18n/resources";
import { getTranslation } from "../../i18n/server";
import { getFrontMatters } from "../../lib/api";

type Props = {
  params: {
    lang: Locale;
  };
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = getTranslation(params.lang);
  return {
    title: t("post-list-header"),
    description: t("top-page-description"),
  };
}

export default async function Page() {
  const frontMatters = await getFrontMatters();
  return (
    <Suspense fallback={null}>
      <Home frontMatters={frontMatters} />
    </Suspense>
  );
}
