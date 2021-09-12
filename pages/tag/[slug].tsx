import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { SEO } from "components/SEO";
import { ArticleListItem } from "components/ArticleListItem";
import { Pagination } from "components/Pagination";
import { FrontMatter, getFrontMatters, getTags } from "lib/api";
import { dateFormat } from "utils/dateFormat";
import { usePagination } from "utils/usePagination";

type Context = {
  params: {
    slug: string;
  };
};

type Props = {
  slug: string;
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export const getStaticProps = async ({ params }: Context): Promise<{ props: Props }> => {
  const frontMatters = await getFrontMatters(params.slug);

  return {
    props: {
      slug: params.slug,
      frontMatters,
    },
  };
};

export async function getStaticPaths() {
  const tags = await getTags();

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          slug: tag,
        },
      };
    }),
    fallback: false,
  };
}

export default function Tag({ slug, frontMatters }: Props) {
  const { t, i18n } = useTranslation();
  const { pathname, currentPage, totalPages, currentFrontMatters } = usePagination(frontMatters);
  const title = `${t("tags")} : #${slug}`;

  return (
    <main css={mainStyle}>
      <SEO title={title} metaDescription={title} />
      <div css={headerStyle}>
        <h1>{title}</h1>
      </div>
      {currentFrontMatters.map((frontMatter) => {
        return (
          <ArticleListItem
            key={frontMatter.id}
            tags={frontMatter.tags}
            title={frontMatter.title}
            link={`/post/${encodeURIComponent(frontMatter.id)}`}
            publishedAt={dateFormat(new Date(frontMatter.date), i18n.language)}
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
`;

const headerStyle = css`
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--base);
  text-align: center;
`;