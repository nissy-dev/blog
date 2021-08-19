import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { ThemeSwitch } from "./ThemeSwitch";
import { Link } from "./Link";
import { MobileNav } from "./MobileNav";
import { siteMetadata } from "../utils/const";

const headerNavLinks = [
  { href: "/", title: "Posts", ariaLabelKey: "nav-posts" },
  { href: "/notes", title: "Notes", ariaLabelKey: "nav-posts" },
  { href: "/about", title: "About", ariaLabelKey: "nav-about" },
];

export const Header = () => {
  const { t: taria } = useTranslation("aria-label");

  return (
    <header css={headerStyle}>
      <Link css={titleContainerStyle} href="/" aria-label={taria("nav-title")}>
        <h1>{siteMetadata.headerTitle}</h1>
      </Link>
      <nav css={navContainerStyle}>
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            css={linkStyle}
            aria-label={taria(link.ariaLabelKey)}
          >
            {link.title}
          </Link>
        ))}
      </nav>
      <ThemeSwitch />
      <MobileNav headerNavLinks={headerNavLinks} />
    </header>
  );
};

const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 1rem 0rem;
`;

const titleContainerStyle = css`
  display: flex;
  margin-right: auto;
  font-size: 1.75rem;
  font-weight: var(--font-bold);
  color: var(--base);
`;

const navContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 13rem;
  padding-right: 1rem;
  font-weight: var(--font-bold);
  color: var(--base);

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const linkStyle = css`
  :hover {
    border-bottom: 1px solid var(--base);
  }
`;
