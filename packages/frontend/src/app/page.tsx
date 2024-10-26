import { getFrontMatters } from "@blog/libs/repositories";
import type { Metadata } from "next";

import { ArticleListItem } from "../components/ArticleListItem";
import { CONTENTS_DIR } from "../constant";
import { dateFormat } from "../functions/dateFormat";
import { getTranslation } from "../i18n";

import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation();
  return {
    title: t("post-list-header"),
    description: t("top-page-description"),
  };
}

export default async function Page() {
  const { t } = await getTranslation();
  const frontMatters = await getFrontMatters(CONTENTS_DIR);

  return (
    <main className={styles.main}>
      <h2>{t("post-list-header")}</h2>
      {frontMatters.map((frontMatter) => {
        const { dateDisplayString, dateISOString } = dateFormat(
          new Date(frontMatter.date),
          "ja",
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
