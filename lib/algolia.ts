import algoliasearch from "algoliasearch";

import { getPostById, getPostIDs } from "lib/api";
import { extractExcerpt } from "utils/extractExcerpt";
import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX_NAME } from "utils/const";

// Algoliaの無料のプランでは、1つのオブジェクトが10KBまでという制限がある
const LIMIT_WORDS = 4500;

export const generateIndex = async () => {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

  // デプロイ前に登録されていたインデックスを削除する
  const prevIndex = client.initIndex(ALGOLIA_INDEX_NAME);
  await prevIndex.delete();

  // インデックスに登録するデータ
  const allPostIds = getPostIDs();
  const indexInfosPromises = allPostIds.map(async (postId) => {
    const { frontMatter, content } = await getPostById(postId);
    const planTextContent = await extractExcerpt(content, LIMIT_WORDS);
    return { postId, ...frontMatter, content: planTextContent };
  });
  const indexInfos = await Promise.all(indexInfosPromises);

  // 新しいインデックスを登録する
  const newIndex = client.initIndex(ALGOLIA_INDEX_NAME);
  await newIndex.saveObjects(indexInfos, { autoGenerateObjectIDIfNotExist: true });

  // 検索条件の登録
  await newIndex.setSettings({
    searchableAttributes: ["title", "excerpt", "description", "content"],
    customRanking: ["desc(date)"],
  });
};
