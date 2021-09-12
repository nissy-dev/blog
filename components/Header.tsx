import { useState } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { Link } from "./Link";
import { ProfileButton } from "./ProfileButton";
import { SearchButton } from "./SearchButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { Search } from "./Search";
import { siteMetadata } from "../utils/const";

export const Header = () => {
  const { t } = useTranslation();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const handleSearchBox = () => setShowSearchBox(!showSearchBox);

  return (
    <header css={headerStyle}>
      <div>
        <Link css={titleContainerStyle} href="/" aria-label={t("nav-title")}>
          <h1>{siteMetadata.title}</h1>
        </Link>
        <ProfileButton />
        <SearchButton showSearchBox={showSearchBox} onClick={handleSearchBox} />
        <ThemeSwitchButton />
      </div>
      <div>{showSearchBox && <Search handleSearchBox={handleSearchBox} />}</div>
    </header>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 0.25rem;

  div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
  }

  div:nth-of-type(2) {
    position: relative;
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
