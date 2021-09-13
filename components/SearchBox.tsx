import { css } from "@emotion/react";
import { SearchBox } from "react-instantsearch-dom";

import { useTranslation } from "utils/useTranslation";

export const CustomSearchBox = () => {
  const { t } = useTranslation();
  return (
    <div css={customSearchBoxStyle}>
      {/* @ts-ignore */}
      <SearchBox
        translations={{
          placeholder: t("search-box-placeholder"),
        }}
        reset={null}
        submit={null}
      />
    </div>
  );
};

const customSearchBoxStyle = css`
  display: flex;
  flex-direction: row;
  width: 18.5rem;
  height: 2rem;
  margin-left: auto;
  background-color: var(--gray-300);

  > div {
    flex: 1;
    padding: 0.25rem 0.5rem 0.25rem;
    line-height: 0;

    input[type="search"] {
      width: 100%;
      /* see: https://github.com/algolia/react-instantsearch/issues/2997 */
      ::-webkit-search-cancel-button {
        appearance: none;
      }
    }
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
