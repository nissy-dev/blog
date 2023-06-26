import { Metadata } from "next";
import { Suspense } from "react";

import { Tag } from "../../../../components/Tag";
import { Locale, SUPPORTED_LOCALES } from "../../../../i18n/resources";
import { getTranslation } from "../../../../i18n/server";
import { getFrontMatters, getTags } from "../../../../lib/api";

type Props = {
  params: {
    lang: Locale;
    slug: string;
  };
};

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.flatMap((tag) => {
    return SUPPORTED_LOCALES.map((locale) => ({ slug: tag, lang: locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = getTranslation(params.lang);
  return {
    title: `${t("tags")} : #${params.slug}`,
    description: `${t("tags")} : #${params.slug}`,
  };
}

export default async function Page({ params }: Props) {
  const frontMatters = await getFrontMatters(params.slug);
  return (
    <Suspense fallback={null}>
      <Tag slug={params.slug} frontMatters={frontMatters} />;
    </Suspense>
  );
}
