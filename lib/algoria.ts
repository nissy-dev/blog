import algoliasearch from "algoliasearch";

import { getPostById, getPostIDs, extractExcerpt } from "./api";

export const generateIndex = async () => {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_ADMIN_KEY || ""
  );

  // デプロイ前に登録されていたインデックスを削除する
  const prevIndex = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "");
  await prevIndex.delete();

  // インデックスに登録するデータ
  const allPostIds = getPostIDs();
  const limitLength = 4500;
  const indexInfosPromises = allPostIds.map(async (postId) => {
    const { frontMatter, html } = await getPostById(postId);
    const planTextContent = extractExcerpt(html, limitLength);
    return { postId, ...frontMatter, content: planTextContent };
  });
  const indexInfos = await Promise.all(indexInfosPromises);

  // 新しいインデックスを登録する
  const newIndex = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || "");
  await newIndex.saveObjects(indexInfos, { autoGenerateObjectIDIfNotExist: true });

  // 検索条件の登録
  await newIndex.setSettings({
    searchableAttributes: ["title", "excerpt", "description", "content"],
    customRanking: ["desc(date)"],
  });
};
