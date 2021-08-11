import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

type Props = {
  tocHtml: string;
};

export const Toc = ({ tocHtml }: Props) => {
  const { t: tcom } = useTranslation("common");
  return (
    <div css={tocStyle}>
      <div>
        <FontAwesomeIcon icon={faList} />
        {tcom("table-of-contents")}
      </div>
      <div dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </div>
  );
};

const tocStyle = css`
  div:nth-child(1) {
    font-weight: var(--font-bold);
    display: flex;
    font-size: 1.25rem;

    > svg {
      width: 1.25rem;
      margin-right: 0.5rem;
    }
  }

  div:nth-child(2) {
    margin-top: 1rem;

    a {
      color: var(--light-blue);
    }

    > ul > li {
      border-left: 3px solid var(--light-gray);
      padding: 0.25rem 0 0.25rem 1rem;
    }

    > ul > li > ul > li {
      padding: 0.25rem 0 0.25rem 1rem;
    }
  }
`;
