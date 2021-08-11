import { css } from "@emotion/react";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SEO } from "../../components/SEO";
import { FrontMatter, getPostById, getPostIDs } from "../../lib/api";
import { Toc } from "../../components/Toc";
import { PostHeader } from "../../components/PostHeader";

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
  tocHtml: string;
} & SSRConfig;

export const getStaticProps = async ({ locale, params }: Context): Promise<{ props: Props }> => {
  const i18nProps = await serverSideTranslations(locale, ["common", "aria-label"]);
  const { frontMatter, html, tocHtml } = await getPostById(params.id);

  return {
    props: {
      locale,
      frontMatter,
      html,
      tocHtml,
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

export default function Post({ locale, frontMatter, html, tocHtml }: Props) {
  const { description, title, date, timeToRead, excerpt } = frontMatter;
  return (
    <>
      <SEO title={title} metaDescription={description || excerpt} />
      <aside css={asideStyle}>
        <Toc tocHtml={tocHtml} />
      </aside>
      <main css={mainStyle}>
        <PostHeader locale={locale} title={title} date={date} timeToRead={timeToRead} />
        <div css={postContentStyle} dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    </>
  );
}

const asideStyle = css`
  position: fixed;
  left: calc((100% - 50rem) / 2 + 55rem);
  top: 6rem;
`;

const mainStyle = css`
  padding: 2rem 0;
`;

const postContentStyle = css`
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
