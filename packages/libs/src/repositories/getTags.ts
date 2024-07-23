import { getPostById } from "./getPostById";
import { getPostIds } from "./getPostIds";

export async function getTags(contentsDir: string) {
  const allPostIds = await getPostIds(contentsDir);
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(contentsDir, postId);
    return { id: postId, ...frontMatter };
  });

  const frontMatters = await Promise.all(getFrontMatterPromises);
  const allTags = frontMatters.flatMap((frontMatter) => frontMatter.tags);
  return [...new Set(allTags)];
}
