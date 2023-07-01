import { remark } from "remark";
import stripMarkdown from "strip-markdown";

export const extractExcerpt = async (content: string) => {
  const stripProcessor = remark().use(stripMarkdown);
  const stripTagsMarkdown = await stripProcessor.process(content);
  // 3行分は表示できそうな長さで truncate する (ここでは 250)
  return stripTagsMarkdown.toString().replace(/\r?\n/g, " ").slice(0, 250);
};
