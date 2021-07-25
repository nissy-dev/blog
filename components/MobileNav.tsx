import { useState } from "react";
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "./Link";

type Props = {
  headerNavLinks: Array<{ href: string; title: string; ariaLabelKey: string }>;
};

export const MobileNav = ({ headerNavLinks }: Props) => {
  const { t: taria } = useTranslation("aria-label");
  const { t: tcom } = useTranslation("common");

  const [navShow, setNavShow] = useState(false);
  const onToggleNav = () => setNavShow((status) => !status);

  return (
    <div css={mobileNavStyle}>
      <button
        type="button"
        onClick={onToggleNav}
        css={buttonStyle}
        title={tcom("toggle-menu")}
        aria-label={navShow ? taria("close-mobile-nav") : taria("open-mobile-nav")}
      >
        {navShow ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      <nav css={mobileNavContainerStyle(navShow)}>
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            css={navLinkStyle}
            onClick={onToggleNav}
            aria-label={taria(link.ariaLabelKey)}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const mobileNavStyle = css`
  display: none;
  padding-left: 1rem;

  @media screen and (max-width: 640px) {
    display: block;
  }
`;

const buttonStyle = css`
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
`;

// TODO: 上から下に表示されるようなアニメーションを入れたい
const mobileNavContainerStyle = (navShow: boolean) => css`
  position: fixed;
  top: 4.5rem;
  left: 0;
  display: ${navShow ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  opacity: 0.95;
  font-size: 1.25rem;
  font-weight: var(--fontWeight-bold);
`;

const navLinkStyle = css`
  padding: 0.75rem 0.75rem 0.25rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid var(--black);
`;
