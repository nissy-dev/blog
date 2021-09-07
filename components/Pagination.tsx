import { css } from "@emotion/react";

import { Link } from "./Link";

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ currentPage, totalPages }: Props) => {
  return (
    <div css={paginationStyle}>
      {currentPage > 1 && (
        <Link
          href={{
            pathname: "/",
            query: { page: encodeURIComponent(currentPage - 1) },
          }}
        >
          ←
        </Link>
      )}
      <div>{`${currentPage} / ${totalPages}`}</div>
      {currentPage < totalPages && (
        <Link
          href={{
            pathname: "/",
            query: { page: encodeURIComponent(currentPage + 1) },
          }}
        >
          →
        </Link>
      )}
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
