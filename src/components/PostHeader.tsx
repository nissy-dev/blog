import Link from "next/link";

import { useTranslation } from "../i18n/client";

import { FaTag, FaCalendarAlt, FaClock } from "./Icons";
import styles from "./PostHeader.module.scss";

type Props = {
  tags: Array<string>;
  publishedAt: string;
  publishedAtISOString: string;
  title: string;
  timeToRead: number;
};

export const PostHeader = ({
  tags,
  publishedAt,
  publishedAtISOString,
  title,
  timeToRead,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles["post-header"]}>
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
                  <Link key={tag} href={encodeURI(`/tag/${tag}`)} title={`${t("tags")}: #${tag}`}>
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
