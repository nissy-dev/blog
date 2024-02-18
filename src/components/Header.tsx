import { css } from "@emotion/react";
import Link from "next/link";

import { siteMetadata } from "../utils/const";
import { useTranslation } from "../utils/useTranslation";

import { ProfileButton } from "./ProfileButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header css={headerStyle}>
      <Link css={titleContainerStyle} href="/" title={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
    </header>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 0.25rem;

  > button:nth-of-type(2) {
    margin-left: 0;
  }
`;

const titleContainerStyle = css`
  margin-right: auto;
  font-size: 1.75rem;
  font-weight: var(--font-bold);
  color: var(--base);

  :hover {
    text-decoration: none;
  }
`;
