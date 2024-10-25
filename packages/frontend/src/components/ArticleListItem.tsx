import Link from "next/link";
import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

import styles from "./ArticleListItem.module.css";

type Props = {
  tags: Array<string>;
  title: string;
  link: string;
  publishedAt: string;
  publishedAtISOString: string;
  timeToRead: number;
  excerpt: string;
};

export const ArticleListItem = async ({
  tags,
  title,
  link,
  publishedAt,
  publishedAtISOString,
  timeToRead,
  excerpt,
}: Props) => {
  return (
    <article className={styles.articleList}>
      <header>
        <h3>
          <Link href={link} title={title}>
            {title}
          </Link>
        </h3>
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
                    <span key={tag}>{`#${tag}`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      <p
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成される内容なので問題ない
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </article>
  );
};
