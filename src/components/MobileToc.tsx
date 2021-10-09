import { css } from "@emotion/react";

import { FaList } from "components/icons";
import { useTranslation } from "utils/useTranslation";

type Props = {
  tocHtml: string;
};

export const MobileToc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
  return (
    <div css={tocStyle}>
      <div>
        <FaList />
        <span>{t("table-of-contents")}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </div>
  );
};

const tocStyle = css`
  padding-right: 2rem;

  > div:nth-of-type(1) {
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

  > div:nth-of-type(2) {
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
