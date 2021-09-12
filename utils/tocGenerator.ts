import { remark } from "remark";
import remark2Rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import toc from "markdown-toc";

export const tocGenerator = async (content: string): Promise<string> => {
  const extractTocMarkdown = toc(content, { maxdepth: 3 }).content;
  const tocProcessor = remark().use(remark2Rehype).use(rehypeStringify);
  const tocHtml = await tocProcessor.process(extractTocMarkdown);
  return tocHtml.toString();
};
