import Link from "next/link";
import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

import { getI18n } from "../../../../../i18n/server";

import styles from "./PostHeader.module.css";

type Props = {
  tags: Array<string>;
  publishedAt: string;
  publishedAtISOString: string;
  title: string;
  timeToRead: number;
};

export const PostHeader = async ({
  tags,
  publishedAt,
  publishedAtISOString,
  title,
  timeToRead,
}: Props) => {
  const t = await getI18n();
  return (
    <div className={styles.postHeader}>
      <h1>{title}</h1>
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
    </div>
  );
};
