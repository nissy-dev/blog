import { css } from "@emotion/react";
import Link from "next/link";

import { useTranslation } from "src/utils/useTranslation";

import { FaTag, FaCalendarAlt, FaClock } from "./Icons";

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
    <div css={postHeaderStyle}>
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

const postHeaderStyle = css`
  color: var(--base);
  border-bottom: 1px solid var(--base);

  > h1 {
    font-size: 1.75rem;
    font-weight: var(--font-bold);
    text-align: center;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 0.5rem;

    div {
      display: flex;
      align-items: center;
      padding-top: 0.5rem;
      padding-right: 0.5rem;
      font-size: 1rem;

      > svg {
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
      }

      > ul {
        display: flex;

        > li {
          padding-right: 0.5rem;
        }
      }
    }
  }
`;
