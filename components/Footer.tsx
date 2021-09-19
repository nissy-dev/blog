import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";

import { useTranslation } from "utils/useTranslation";
import { siteMetadata } from "utils/const";

const snsLinks = [
  {
    snsName: "email",
    href: `mailto:${siteMetadata.email}`,
    icon: faEnvelope,
    ariaLabel: "email-link" as const,
  },
  {
    snsName: "github",
    href: `https://github.com/${siteMetadata.github}`,
    icon: faGithub,
    ariaLabel: "github-link" as const,
  },
  {
    snsName: "twitter",
    href: `https://twitter.com/${siteMetadata.twitter}`,
    icon: faTwitter,
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
            <FontAwesomeIcon icon={link.icon} />
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
