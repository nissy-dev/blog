import { useState } from "react";
import { css } from "@emotion/react";

import { SearchBox } from "components/SearchBox";
import { SearchList } from "components/SearchList";
import { useAlgoliaSearch } from "utils/useAlgoliaSearch";

type Props = {
  handleSearchBox: () => void;
};

export function Search({ handleSearchBox }: Props) {
  const [query, setQuery] = useState("");
  const { searchHits, error } = useAlgoliaSearch(query);

  return (
    <div css={searchStyle}>
      <SearchBox query={query} setQuery={setQuery} />
      {query !== "" && (
        <SearchList
          query={query}
          searchError={error}
          searchHits={searchHits}
          handleSearchBox={handleSearchBox}
        />
      )}
    </div>
  );
}

const searchStyle = css`
  position: absolute;
  top: 0.25rem;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 0.5rem;
`;
