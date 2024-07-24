"use client";

import { siteMetaData } from "@blog/libs/constant";
import { FaHome } from "react-icons/fa";

import { useTranslation } from "../i18n/client";

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
