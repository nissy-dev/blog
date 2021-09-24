import { css } from "@emotion/react";

import { FaEnvelope, FaGithub, FaTwitter } from "components/icons";
import { useTranslation } from "utils/useTranslation";
import { siteMetadata } from "utils/const";

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
      <div>
        {snsLinks.map((link) => (
          <a
            key={link.snsName}
            target="_blank"
            rel="noopener noreferrer"
            href={link.href}
            aria-label={t(link.ariaLabel)}
          >
            {link.icon}
          </a>
        ))}
      </div>
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

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    width: 8rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;

      :hover {
        color: var(--base);
      }
    }
  }
`;
