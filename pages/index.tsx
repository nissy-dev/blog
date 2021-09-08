import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/SEO";
import { ArticleListItem } from "../components/ArticleListItem";
import { Pagination } from "../components/Pagination";
import { FrontMatter, getFrontMatters } from "../lib/api";
import { generateIndex } from "../lib/algoria";
import { dateFormat } from "../utils/dateFormat";

type Props = {
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  if (process.env.NODE_ENV === "production") {
    await generateIndex();
  }

  const frontMatters = await getFrontMatters();

  return {
    props: {
      frontMatters,
    },
  };
};

const PER_PAGES = 10;

export default function Home({ frontMatters }: Props) {
  const { t, i18n } = useTranslation();
  const title = t("post-list-header");
  const description = t("blog-top-description");

  // pagination
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const queryParams = searchParams.get("page");
  const currentPage = queryParams === null ? 1 : parseInt(queryParams, 10);
  const totalPages = Math.ceil(frontMatters.length / PER_PAGES);
  const start = (currentPage - 1) * PER_PAGES;
  const currentFrontMatters = frontMatters.slice(start, start + PER_PAGES);

  return (
    <main css={mainStyle}>
      <SEO title={title} metaDescription={description} />
      <div css={headerStyle}>
        <h1>{title}</h1>
      </div>
      {currentFrontMatters.map((frontMatter) => {
        return (
          <ArticleListItem
            key={frontMatter.id}
            title={frontMatter.title}
            link={`/post/${encodeURIComponent(frontMatter.id)}`}
            publishedAt={dateFormat(new Date(frontMatter.date), i18n.language)}
            timeToRead={frontMatter.timeToRead}
            excerpt={frontMatter.excerpt}
          />
        );
      })}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

const mainStyle = css`
  padding: 2rem 0;
`;

const headerStyle = css`
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--base);
  text-align: center;
`;
