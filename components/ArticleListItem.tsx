import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { Link } from "./Link";

type Props = {
  tags: Array<string>;
  title: string;
  link: string;
  publishedAt: string;
  timeToRead: number;
  excerpt: string;
};

export const ArticleListItem = ({ tags, title, link, publishedAt, timeToRead, excerpt }: Props) => {
  const { t } = useTranslation();
  return (
    <article css={articleListStyle} itemScope itemType="http://schema.org/Article">
      <header>
        <h2>
          <Link href={link} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <div>
          <div>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{publishedAt}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} />
            <span>{`${timeToRead} min read`}</span>
          </div>
          <nav>
            <FontAwesomeIcon icon={faTag} />
            {tags.map((tag) => {
              return (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                  <span>{`#${tag}`}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <section>
        <p
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
          itemProp="description"
        />
      </section>
      <nav>
        <Link href={link}>
          <span>{`${t("read-more")} →`}</span>
        </Link>
      </nav>
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
    padding-bottom: 0.75rem;

    > h2 {
      font-size: 1.25rem;
      font-weight: var(--font-bold);
      color: var(--base);
    }

    > div {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 0.5rem;

      nav,
      div {
        display: flex;
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.9rem;

        > svg {
          width: 1rem;
          margin-right: 0.5rem;
        }
      }

      div > span {
        padding-top: 0.1rem;
      }

      nav > a {
        padding-top: 0.1rem;
        padding-right: 0.5rem;
      }
    }
  }

  > section {
    font-size: 0.9rem;
  }

  > nav {
    display: flex;
    flex-direction: row;
    padding-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--foreground);

    > a {
      margin-left: auto;
      text-decoration: underline;
    }
  }
`;
