import { useState } from "react";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";

import { Link } from "components/Link";
import { ProfileButton } from "components/ProfileButton";
import { SearchButton } from "components/SearchButton";
import { ThemeSwitchButton } from "components/ThemeSwitchButton";
import type { Props as SearchBoxProps } from "components/Search";
import { siteMetadata } from "utils/const";
import { useTranslation } from "utils/useTranslation";

const SearchBoxComponent = dynamic<SearchBoxProps>(() =>
  import("components/Search").then((modules) => modules.Search)
);

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
      <div>{showSearchBox && <SearchBoxComponent handleSearchBox={handleSearchBox} />}</div>
    </header>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 0.25rem;

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: row;
  }

  > div:nth-of-type(2) {
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
