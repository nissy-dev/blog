"use client";

import { useTranslation } from "../i18n/client";

import { FaList } from "./Icons";
import styles from "./Toc.module.scss";

type Props = {
  tocHtml: string;
};

export const Toc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.toc}>
      <div>
        <FaList />
        <span id="toc-title">{t("table-of-contents")}</span>
      </div>
      <nav aria-labelledby="toc-title" dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </div>
  );
};
