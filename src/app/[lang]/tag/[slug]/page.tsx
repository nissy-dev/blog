import { Metadata } from "next";

import { Tag } from "../../../../components/Tag";
import { Locale, supportLocales } from "../../../../i18n/resources";
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
    return supportLocales.map((locale) => ({ slug: tag, lang: locale }));
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
  return <Tag slug={params.slug} frontMatters={frontMatters} />;
}
