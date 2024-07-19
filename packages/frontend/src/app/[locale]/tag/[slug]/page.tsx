import { getFrontMatters, getTags } from "@blog/libs";
import type { Metadata } from "next";

import { ArticleListItem } from "../../../../components/ArticleListItem";
import { Pagination } from "../../../../components/Pagination";
import { CONTENTS_DIR } from "../../../../constant";
import { type Locale, SUPPORTED_LOCALES } from "../../../../i18n/resources";
import { getTranslation } from "../../../../i18n/server";
import { dateFormat } from "../../_functions/dateFormat";
import type { SearchParams } from "../../_types/searchParams";

import styles from "./page.module.css";

export async function generateStaticParams() {
  const tags = await getTags(CONTENTS_DIR);
  return tags.flatMap((tag) => {
    return SUPPORTED_LOCALES.map((locale) => ({ slug: tag, locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await getTranslation();
  return {
    title: `${t("tags")} : #${params.slug}`,
    description: `${t("tags")} : #${params.slug}`,
  };
}

type Props = {
  params: {
    locale: Locale;
    slug: string;
  };
  searchParams: SearchParams;
};

const PER_PAGES = 10;

export default async function Page({ params, searchParams }: Props) {
  const { slug } = params;
  const { t } = await getTranslation();
  const frontMatters = await getFrontMatters(slug);

  const { page } = searchParams;
  const currentPage = typeof page !== "string" ? 1 : Number.parseInt(page, 10);
  const totalPages = Math.ceil(frontMatters.length / PER_PAGES);
  const start = (currentPage - 1) * PER_PAGES;
  const currentFrontMatters = frontMatters.slice(start, start + PER_PAGES);

  return (
    <main className={styles.main}>
      <h1>{`${t("tags")} : #${slug}`}</h1>
      {currentFrontMatters.map((frontMatter) => {
        const { dateDisplayString, dateISOString } = dateFormat(
          new Date(frontMatter.date),
          params.locale,
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
      <Pagination
        pathName={`/tag/${slug}`}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
