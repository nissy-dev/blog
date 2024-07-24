import { toc } from "mdast-util-toc";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remark2Rehype from "remark-rehype";

import type { Root } from "mdast";

const remarkToc = () => {
  return (tree: Root) => {
    const result = toc(tree, { maxDepth: 3 });
    if (!result.map) {
      return;
    }
    tree.children = [result.map];
  };
};

export const extractToc = async (content: string): Promise<string> => {
  const tocProcessor = remark()
    .use(remarkToc)
    .use(remark2Rehype)
    .use(rehypeStringify);
  const tocHtml = await tocProcessor.process(content);
  return tocHtml.toString();
};
