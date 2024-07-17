import Link from "next/link";

import { getTranslation } from "../i18n/server";

import styles from "./Pagination.module.css";

type Props = {
  pathName: string;
  currentPage: number;
  totalPages: number;
};

export const Pagination = async ({
  pathName,
  currentPage,
  totalPages,
}: Props) => {
  const { t } = await getTranslation();
  return (
    <div className={styles.pagination}>
      <Link
        className={currentPage <= 1 ? styles.hidden : undefined}
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
        className={currentPage >= totalPages ? styles.hidden : undefined}
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
