"use client";

import { dateFormat } from "../functions/dateFormat";
import { usePagination } from "../hooks/usePagination";
import { useTranslation } from "../i18n/client";
import { FrontMatter } from "../lib/api";

import { ArticleListItem } from "./ArticleListItem";
import styles from "./Home.module.scss";
import { Pagination } from "./Pagination";

type Props = {
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export function Home({ frontMatters }: Props) {
  const { t, locale } = useTranslation();
  const { pathname, currentPage, totalPages, currentFrontMatters } = usePagination(frontMatters);
  const title = t("post-list-header");

  return (
    <main className={styles.main}>
      <h1>{title}</h1>
      {currentFrontMatters.map((frontMatter) => {
        const { dateDisplayString, dateISOString } = dateFormat(new Date(frontMatter.date), locale);
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
      <Pagination pathName={pathname} currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
