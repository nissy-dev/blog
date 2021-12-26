import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remark2Rehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

import {
  rehypeInsertTargetBlank,
  rehypeInsertLazyload,
  rehypeConvertLinkToCard,
} from "utils/customRehypePlugin";

export const mdToHtml = async (content: string): Promise<string> => {
  const mdProcessor = remark()
    .use(remarkGfm)
    .use(remark2Rehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeInsertTargetBlank)
    .use(rehypeInsertLazyload)
    .use(rehypeConvertLinkToCard)
    .use(rehypeStringify);
  const contentHtml = await mdProcessor.process(content);
  return contentHtml.toString();
};
