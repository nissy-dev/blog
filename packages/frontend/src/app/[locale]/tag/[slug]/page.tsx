import { getFrontMatters, getTags } from "@blog/libs/repositories";
import type { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

import { ArticleListItem } from "../../../../components/ArticleListItem";
import { Pagination } from "../../../../components/Pagination";
import { CONTENTS_DIR } from "../../../../constant";
import { getI18n, getStaticParams } from "../../../../i18n/server";
import { dateFormat } from "../../_functions/dateFormat";
import type { SearchParams } from "../../_types/searchParams";

import styles from "./page.module.css";

export async function generateStaticParams() {
  const tags = await getTags(CONTENTS_DIR);
  const locales = getStaticParams();
  return tags.flatMap((tag) => {
    return locales.map(({ locale }) => ({ slug: tag, locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getI18n();
  return {
    title: `${t("tags")} : #${params.slug}`,
    description: `${t("tags")} : #${params.slug}`,
  };
}

type Props = {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: SearchParams;
};

const PER_PAGES = 10;

export default async function Page({ params, searchParams }: Props) {
  const { slug, locale } = params;
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const frontMatters = await getFrontMatters(CONTENTS_DIR, slug);

  const { page } = searchParams;
  const currentPage = typeof page !== "string" ? 1 : Number.parseInt(page, 10);
  const totalPages = Math.ceil(frontMatters.length / PER_PAGES);
  const start = (currentPage - 1) * PER_PAGES;
  const currentFrontMatters = frontMatters.slice(start, start + PER_PAGES);

  return (
    <main className={styles.main}>
      <h2>{`${t("tags")} : #${slug}`}</h2>
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
