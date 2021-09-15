import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { calcTimeToRead } from "utils/calcTimeToRead";
import { extractExcerpt } from "utils/extractExcerpt";
import { tocGenerator } from "utils/tocGenerator";

// rootディレクトリから見た時のパスを指定する
const CONTENTS_DIR = "contents";

export type FrontMatter = {
  title: string;
  date: string;
  timeToRead: number;
  excerpt: string;
  description?: string;
  tags: Array<string>;
};

type ParseResult = {
  frontMatter: FrontMatter;
  tocHtml: string;
  content: string;
};

const parseMarkdown = async (mdFileContents: string): Promise<ParseResult> => {
  const { data, content } = matter(mdFileContents);
  const timeToRead = calcTimeToRead(content);
  const excerpt = await extractExcerpt(content);
  const frontMatter = { ...data, timeToRead, excerpt } as FrontMatter;
  const tocHtml = await tocGenerator(content);
  return { frontMatter, tocHtml, content };
};

export async function getPostById(id: string) {
  const postDir = id;
  const mdFilePath = path.join(process.cwd(), CONTENTS_DIR, postDir, "index.md");
  const { frontMatter, tocHtml, content } = await parseMarkdown(
    fs.readFileSync(mdFilePath, "utf-8")
  );
  return { frontMatter, tocHtml, content };
}

export function getPostIDs() {
  const contentsDir = path.join(process.cwd(), CONTENTS_DIR);
  return fs.readdirSync(contentsDir);
}

export async function getFrontMatters(tag?: string) {
  const allPostIds = getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(postId);
    return { id: postId, ...frontMatter };
  });

  let frontMatters = await Promise.all(getFrontMatterPromises);
  if (tag !== undefined) {
    frontMatters = frontMatters.filter((frontMatter) => frontMatter.tags?.includes(tag));
  }
  // 投稿日が新しい順に並び替える
  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getTags() {
  const allPostIds = getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(postId);
    return { id: postId, ...frontMatter };
  });

  const frontMatters = await Promise.all(getFrontMatterPromises);
  const allTags = frontMatters.flatMap((frontMatter) => frontMatter.tags);
  return [...new Set(allTags)];
}
