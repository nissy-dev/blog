import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { ThemeSwitch } from "./ThemeSwitch";
import { Link } from "./Link";
import { MobileNav } from "./MobileNav";
import { siteMetaData } from "../utils/const";

const headerNavLinks = [
  { href: "/blog", title: "Blog", ariaLabelKey: "nav-blog" },
  { href: "/tags", title: "Tags", ariaLabelKey: "nav-tags" },
  { href: "/about", title: "About", ariaLabelKey: "nav-about" },
];

export const Header = () => {
  const { t: taria } = useTranslation("aria-label");

  return (
    <header css={headerStyle}>
      <Link css={titleContainerStyle} href="/" aria-label={taria("nav-title")}>
        <span>{siteMetaData.headerTitle}</span>
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
  height: 4.5rem;

  @media screen and (max-width: 640px) {
    padding-bottom: 0.25rem;
    border-bottom: 2px solid var(--light-gray);
  }
`;

const titleContainerStyle = css`
  display: flex;
  margin-right: auto;
  font-size: 1.5rem;
  font-weight: var(--fontWeight-bold);
`;

const navContainerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 12rem;
  margin-right: 1rem;
  font-weight: var(--fontWeight-bold);

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const linkStyle = css`
  :hover {
    border-bottom: 1px solid #2e353f;
  }
`;
