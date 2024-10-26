import { FaCalendarAlt, FaClock, FaTag } from "react-icons/fa";

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
                  <span key={tag}>{`#${tag}`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
