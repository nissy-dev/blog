import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remark2Rehype from "remark-rehype";

export const tocGenerator = async (content: string): Promise<string> => {
  const tocProcessor = remark().use(remark2Rehype).use(rehypeStringify);
  const tocHtml = await tocProcessor.process(content);
  return tocHtml.toString();
};
