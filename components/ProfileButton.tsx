import { css } from "@emotion/react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { siteMetadata } from "utils/const";

export const ProfileButton = () => {
  const { t } = useTranslation();

  return (
    <a
      css={buttonStyle}
      href={siteMetadata.profileSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav-profile")}
    >
      <FontAwesomeIcon icon={faHome} />
    </a>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  color: var(--foreground);
`;
