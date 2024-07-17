import Link from "next/link";

import { siteMetadata } from "../constant";
import { getTranslation } from "../i18n/server";
import styles from "./Header.module.css";
import { ProfileButton } from "./ProfileButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

export const Header = async () => {
  const { t } = await getTranslation();

  return (
    <header className={styles.header}>
      <Link className={styles.titleContainer} href="/" title={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
    </header>
  );
};
