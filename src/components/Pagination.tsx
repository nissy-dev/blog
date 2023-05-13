"use client";

import Link from "next/link";

import { useTranslation } from "../i18n/client";

import styles from "./Pagination.module.scss";

type Props = {
  pathName: string;
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ pathName, currentPage, totalPages }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.pagination}>
      <Link
        // css={currentPage <= 1 && hiddenStyle}
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
        // css={currentPage >= totalPages && hiddenStyle}
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
