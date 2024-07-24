"use client";

import { useState } from "react";
import { FaList } from "react-icons/fa";

import { useI18n } from "../../../../../i18n/client";

import styles from "./MobileToc.module.css";

type Props = {
  tocHtml: string;
};

export const MobileToc = ({ tocHtml }: Props) => {
  const t = useI18n();
  const [showToc, setState] = useState(false);
  return (
    <div className={styles.toc}>
      <div>
        <button
          type="button"
          onClick={() => setState(!showToc)}
          title={!showToc ? t("open-toc") : t("close-toc")}
          aria-controls="mobile-toc"
          aria-expanded={showToc}
        >
          <FaList />
        </button>
        <div>
          <span id="mobile-toc-title">{t("table-of-contents")}</span>
        </div>
      </div>
      <nav
        id="mobile-toc"
        aria-labelledby="mobile-toc-title"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成されるので問題ない
        dangerouslySetInnerHTML={{ __html: showToc ? tocHtml : "" }}
        aria-hidden={!showToc}
      />
    </div>
  );
};
