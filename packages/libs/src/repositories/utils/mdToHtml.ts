import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remark2Rehype from "remark-rehype";

import {
  rehypeConvertLinkToCard,
  rehypeInsertLazyLoad,
  rehypeInsertTargetBlank,
} from "./customRehypePlugin";

export const mdToHtml = async (content: string): Promise<string> => {
  const mdProcessor = remark()
    .use(remarkGfm)
    .use(remark2Rehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeConvertLinkToCard)
    .use(rehypeInsertTargetBlank)
    .use(rehypeInsertLazyLoad)
    .use(rehypeStringify);
  const contentHtml = await mdProcessor.process(content);
  return contentHtml.toString();
};
