import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolink from "remark-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import remark2Rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import readingTime from "reading-time";
import striptags from "striptags";
import truncate from "lodash.truncate";
import toc from "markdown-toc";

// rootディレクトリから見た時のパスを指定する
const CONTENTS_DIR = "contents";

const calcTimeToRead = (mdContent: string) => {
  const stats = readingTime(mdContent);
  const timeToRead = Math.round(stats.minutes);
  return timeToRead === 0 ? 1 : timeToRead;
};

export const extractExcerpt = (html: string, truncateLength = 125) => {
  // 改行コードとタグの削除
  const stripTagsHtml = striptags(html).replace(/\r?\n/g, " ");
  return truncate(stripTagsHtml, { length: truncateLength });
};

export type FrontMatter = {
  title: string;
  date: string;
  timeToRead: number;
  excerpt: string;
  description?: string;
  tags?: Array<string>;
};

const parseMarkdown = async (
  mdFileContents: string
): Promise<{ frontMatter: FrontMatter; html: string; tocHtml: string }> => {
  const { data, content } = matter(mdFileContents);

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkAutolink)
    .use(remark2Rehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify);
  const parsedContent = await processor.process(content);
  const html = parsedContent.toString();

  const tocProcessor = unified().use(remarkParse).use(remark2Rehype).use(rehypeStringify);
  const parsedToc = await tocProcessor.process(toc(content, { maxdepth: 3 }).content);
  const tocHtml = parsedToc.toString();

  const timeToRead = calcTimeToRead(content);
  const excerpt = extractExcerpt(html);
  const frontMatter = { ...data, timeToRead, excerpt } as FrontMatter;
  return { frontMatter, html, tocHtml };
};

export async function getPostById(id: string) {
  const postDir = id;
  const mdFilePath = path.join(process.cwd(), CONTENTS_DIR, postDir, "index.md");
  const { frontMatter, html, tocHtml } = await parseMarkdown(fs.readFileSync(mdFilePath, "utf-8"));
  return { frontMatter, html, tocHtml };
}

export function getPostIDs() {
  // CONTENTS_DIR 直下のディレクトリを全て取得
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
