import { css } from "@emotion/react";
import Link from "next/link";

import { useTranslation } from "../utils/useTranslation";

import { FaTag, FaCalendarAlt, FaClock } from "./Icons";
// import { Link } from "./Link";

type Props = {
  tags: Array<string>;
  title: string;
  link: string;
  publishedAt: string;
  publishedAtISOString: string;
  timeToRead: number;
  excerpt: string;
};

export const ArticleListItem = ({
  tags,
  title,
  link,
  publishedAt,
  publishedAtISOString,
  timeToRead,
  excerpt,
}: Props) => {
  const { t } = useTranslation();
  return (
    <article css={articleListStyle}>
      <header>
        <h2>
          <Link href={link} title={title}>
            {title}
          </Link>
        </h2>
        <div>
          <div>
            <FaCalendarAlt />
            <time dateTime={publishedAtISOString}>{publishedAt}</time>
          </div>
          <div>
            <FaClock />
            <span>{`${timeToRead} min read`}</span>
          </div>
          <div>
            <FaTag />
            <ul>
              {tags.map((tag) => {
                return (
                  <li key={`${title}-${tag}`}>
                    <Link key={tag} href={encodeURI(`/tag/${tag}`)} title={`${t("tags")}: #${tag}`}>
                      {`#${tag}`}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </article>
  );
};

const articleListStyle = css`
  padding: 1rem;
  margin: 1rem 0rem;
  color: var(--foreground);
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem var(--gray-300);

  > header {
    > h2 {
      font-size: 1.25rem;
      font-weight: var(--font-bold);
      color: var(--base);
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 1.25rem;

      > div {
        display: flex;
        align-items: center;
        padding-top: 0.5rem;
        padding-right: 0.5rem;

        > svg {
          width: 1rem;
          height: 1rem;
          margin-right: 0.25rem;
        }

        > ul {
          display: flex;

          > li {
            padding-right: 0.5rem;
          }
        }
      }
    }
  }

  > p {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 1rem;
  }
`;
