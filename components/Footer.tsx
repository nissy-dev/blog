import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";

import { siteMetaData } from "../utils/const";

const snsLinks = [
  {
    snsName: "email",
    href: `mailto:${siteMetaData.email}`,
    icon: faEnvelope,
    ariaLabel: "email-link",
  },
  {
    snsName: "github",
    href: siteMetaData.github,
    icon: faGithub,
    ariaLabel: "github-link",
  },
  {
    snsName: "twitter",
    href: siteMetaData.twitter,
    icon: faTwitter,
    ariaLabel: "twitter-link",
  },
];

export const Footer = () => {
  const { t: taria } = useTranslation("aria-label");

  return (
    <footer css={footerStyle}>
      <div css={iconListStyle}>
        {snsLinks.map((link) => (
          <a
            key={link.snsName}
            target="_blank"
            rel="noopener noreferrer"
            href={link.href}
            aria-label={taria(link.ariaLabel)}
          >
            <FontAwesomeIcon icon={link.icon} css={IconStyle} />
          </a>
        ))}
      </div>
      <div>{`© ${new Date().getFullYear()} ${siteMetaData.author}`}</div>
    </footer>
  );
};

const footerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const iconListStyle = css`
  display: flex;
  justify-content: space-between;
  width: 8rem;
`;

// TODO: スマホ版のホバー時の対応
const IconStyle = css`
  width: 1.5rem;
  height: 1.5rem;

  :hover {
    color: var(--light-blue);
  }
`;
