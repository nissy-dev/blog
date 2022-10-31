import { css } from "@emotion/react";
import Link from "next/link";

import { useTranslation } from "src/utils/useTranslation";

type Props = {
  pathName: string;
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ pathName, currentPage, totalPages }: Props) => {
  const { t } = useTranslation();
  return (
    <div css={paginationStyle}>
      <Link
        css={currentPage <= 1 && hiddenStyle}
        href={{
          pathname: pathName,
          query: { page: encodeURIComponent(currentPage - 1) },
        }}
        title={t("go-to-previous-page")}
      >
        ←
      </Link>
      <span>{`${currentPage} / ${totalPages}`}</span>
      <Link
        css={currentPage >= totalPages && hiddenStyle}
        href={{
          pathname: pathName,
          query: { page: encodeURIComponent(currentPage + 1) },
        }}
        title={t("go-to-next-page")}
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

  > span:nth-of-type(1) {
    padding: 0 1rem;
  }
`;

const hiddenStyle = css`
  visibility: hidden;
`;
