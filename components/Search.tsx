import { css } from "@emotion/react";
import algoliasearch from "algoliasearch/lite";
import { Configure, InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import { Hit } from "react-instantsearch-core";
import { useTranslation } from "next-i18next";

import { FrontMatter } from "../lib/api";

type HitDoc = FrontMatter & {
  content: string;
};

type HitComponentProps = {
  hit: Hit<HitDoc>;
};

const HitComponent = ({ hit }: HitComponentProps) => {
  return <p>{hit.title}</p>;
};

const CustomSearchBox = () => {
  const { t: tcom } = useTranslation("common");
  return (
    <div css={customSearchBoxStyle}>
      {/* @ts-ignore */}
      <SearchBox
        translations={{
          placeholder: tcom("search-box-placeholder"),
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
  background-color: var(--gray-300);
  width: 18.5rem;
  height: 2rem;
  border-radius: 0.25rem;
  margin-left: auto;
  margin-right: 0.5rem;

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
    display: none;
  }
`;

export function Search() {
  const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_ADMIN_KEY || ""
  );
  const indexName = process.env.ALGOLIA_INDEX_NAME || "";

  return (
    <>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure
          // https://www.algolia.com/doc/api-reference/search-api-parameters/
          hitsPerPage={20}
          removeStopWords
          analytics
          enablePersonalization
        />
        <CustomSearchBox />
        <Hits hitComponent={HitComponent} />
      </InstantSearch>
    </>
  );
}
