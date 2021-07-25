import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";

import { SNSIcon } from "./SNSIcon";
import { siteMetaData } from "../utils/const";

export const Footer = () => {
  const { t: taria } = useTranslation("aria-label");

  return (
    <footer css={footerStyle}>
      <div css={iconListStyle}>
        <SNSIcon
          snsName="Email"
          href={`mailto:${siteMetaData.email}`}
          icon={<FontAwesomeIcon icon={faEnvelope} css={IconStyle} />}
          ariaLabel={taria("email-link")}
        />
        <SNSIcon
          snsName="GitHub"
          href={siteMetaData.github}
          icon={<FontAwesomeIcon icon={faGithub} css={IconStyle} />}
          ariaLabel={taria("github-link")}
        />
        <SNSIcon
          snsName="Twitter"
          href={siteMetaData.twitter}
          icon={<FontAwesomeIcon icon={faTwitter} css={IconStyle} />}
          ariaLabel={taria("twitter-link")}
        />
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
