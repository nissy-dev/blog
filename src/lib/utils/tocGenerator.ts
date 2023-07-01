import { toc } from "mdast-util-toc";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remark2Rehype from "remark-rehype";

import type { Root } from "mdast";
import type { Plugin } from "unified";

const myRemarkToc: Plugin<unknown[], Root, Root> = () => {
  return (tree) => {
    const result = toc(tree, { maxDepth: 3 });
    if (!result.map) {
      return;
    }
    tree.children = [result.map];
  };
};

export const tocGenerator = async (content: string): Promise<string> => {
  const tocProcessor = remark().use(myRemarkToc).use(remark2Rehype).use(rehypeStringify);
  const tocHtml = await tocProcessor.process(content);
  return tocHtml.toString();
};
