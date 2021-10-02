import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolink from "remark-autolink-headings";
import remark2Rehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export const mdToHtml = async (content: string): Promise<string> => {
  const mdProcessor = remark()
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkAutolink)
    .use(remark2Rehype)
    .use(rehypeHighlight)
    .use(rehypeStringify);
  const contentHtml = await mdProcessor.process(content);
  return contentHtml.toString();
};
