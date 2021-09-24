import { ChangeEvent } from "react";
import { css } from "@emotion/react";

import { useTranslation } from "utils/useTranslation";

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchBox = ({ query, setQuery }: Props) => {
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  return (
    <div css={customSearchBoxStyle}>
      <input
        type="search"
        name="search"
        placeholder={t("search-box-placeholder")}
        value={query}
        onChange={handleChange}
        aria-label={t("search-box")}
      />
    </div>
  );
};

const customSearchBoxStyle = css`
  display: flex;
  flex-direction: row;
  width: 18.5rem;
  height: 2rem;
  padding: 0.25rem 0.5rem 0.25rem;
  margin-left: auto;
  background-color: var(--gray-300);

  > input[type="search"] {
    width: 100%;
    /* see: https://github.com/algolia/react-instantsearch/issues/2997 */
    ::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  @media screen and (max-width: 640px) {
    width: 100%;
  }
`;
