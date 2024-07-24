import { siteMetaData } from "@blog/libs/constant";
import { FaHome } from "react-icons/fa";

import { getTranslation } from "../i18n/server";

import styles from "./ProfileButton.module.css";

export const ProfileButton = async () => {
  const { t } = await getTranslation();

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
