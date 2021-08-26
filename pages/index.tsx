import { css } from "@emotion/react";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SEO } from "../components/SEO";
import { ArticleListItem } from "components/ArticleListItem";
import { FrontMatter, getFrontMatters } from "../lib/api";
import { siteMetadata } from "../utils/const";
import { dateFormat } from "../utils/dateFormat";

type Context = {
  locale: string;
};

type Props = {
  locale: string;
  frontMatters: Array<{ id: string } & FrontMatter>;
} & SSRConfig;

export const getStaticProps = async ({ locale }: Context): Promise<{ props: Props }> => {
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

export default function Home({ locale, frontMatters }: Props) {
  const { t: tcom } = useTranslation("common");
  const title = tcom("post-list-header");
  const description = tcom("blog-top-description");
  return (
    <main css={mainStyle}>
      <SEO title={title} metaDescription={description} />
      <div css={headerStyle}>
        <h1>{title}</h1>
      </div>
      {frontMatters.map((frontMatter) => {
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
