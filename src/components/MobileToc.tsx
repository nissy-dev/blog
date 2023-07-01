import { useState } from "react";

import { useTranslation } from "../i18n/client";

import { FaList } from "./Icons";
import styles from "./MobileToc.module.scss";

type Props = {
  tocHtml: string;
};

export const MobileToc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
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
        dangerouslySetInnerHTML={{ __html: showToc ? tocHtml : "" }}
        aria-hidden={!showToc}
      />
    </div>
  );
};
