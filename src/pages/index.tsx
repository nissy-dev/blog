import { css } from "@emotion/react";

import { ArticleListItem } from "../components/ArticleListItem";
import { Pagination } from "../components/Pagination";
import { SEO } from "../components/SEO";
import { FrontMatter, getFrontMatters } from "../lib/api";
import { dateFormat } from "../utils/dateFormat";
import { usePagination } from "../utils/usePagination";
import { useTranslation } from "../utils/useTranslation";

type Props = {
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const frontMatters = await getFrontMatters();

  return {
    props: {
      frontMatters,
    },
  };
};

export default function Home({ frontMatters }: Props) {
  const { t, locale } = useTranslation();
  const { pathname, currentPage, totalPages, currentFrontMatters } = usePagination(frontMatters);
  const title = t("post-list-header");
  const description = t("top-page-description");

  return (
    <main css={mainStyle}>
      <SEO title={title} metaDescription={description} />
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

const mainStyle = css`
  padding: 2rem 0;

  > h1 {
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    color: var(--base);
    text-align: center;
  }
`;
