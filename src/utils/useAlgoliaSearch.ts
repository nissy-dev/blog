import { useState } from "react";
import algoliasearch from "algoliasearch";
import type { Hit } from "@algolia/client-search";
import useSWR from "swr";

import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from "utils/const";
import { FrontMatter } from "lib/api";

type HitDoc = FrontMatter & {
  postId: string;
  content: string;
};

export type SearchHitType = Hit<HitDoc>;

// TODO: index も必要であれば外から取るようにしたほうが良さそう
export const useAlgoliaSearch = (query: string) => {
  const [searchHits, setSearchHits] = useState<SearchHitType[]>([]);
  const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

  const response = useSWR<void, Error>(
    query ? [ALGOLIA_INDEX_NAME, query] : null,
    async (indexName: string, query: string) => {
      const index = searchClient.initIndex(indexName);
      const results = await index.search<HitDoc>(query, {
        // https://www.algolia.com/doc/api-reference/search-api-parameters/
        hitsPerPage: 10,
        removeStopWords: true,
        analytics: true,
      });
      setSearchHits(results.hits);
    }
  );

  return { searchHits, error: response.error };
};
