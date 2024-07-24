import { siteMetaData } from "@blog/libs/constant";
import Link from "next/link";

import { getI18n } from "../i18n/server";
import styles from "./Header.module.css";
import { ProfileButton } from "./ProfileButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

export const Header = async () => {
  const t = await getI18n();

  return (
    <header className={styles.header}>
      <Link className={styles.titleContainer} href="/" title={t("nav-title")}>
        <h1>{siteMetaData.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
    </header>
  );
};
