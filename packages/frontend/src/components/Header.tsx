import { siteMetaData } from "@blog/libs/constant";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

import { getTranslation } from "../i18n";
import styles from "./Header.module.css";
import { SearchButton } from "./SearchButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

export const Header = async () => {
  const { t } = await getTranslation();

  return (
    <header className={styles.header}>
      <Link className={styles.titleContainer} href="/" title={t("nav-title")}>
        <h1>{siteMetaData.title}</h1>
      </Link>
      <a
        className={styles.profileButton}
        href={siteMetaData.profileSiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={t("nav-profile")}
      >
        <FaHome />
      </a>
      <ThemeSwitchButton />
      <SearchButton />
    </header>
  );
};
