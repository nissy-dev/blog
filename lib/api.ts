import fs from "fs";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolink from "remark-autolink-headings";
import remarkToc from "remark-toc";
import remarkPrism from "remark-prism";
import remark2Rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";
import readingTime from "reading-time";
import striptags from "striptags";
import truncate from "lodash.truncate";

// rootディレクトリから見た時のパスを指定する
const CONTENTS_DIR = "contents";

const extractExcerpt = (html: string, truncateLength = 125) => {
  // 改行コードとタグの削除
  const stripTagsHtml = striptags(html).replace(/\r?\n/g, " ");
  return truncate(stripTagsHtml, { length: truncateLength });
};

const calcTimeToRead = (mdContent: string) => {
  const stats = readingTime(mdContent);
  const timeToRead = Math.round(stats.minutes);
  return timeToRead === 0 ? 1 : timeToRead;
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
): Promise<{ frontMatter: FrontMatter; html: string }> => {
  const { data, content } = matter(mdFileContents);
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkAutolink)
    .use(remarkToc)
    .use(remarkPrism)
    .use(remark2Rehype, { allowDangerousHtml: true })
    .use(rehypeStringify);
  const parsedContent = await processor.process(content);
  const html = parsedContent.toString();

  const timeToRead = calcTimeToRead(content);
  const excerpt = extractExcerpt(html);
  const frontMatter = { ...data, timeToRead, excerpt } as FrontMatter;
  return { frontMatter, html };
};

export async function getPostById(id: string) {
  const postDir = id;
  const mdFilePath = path.join(process.cwd(), CONTENTS_DIR, postDir, "index.md");
  const { frontMatter, html } = await parseMarkdown(fs.readFileSync(mdFilePath, "utf-8"));
  return { frontMatter, html };
}

export function getPostIDs() {
  // CONTENTS_DIR 直下のディレクトリを全て取得
  const contentsDir = path.join(process.cwd(), CONTENTS_DIR);
  return fs.readdirSync(contentsDir);
}

export async function getFrontMatters() {
  const allPostIds = getPostIDs();
  const getFrontMatterPromises = allPostIds.map(async (postId) => {
    const { frontMatter } = await getPostById(postId);
    return { id: postId, ...frontMatter };
  });
  const frontMatters = await Promise.all(getFrontMatterPromises);
  // 投稿日が新しい順に並び替える
  return frontMatters.sort((a, b) => (a.date > b.date ? -1 : 1));
}
