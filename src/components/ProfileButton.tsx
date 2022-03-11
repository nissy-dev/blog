import { css } from "@emotion/react";

import { siteMetadata } from "../utils/const";
import { useTranslation } from "../utils/useTranslation";

import { FaHome } from "./icons";

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
      <FaHome />
    </a>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  color: var(--foreground);
`;
