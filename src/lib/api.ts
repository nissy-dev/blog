import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

import { calcTimeToRead } from "../utils/calcTimeToRead";
import { extractExcerpt } from "../utils/extractExcerpt";
import { mdToHtml } from "../utils/mdToHtml";
import { tocGenerator } from "../utils/tocGenerator";

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
  contentHtml: string;
  content: string;
};

const parseMarkdown = async (mdFileContents: string): Promise<ParseResult> => {
  const { data, content } = matter(mdFileContents);
  const timeToRead = calcTimeToRead(content);
  const [excerpt, tocHtml, contentHtml] = await Promise.all([
    extractExcerpt(content),
    tocGenerator(content),
    mdToHtml(content),
  ]);
  const frontMatter = { ...data, timeToRead, excerpt } as FrontMatter;
  return { frontMatter, tocHtml, contentHtml, content };
};

export async function getPostById(id: string) {
  const postDir = id;
  const mdFilePath = path.join(process.cwd(), CONTENTS_DIR, postDir, "index.md");
  const mdFileContents = await fs.readFile(mdFilePath, "utf8");
  const { frontMatter, tocHtml, contentHtml, content } = await parseMarkdown(mdFileContents);
  return { frontMatter, tocHtml, contentHtml, content };
}

export async function getPostIDs() {
  const contentsDir = path.join(process.cwd(), CONTENTS_DIR);
  return fs.readdir(contentsDir);
}

export async function getFrontMatters(tag?: string) {
  const allPostIds = await getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(postId);
    return { id: postId, ...frontMatter };
  });

  let frontMatters = await Promise.all(getFrontMatterPromises);
  if (tag !== undefined) {
    frontMatters = frontMatters.filter((frontMatter) => frontMatter.tags.includes(tag));
  }
  // 投稿日が新しい順に並び替える
  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getTags() {
  const allPostIds = await getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(postId);
    return { id: postId, ...frontMatter };
  });

  const frontMatters = await Promise.all(getFrontMatterPromises);
  const allTags = frontMatters.flatMap((frontMatter) => frontMatter.tags);
  return [...new Set(allTags)];
}
