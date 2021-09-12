import { css } from "@emotion/react";

import { Link } from "./Link";

type Props = {
  pathName: string;
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ pathName, currentPage, totalPages }: Props) => {
  return (
    <div css={paginationStyle}>
      <Link
        css={currentPage <= 1 && hiddenStyle}
        href={{
          pathname: pathName,
          query: { page: encodeURIComponent(currentPage - 1) },
        }}
      >
        ←
      </Link>
      <div>{`${currentPage} / ${totalPages}`}</div>
      <Link
        css={currentPage >= totalPages && hiddenStyle}
        href={{
          pathname: pathName,
          query: { page: encodeURIComponent(currentPage + 1) },
        }}
      >
        →
      </Link>
    </div>
  );
};

const paginationStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: var(--foreground);

  div:nth-of-type(1) {
    padding: 0 1rem;
  }
`;

const hiddenStyle = css`
  visibility: hidden;
`;
