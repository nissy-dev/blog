import { css } from "@emotion/react";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

import { Link } from "components/Link";
import { ProfileButton } from "components/ProfileButton";
import { ThemeSwitchButton } from "components/ThemeSwitchButton";
import { siteMetadata, ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from "utils/const";
import { useTranslation } from "utils/useTranslation";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header css={headerStyle}>
      <Link css={titleContainerStyle} href="/" aria-label={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
      <DocSearch
        appId={ALGOLIA_APP_ID}
        indexName={ALGOLIA_INDEX_NAME}
        apiKey={ALGOLIA_SEARCH_KEY}
      />
    </header>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 0.25rem;

  > button:nth-of-type(2) {
    margin-left: 0;
  }
`;

const titleContainerStyle = css`
  margin-right: auto;
  font-size: 1.75rem;
  font-weight: var(--font-bold);
  color: var(--base);

  :hover {
    text-decoration: none;
  }
`;
