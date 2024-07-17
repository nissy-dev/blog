import Link from "next/link";

import { getTranslation } from "../i18n/server";
import { FaCalendarAlt, FaClock, FaTag } from "./Icons";

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
  const { t } = await getTranslation();
  return (
    <article className={styles.articleList}>
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
                    <Link
                      key={tag}
                      href={encodeURI(`/tag/${tag}`)}
                      title={`${t("tags")}: #${tag}`}
                    >
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成される内容なので問題ない
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </article>
  );
};
