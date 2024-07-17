"use client";

import { siteMetadata } from "../constant";
import { useTranslation } from "../i18n/client";

import { FaHome } from "./Icons";
import styles from "./ProfileButton.module.css";

export const ProfileButton = () => {
  const { t } = useTranslation();

  return (
    <a
      className={styles.button}
      href={siteMetadata.profileSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={t("nav-profile")}
    >
      <FaHome />
    </a>
  );
};
