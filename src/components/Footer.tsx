"use client";

import { siteMetadata } from "../const";
import { useTranslation } from "../i18n/client";

import styles from "./Footer.module.scss";
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
    <footer className={styles.footer}>
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
