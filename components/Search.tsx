import { css } from "@emotion/react";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch } from "react-instantsearch-dom";

import { CustomSearchBox } from "components/SearchBox";
import { ConnectedSearchList } from "components/SearchList";
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from "utils/const";

type Props = {
  handleSearchBox: () => void;
};

export function Search({ handleSearchBox }: Props) {
  const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

  return (
    <div css={searchStyle}>
      <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <Configure
          // https://www.algolia.com/doc/api-reference/search-api-parameters/
          hitsPerPage={10}
          removeStopWords
          analytics
        />
        <CustomSearchBox />
        <ConnectedSearchList handleSearchBox={handleSearchBox} />
      </InstantSearch>
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
