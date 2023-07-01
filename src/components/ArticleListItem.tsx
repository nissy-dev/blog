import Link from "next/link";

import { useTranslation } from "../i18n/client";

import styles from "./ArticleListItem.module.scss";
import { FaTag, FaCalendarAlt, FaClock } from "./Icons";

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
    <article className={styles["article-list"]}>
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
