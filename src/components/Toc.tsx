import { css } from "@emotion/react";

import { useTranslation } from "../utils/useTranslation";

import { FaList } from "./Icons";

type Props = {
  tocHtml: string;
};

export const Toc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
  return (
    <div css={tocStyle}>
      <div>
        <FaList />
        <span id="toc-title">{t("table-of-contents")}</span>
      </div>
      <nav aria-labelledby="toc-title" dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </div>
  );
};

const tocStyle = css`
  padding-right: 2rem;

  > div {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: var(--font-bold);
    color: var(--foreground);

    > svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    > span {
      padding-left: 0.5rem;
    }
  }

  > nav {
    height: 80%;
    padding-top: 1rem;
    overflow: scroll;

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
