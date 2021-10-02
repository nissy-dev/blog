import { remark } from "remark";
import stripMarkdown from "strip-markdown";
import truncate from "lodash.truncate";

export const extractExcerpt = async (content: string, truncateLength = 125) => {
  const stripProcessor = remark().use(stripMarkdown);
  const stripTagsMarkdown = await stripProcessor.process(content);
  return truncate(stripTagsMarkdown.toString().replace(/\r?\n/g, " "), { length: truncateLength });
};
