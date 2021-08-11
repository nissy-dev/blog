import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";

import { dateFormat } from "../utils/dateFormat";

type Props = {
  locale: string;
  title: string;
  date: string;
  timeToRead: number;
};

export const PostHeader = ({ locale, title, date, timeToRead }: Props) => {
  return (
    <div css={postHeaderStyle}>
      <h1>{title}</h1>
      <div>
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <time>{dateFormat(new Date(date), locale)}</time>
        </span>
        <span>
          <FontAwesomeIcon icon={faClock} />
          {`${timeToRead} min read`}
        </span>
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
    word-break: break-word;
    word-wrap: break-word;
  }

  > div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding-bottom: 0.5rem;

    > span {
      display: flex;
      padding: 0 0.25rem;
      font-size: 0.75rem;

      > svg {
        width: 0.75rem;
        margin: 0 0.5rem;
      }
    }
  }
`;
