import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

import { CONTENTS_DIR } from "../src/const";

type FrontMatter = {
  title: string;
  date: string;
  description?: string;
};

async function getPostIDs() {
  const contentsDir = path.join(process.cwd(), CONTENTS_DIR);
  return fs.readdir(contentsDir);
}

const getFrontMatter = async (id: string) => {
  const postDir = id;
  const mdFilePath = path.join(process.cwd(), CONTENTS_DIR, postDir, "index.md");
  const mdFileContents = await fs.readFile(mdFilePath, "utf8");
  const { data } = matter(mdFileContents);
  return { ...data } as FrontMatter;
};

export async function getFrontMatters() {
  const allPostIds = await getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const frontMatter = await getFrontMatter(postId);
    return { id: postId, ...frontMatter };
  });

  const frontMatters = await Promise.all(getFrontMatterPromises);
  // 投稿日が新しい順に並び替える
  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1));
}
