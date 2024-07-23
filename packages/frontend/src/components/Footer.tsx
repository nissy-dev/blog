import { siteMetaData } from "@blog/libs/constant";
import { FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";

import { getTranslation } from "../i18n/server";

import styles from "./Footer.module.css";

const snsLinks = [
  {
    snsName: "email",
    href: `mailto:${siteMetaData.email}`,
    icon: <FaEnvelope />,
    ariaLabel: "email-link" as const,
  },
  {
    snsName: "github",
    href: `https://github.com/${siteMetaData.github}`,
    icon: <FaGithub />,
    ariaLabel: "github-link" as const,
  },
  {
    snsName: "twitter",
    href: `https://twitter.com/${siteMetaData.twitter}`,
    icon: <FaTwitter />,
    ariaLabel: "twitter-link" as const,
  },
];

export const Footer = async () => {
  const { t } = await getTranslation();
  return (
    <footer className={styles.footer}>
      <ul>
        {snsLinks.map((link) => (
          <li key={link.snsName}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.href}
              title={t(link.ariaLabel)}
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      <div>{`© ${new Date().getFullYear()} ${siteMetaData.author}`}</div>
    </footer>
  );
};
