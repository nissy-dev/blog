import { getPostById } from "./getPostById";
import { getPostIds } from "./getPostIds";

export async function getFrontMatters(contentsDir: string, tag?: string) {
  const allPostIds = await getPostIds(contentsDir);
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(contentsDir, postId);
    return { id: postId, ...frontMatter };
  });

  let frontMatters = await Promise.all(getFrontMatterPromises);
  if (tag !== undefined) {
    frontMatters = frontMatters.filter((frontMatter) =>
      frontMatter.tags.includes(tag)
    );
  }
  // 投稿日が新しい順に並び替える
  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1));
}
