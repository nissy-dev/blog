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
        <div
          className="markdown-body"
          css={mdContentStyle}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </>
  );
}

const asideStyle = css`
  position: fixed;
  left: calc((100% - 50rem) / 2 + 53rem);
  top: 84px;
`;

const mainStyle = css`
  padding: 2rem 0;
`;

const mdContentStyle = css`
  color: var(--foreground);
  padding: 2rem 0;

  pre {
    border-radius: 0.25rem;
    /* TODO: backgraoundのカラーがおかしい... */
    background: #2e3440;
  }

  ul,
  ol {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  a {
    color: var(--link-color);
  }

  code:not(.hljs) {
    background-color: var(--code-background-color);
  }

  blockquote {
    color: var(--blockquote-color);
    border-left: 0.25em solid var(--blockquote-border-color);
  }
`;
