import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { Link } from "./Link";

type Props = {
  title: string;
  link: string;
  publishedAt: string;
  timeToRead: number;
  excerpt: string;
};

export const ArticleListItem = ({ title, link, publishedAt, timeToRead, excerpt }: Props) => {
  const { t: tcom } = useTranslation("common");
  return (
    <article css={articleStyle} itemScope itemType="http://schema.org/Article">
      <header>
        <h2>
          <Link href={link} itemProp="url">
            <span itemProp="headline">{title}</span>
          </Link>
        </h2>
        <small>
          {publishedAt} ・ {`${timeToRead} min read`}
        </small>
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
          <span>{`${tcom("read-more")} →`}</span>
        </Link>
      </nav>
    </article>
  );
};

const articleStyle = css`
  margin: 1rem 0rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  box-shadow: 0 0.125rem 0.25rem var(--light-gray);

  > header {
    padding-bottom: 0.75rem;

    > h2 {
      font-size: 1.25rem;
      font-weight: var(--font-bold);
      color: var(--base);
    }

    > small {
      font-size: 0.75rem;
    }
  }

  > section {
    font-size: 0.9rem;
  }

  > nav {
    padding-top: 0.5rem;
    font-size: 0.9rem;
    text-align: left;
    color: var(--gray);
    text-decoration: underline;
  }

  @media screen and (max-width: 640px) {
    > nav {
      text-align: right;
    }
  }
`;
