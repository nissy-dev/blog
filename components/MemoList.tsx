import { css } from "@emotion/react";

import { Link } from "components/Link";
import { FrontMatter } from "../lib/api";

type Props = {
  title: string;
  frontMatters: Array<{ id: string } & FrontMatter>;
};

export const MemoList = ({ title, frontMatters }: Props) => {
  return (
    <div css={memoListStyle}>
      <h2>{title}</h2>
      <ul>
        {frontMatters.map((frontMatter) => {
          return (
            <li key={frontMatter.title}>
              <Link href={`/post/${encodeURIComponent(frontMatter.id)}`}>{frontMatter.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const memoListStyle = css`
  width: 50%;
  padding-bottom: 3rem;

  > h2 {
    text-align: center;
    padding: 0.5rem 0;
    font-size: 1.25rem;
    margin: 0 2rem 1rem 2rem;
    border-bottom: 1px solid var(--gray);
  }

  > ul {
    padding-left: 4rem;
    list-style-type: disc;

    > li {
      padding: 0.25rem 0;

      > a {
        color: var(--light-blue);
      }
    }
  }

  @media screen and (max-width: 640px) {
    width: 90vh;
  }
`;
