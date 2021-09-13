import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "utils/useTranslation";

type Props = {
  tocHtml: string;
};

export const Toc = ({ tocHtml }: Props) => {
  const { t } = useTranslation();
  return (
    <div css={tocStyle}>
      <div>
        <FontAwesomeIcon icon={faList} />
        {t("table-of-contents")}
      </div>
      <div dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </div>
  );
};

const tocStyle = css`
  padding-right: 2rem;

  > div:nth-of-type(1) {
    display: flex;
    font-size: 1.25rem;
    font-weight: var(--font-bold);
    color: var(--foreground);

    > svg {
      width: 1.25rem;
      margin-right: 0.5rem;
    }
  }

  > div:nth-of-type(2) {
    height: 80%;
    padding-top: 1rem;
    overflow: scroll;

    a {
      color: var(--link-color);
    }

    > ul > li {
      padding: 0.25rem 0 0.25rem 1rem;
      border-left: 3px solid var(--gray-300);
    }

    > ul > li > ul > li {
      padding: 0.25rem 0 0.25rem 1rem;
    }
  }
`;
