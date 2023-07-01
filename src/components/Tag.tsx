"use client";

import { dateFormat } from "../functions/dateFormat";
import { usePagination } from "../hooks/usePagination";
import { useTranslation } from "../i18n/client";
import { FrontMatter } from "../lib/api";

import { ArticleListItem } from "./ArticleListItem";
import { Pagination } from "./Pagination";
import styles from "./Tag.module.scss";

type Props = {
  slug: string;
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export function Tag({ slug, frontMatters }: Props) {
  const { t, locale } = useTranslation();
  const { pathname, currentPage, totalPages, currentFrontMatters } = usePagination(frontMatters);
  const title = `${t("tags")} : #${slug}`;

  return (
    <main className={styles.main}>
      <div>
        <h1>{title}</h1>
      </div>
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
