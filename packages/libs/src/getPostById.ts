import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { extractExcerpt } from "./utils/extractExcerpt";
import { extractToc } from "./utils/extractToc";
import { mdToHtml } from "./utils/mdToHtml";

type FrontMatter = {
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

const calculateTimeToRead = (content: string): number => {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  const length = [...segmenter.segment(content)].length;
  // 1分で500文字を読むと仮定
  return Math.ceil(length / 500);
};

const parseMarkdown = async (mdFileContents: string): Promise<ParseResult> => {
  const { data, content } = matter(mdFileContents);
  const timeToRead = calculateTimeToRead(content);
  const [excerpt, tocHtml, contentHtml] = await Promise.all([
    extractExcerpt(content),
    extractToc(content),
    mdToHtml(content),
  ]);
  const frontMatter = { ...data, timeToRead, excerpt } as FrontMatter;
  return { frontMatter, tocHtml, contentHtml, content };
};

export async function getPostById(contentsDir: string, id: string) {
  const mdFilePath = path.resolve(contentsDir, id, "index.md");
  const mdFileContents = await fs.readFile(mdFilePath, "utf8");
  const { frontMatter, tocHtml, contentHtml, content } = await parseMarkdown(
    mdFileContents
  );
  return { frontMatter, tocHtml, contentHtml, content };
}
