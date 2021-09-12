import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolink from "remark-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import { SEO } from "components/SEO";
import { FrontMatter, getPostById, getPostIDs } from "lib/api";
import { Toc } from "components/Toc";
import { PostHeader } from "components/PostHeader";
import { dateFormat } from "utils/dateFormat";

type Context = {
  params: {
    id: string;
  };
};

type Props = {
  frontMatter: FrontMatter;
  tocHtml: string;
  content: string;
};

export const getStaticProps = async ({ params }: Context): Promise<{ props: Props }> => {
  const { frontMatter, tocHtml, content } = await getPostById(params.id);

  return {
    props: {
      frontMatter,
      tocHtml,
      content,
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

export default function Post({ frontMatter, tocHtml, content }: Props) {
  const { i18n } = useTranslation();
  const { tags, description, title, date, timeToRead, excerpt } = frontMatter;

  return (
    <>
      <SEO title={title} metaDescription={description || excerpt} />
      <aside css={asideStyle}>
        <Toc tocHtml={tocHtml} />
      </aside>
      <main css={mainStyle}>
        <PostHeader
          tags={tags}
          publishedAt={dateFormat(new Date(date), i18n.language)}
          title={title}
          timeToRead={timeToRead}
        />
        <ReactMarkdown
          css={mdContentStyle}
          className="markdown-body"
          remarkPlugins={[remarkGfm, remarkSlug, remarkAutolink]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: (props) => {
              return (
                <a href={props.href} target="_blank" rel="noopener noreferrer">
                  {props.children}
                </a>
              );
            },
            img: (props) => {
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={props.src} alt={props.alt} loading="lazy" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </main>
    </>
  );
}

const asideStyle = css`
  position: fixed;
  top: 90px;
  left: calc(50% + var(--max-width) / 2 + 1rem);
`;

const mainStyle = css`
  padding: 2rem 0;
`;

const mdContentStyle = css`
  padding: 2rem 0;
  color: var(--foreground);

  h2 {
    border-bottom: 1px solid var(--gray-300);
  }

  pre {
    /* TODO: backgroundのカラーがおかしい... */
    background: #2e3440;
    border-radius: 0.25rem;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
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

  img {
    display: block;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
`;
