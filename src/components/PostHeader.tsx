import { css } from "@emotion/react";

import { FaTag, FaCalendarAlt, FaClock } from "./icons";
import { Link } from "./Link";

type Props = {
  tags: Array<string>;
  publishedAt: string;
  title: string;
  timeToRead: number;
};

export const PostHeader = ({ tags, publishedAt, title, timeToRead }: Props) => {
  return (
    <div css={postHeaderStyle}>
      <h1>{title}</h1>
      <div>
        <div>
          <FaCalendarAlt />
          <span>{publishedAt}</span>
        </div>
        <div>
          <FaClock />
          <span>{`${timeToRead} min read`}</span>
        </div>
        <nav>
          <FaTag />
          {tags.map((tag) => {
            return (
              <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                <span>{`#${tag}`}</span>
              </Link>
            );
          })}
        </nav>
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

    nav,
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
    }

    nav > a {
      padding-right: 0.5rem;
    }
  }
`;
