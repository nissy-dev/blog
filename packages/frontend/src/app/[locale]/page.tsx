import { getFrontMatters } from "@blog/libs/repositories";
import type { Metadata } from "next";

import { ArticleListItem } from "../../components/ArticleListItem";
import { CONTENTS_DIR } from "../../constant";
import { type Locale, SUPPORTED_LOCALES } from "../../i18n/resources";
import { getTranslation, setStaticParamsLocale } from "../../i18n/server";
import { dateFormat } from "./_functions/dateFormat";

import styles from "./page.module.css";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation();
  return {
    title: t("post-list-header"),
    description: t("top-page-description"),
  };
}

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Page({ params }: Props) {
  const { locale } = params;
  setStaticParamsLocale(locale);
  const { t } = await getTranslation();
  const frontMatters = await getFrontMatters(CONTENTS_DIR);

  return (
    <main className={styles.main}>
      <h2>{t("post-list-header")}</h2>
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
