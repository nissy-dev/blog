import { getFrontMatters, getTags } from "@blog/libs/repositories";
import type { Metadata } from "next";

import { ArticleListItem } from "../../../../components/ArticleListItem";
import { CONTENTS_DIR } from "../../../../constant";
import { dateFormat } from "../../../../functions/dateFormat";
import { type Locale, SUPPORTED_LOCALES } from "../../../../i18n/resources";
import { getTranslation, setStaticParamsLocale } from "../../../../i18n/server";

import styles from "./page.module.css";

export async function generateStaticParams() {
  const tags = await getTags(CONTENTS_DIR);
  return tags.flatMap((tag) => {
    return SUPPORTED_LOCALES.map((locale) => ({ slug: tag, locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { t } = await getTranslation();
  return {
    title: `${t("tags")} : #${slug}`,
    description: `${t("tags")} : #${slug}`,
  };
}

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  setStaticParamsLocale(locale);
  const { t } = await getTranslation();
  const frontMatters = await getFrontMatters(CONTENTS_DIR, slug);

  return (
    <main className={styles.main}>
      <h2>{`${t("tags")} : #${slug}`}</h2>
      {frontMatters.map((frontMatter) => {
        const { dateDisplayString, dateISOString } = dateFormat(
          new Date(frontMatter.date),
          locale,
        );
        return (
          <ArticleListItem
            key={frontMatter.id}
            tags={frontMatter.tags}
            title={frontMatter.title}
            link={encodeURI(`/post/${frontMatter.id}`)}
            publishedAt={dateDisplayString}
            publishedAtISOString={dateISOString}
            timeToRead={frontMatter.timeToRead}
            excerpt={frontMatter.excerpt}
          />
        );
      })}
    </main>
  );
}
