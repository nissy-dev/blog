import { css } from "@emotion/react";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SEO } from "../../components/SEO";
import { FrontMatter, getPostById, getPostIDs } from "../../lib/api";
import { dateFormat } from "../../utils/dateFormat";

type Context = {
  locale: string;
  params: {
    id: string;
  };
};

type Props = {
  locale: string;
  frontMatter: FrontMatter;
  html: string;
} & SSRConfig;

export const getStaticProps = async ({ locale, params }: Context): Promise<{ props: Props }> => {
  const i18nProps = await serverSideTranslations(locale, ["common", "aria-label"]);
  const { frontMatter, html } = await getPostById(params.id);

  return {
    props: {
      locale,
      frontMatter,
      html,
      ...i18nProps,
    },
  };
};

export async function getStaticPaths() {
  const postIds = getPostIDs();

  return {
    paths: postIds.map((postId) => {
      return {
        params: {
          id: postId,
        },
      };
    }),
    fallback: false,
  };
}

export default function Post({ locale, frontMatter, html }: Props) {
  const { description, title, date, timeToRead, excerpt } = frontMatter;
  return (
    <>
      <SEO title={title} metaDescription={description || excerpt} />
      <div css={headerStyle}>
        <h1>{title}</h1>
        <span>
          {dateFormat(new Date(date), locale)} ・ {`${timeToRead} min read`}
        </span>
      </div>
      <div css={postStyle} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

const headerStyle = css`
  margin-top: 1.5rem;
  text-align: center;
  color: var(--base);
  border-bottom: 1px solid var(--base);
  margin-bottom: 2rem;

  > h1 {
    font-size: 1.75rem;
    font-weight: var(--font-bold);
    word-break: break-word;
    word-wrap: break-word;
  }

  > span {
    font-size: 0.75rem;
  }
`;

const postStyle = css`
  h2,
  h3,
  h4 {
    font-weight: var(--font-bold);
    word-break: break-word;
    word-wrap: break-word;
  }

  > h2 {
    font-size: 1.5rem;
    margin-top: 3rem;
    border-bottom: 2px solid var(--light-gray);
  }

  > h3 {
    font-size: 1.25rem;
    margin-top: 1rem;
  }

  > h4 {
    font-size: 1rem;
    margin-top: 1rem;
  }

  blockquote {
    margin: 1rem 0;
    padding: 0 1rem;
    border-left: 0.25rem solid var(--light-gray);
    color: var(--gray);
  }

  p {
    margin-top: 1.25rem;
  }

  ol,
  ul {
    padding-left: 1.75rem;
    line-height: 1.25;
    list-style-type: disc;
    margin-top: 1.25rem;
  }

  li {
    margin: 0.5rem 0;
    word-wrap: break-all;
  }

  ul ul {
    list-style-type: circle;
    margin-top: 0rem;
  }

  ul ul ul {
    list-style-type: square;
    margin-top: 0rem;
  }

  a {
    color: var(--light-blue);
  }

  strong {
    font-weight: var(--font-bold);
  }

  .remark-highlight {
    margin-top: 1rem;
  }

  > :not(.remark-highlight) {
    code {
      padding: 0.2em 0.4em;
      background: var(--light-gray);
      font-size: 0.85em;
      border-radius: 4px;
      font-family: var(--font-code);
    }
  }
`;
