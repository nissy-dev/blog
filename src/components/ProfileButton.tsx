import { css } from "@emotion/react";

import { siteMetadata } from "../utils/const";
import { useTranslation } from "../utils/useTranslation";

import { FaHome } from "./Icons";

export const ProfileButton = () => {
  const { t } = useTranslation();

  return (
    <a
      css={buttonStyle}
      href={siteMetadata.profileSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={t("nav-profile")}
    >
      <FaHome />
    </a>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  color: var(--foreground);

  > svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;
