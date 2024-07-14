"use client";

import Link from "next/link";


import { useTranslation } from "../i18n/client";

import styles from "./Header.module.scss";
import { ProfileButton } from "./ProfileButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { siteMetadata } from "src/const";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link className={styles["title-container"]} href="/" title={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
    </header>
  );
};
