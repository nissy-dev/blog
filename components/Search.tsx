import { css } from "@emotion/react";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch } from "react-instantsearch-dom";

import { CustomSearchBox } from "./SearchBox";
import { ConnectedSearchList } from "./SearchList";

export function Search() {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
  );
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "";

  return (
    <div css={searchStyle}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure
          // https://www.algolia.com/doc/api-reference/search-api-parameters/
          hitsPerPage={10}
          removeStopWords
          analytics
        />
        <CustomSearchBox />
        <ConnectedSearchList />
      </InstantSearch>
    </div>
  );
}

const searchStyle = css`
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  position: relative;
`;
