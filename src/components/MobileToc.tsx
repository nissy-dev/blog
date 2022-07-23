import { css } from "@emotion/react";
import { useState } from "react";

import { useTranslation } from "../utils/useTranslation";

import { FaList } from "./Icons";

type Props = {
  tocHtml: string;
};

export const MobileToc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
  const [showToc, setState] = useState(false);
  return (
    <div css={tocStyle}>
      <div>
        <button
          type="button"
          onClick={() => setState(!showToc)}
          title={!showToc ? t("open-toc") : t("close-toc")}
          aria-controls="mobile-toc"
          aria-expanded={showToc}
        >
          <FaList />
        </button>
        <div>
          <span id="mobile-toc-title">{t("table-of-contents")}</span>
        </div>
      </div>
      {showToc && (
        <nav
          id="mobile-toc"
          aria-labelledby="mobile-toc-title"
          dangerouslySetInnerHTML={{ __html: tocHtml }}
        />
      )}
    </div>
  );
};

const tocStyle = css`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      /* padding: 0.35rem; */
      color: var(--background);
      background-color: var(--base);
      border-radius: 1rem;
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        padding-left: 0.5rem;
        font-size: 1.25rem;
        font-weight: var(--font-bold);
        color: var(--base);
      }
    }
  }

  > nav {
    padding-top: 1rem;
    padding-left: 0.5rem;

    li {
      padding: 0.25rem 0 0.25rem 1rem;

      > a {
        color: var(--link-color);
      }
    }

    > ul > li {
      border-left: 3px solid var(--gray-300);
    }
  }
`;
