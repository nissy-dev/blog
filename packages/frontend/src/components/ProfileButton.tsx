"use client";

import { siteMetaData } from "@blog/libs/constant";

import { useTranslation } from "../i18n/client";
import { FaHome } from "./Icons";

import styles from "./ProfileButton.module.css";

export const ProfileButton = () => {
  const { t } = useTranslation();

  return (
    <a
      className={styles.button}
      href={siteMetaData.profileSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={t("nav-profile")}
    >
      <FaHome />
    </a>
  );
};
