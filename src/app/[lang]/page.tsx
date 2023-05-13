import { Metadata } from "next";

import { Home } from "../../components/Home";
import { Locale, supportLocales } from "../../i18n/resources";
import { getTranslation } from "../../i18n/server";
import { getFrontMatters } from "../../lib/api";

type Props = {
  params: {
    lang: Locale;
  };
};

export async function generateStaticParams() {
  return supportLocales.map((locale) => ({ lang: locale }));
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
  return <Home frontMatters={frontMatters} />;
}
