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
          title={t("toggle-toc")}
          aria-label={!showToc ? t("open-toc") : t("close-toc")}
        >
          <FaList />
        </button>
        <div>
          <span>{t("table-of-contents")}</span>
        </div>
      </div>
      {showToc && <div dangerouslySetInnerHTML={{ __html: tocHtml }} />}
    </div>
  );
};

const tocStyle = css`
  display: flex;
  flex-direction: column;

  > div:nth-of-type(1) {
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

  > div:nth-of-type(2) {
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
