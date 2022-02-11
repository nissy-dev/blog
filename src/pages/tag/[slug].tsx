import { css } from "@emotion/react";

import { ArticleListItem } from "components/ArticleListItem";
import { Pagination } from "components/Pagination";
import { SEO } from "components/SEO";
import { FrontMatter, getFrontMatters, getTags } from "lib/api";
import { dateFormat } from "utils/dateFormat";
import { usePagination } from "utils/usePagination";
import { useTranslation, supportLocales } from "utils/useTranslation";

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
    paths: tags.flatMap((tag) => {
      return supportLocales.map((locale) => {
        return {
          params: {
            slug: tag,
          },
          locale,
        };
      });
    }),
    fallback: false,
  };
}

export default function Tag({ slug, frontMatters }: Props) {
  const { t, locale } = useTranslation();
  const { pathname, currentPage, totalPages, currentFrontMatters } = usePagination(frontMatters);
  const title = `${t("tags")} : #${slug}`;

  return (
    <main css={mainStyle}>
      <SEO title={title} metaDescription={title} />
      <div>
        <h1>{title}</h1>
      </div>
      {currentFrontMatters.map((frontMatter) => {
        return (
          <ArticleListItem
            key={frontMatter.id}
            tags={frontMatter.tags}
            title={frontMatter.title}
            link={`/post/${encodeURIComponent(frontMatter.id)}`}
            publishedAt={dateFormat(new Date(frontMatter.date), locale)}
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

  > div:nth-of-type(1) {
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    color: var(--base);
    text-align: center;
  }
`;
