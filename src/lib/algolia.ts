import algoliasearch from "algoliasearch";

import { getPostById, getPostIDs } from "lib/api";
import { extractExcerpt } from "utils/extractExcerpt";
import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } from "utils/const";

// Algoliaの無料のプランでは、1つのオブジェクトが10KBまでという制限がある
const LIMIT_WORDS = 4500;

export const generateIndex = async () => {
  // インデックスに登録するデータを作成する
  const allPostIds = getPostIDs();
  const indexInfosPromises = allPostIds.map(async (postId) => {
    const { frontMatter, content } = await getPostById(postId);
    const planTextContent = await extractExcerpt(content, LIMIT_WORDS);
    return { objectID: postId, postId, ...frontMatter, content: planTextContent };
  });
  const indexInfos = await Promise.all(indexInfosPromises);

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  await index.partialUpdateObjects(indexInfos, {
    createIfNotExists: true,
  });

  // 検索条件の登録
  await index.setSettings({
    searchableAttributes: ["title", "excerpt", "description", "content"],
    customRanking: ["desc(date)"],
  });
};
