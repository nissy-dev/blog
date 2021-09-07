import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SEO } from "../components/SEO";
import { ArticleListItem } from "../components/ArticleListItem";
import { Pagination } from "../components/Pagination";
import { FrontMatter, getFrontMatters } from "../lib/api";
import { generateIndex } from "../lib/algoria";
import { dateFormat } from "../utils/dateFormat";

type Context = {
  locale: string;
};

type Props = {
  locale: string;
  frontMatters: Array<{ id: string } & FrontMatter>;
} & SSRConfig;

export const getStaticProps = async ({ locale }: Context): Promise<{ props: Props }> => {
  if (process.env.NODE_ENV === "production") {
    await generateIndex();
  }

  const i18nProps = await serverSideTranslations(locale, ["common", "aria-label"]);
  const frontMatters = await getFrontMatters();

  return {
    props: {
      locale,
      frontMatters,
      ...i18nProps,
    },
  };
};

const PER_PAGES = 10;

export default function Home({ locale, frontMatters }: Props) {
  const { t: tcom } = useTranslation("common");
  const title = tcom("post-list-header");
  const description = tcom("blog-top-description");

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
            publishedAt={dateFormat(new Date(frontMatter.date), locale)}
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
