import { FaList } from "react-icons/fa";

import { getTranslation } from "../../../../i18n";

import styles from "./Toc.module.css";

type Props = {
  tocHtml: string;
};

export const Toc = async ({ tocHtml }: Props) => {
  const { t } = await getTranslation();
  return (
    <div className={styles.toc}>
      <div>
        <FaList />
        <span id="toc-title">{t("table-of-contents")}</span>
      </div>
      <nav
        aria-labelledby="toc-title"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成される内容なので問題ない
        dangerouslySetInnerHTML={{ __html: tocHtml }}
      />
    </div>
  );
};
