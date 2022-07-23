import { css } from "@emotion/react";

import { siteMetadata } from "../utils/const";
import { useTranslation } from "../utils/useTranslation";

import { FaEnvelope, FaGithub, FaTwitter } from "./Icons";

const snsLinks = [
  {
    snsName: "email",
    href: `mailto:${siteMetadata.email}`,
    icon: <FaEnvelope />,
    ariaLabel: "email-link" as const,
  },
  {
    snsName: "github",
    href: `https://github.com/${siteMetadata.github}`,
    icon: <FaGithub />,
    ariaLabel: "github-link" as const,
  },
  {
    snsName: "twitter",
    href: `https://twitter.com/${siteMetadata.twitter}`,
    icon: <FaTwitter />,
    ariaLabel: "twitter-link" as const,
  },
];

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer css={footerStyle}>
      <ul>
        {snsLinks.map((link) => (
          <li key={link.snsName}>
            <a target="_blank" rel="noopener noreferrer" href={link.href} title={t(link.ariaLabel)}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <div>{`© ${new Date().getFullYear()} ${siteMetadata.author}`}</div>
    </footer>
  );
};

const footerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;
  color: var(--foreground);

  > ul {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    width: 8rem;

    > li > a > svg {
      width: 1.5rem;
      height: 1.5rem;

      :hover {
        color: var(--base);
      }
    }
  }
`;
