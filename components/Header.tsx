import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { ThemeSwitchButton } from "./ThemeSwitchButton";
import { SearchButton } from "./SearchButton";
import { Link } from "./Link";
import { MobileNav } from "./MobileNav";
import { siteMetadata } from "../utils/const";

const headerNavLinks = [
  { href: "/", title: "Posts", ariaLabelKey: "nav-posts" },
  { href: "/notes", title: "Notes", ariaLabelKey: "nav-posts" },
  { href: "/about", title: "About", ariaLabelKey: "nav-about" },
];

type Props = {
  showSearchBox: boolean;
  handleSearchBox: () => void;
};

export const Header = (props: Props) => {
  const { showSearchBox } = props;
  const { t } = useTranslation();

  return (
    <header css={headerStyle}>
      <Link css={titleContainerStyle} href="/" aria-label={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <nav css={navContainerStyle}>
        {headerNavLinks.map((link) => (
          <Link key={link.title} href={link.href} aria-label={t(link.ariaLabelKey)}>
            {link.title}
          </Link>
        ))}
      </nav>
      <SearchButton showSearchBox={showSearchBox} onClick={props.handleSearchBox} />
      <ThemeSwitchButton />
      <MobileNav headerNavLinks={headerNavLinks} />
    </header>
  );
};

const headerStyle = css`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.25rem;
`;

const titleContainerStyle = css`
  display: flex;
  margin-right: auto;
  font-size: 1.75rem;
  font-weight: var(--font-bold);
  color: var(--base);

  :hover {
    text-decoration: none;
  }
`;

const navContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 14rem;
  padding-right: 0.5rem;
  font-size: 1.25rem;
  font-weight: var(--font-bold);
  color: var(--base);

  @media screen and (max-width: 640px) {
    display: none;
  }
`;
