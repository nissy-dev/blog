import { generateSitemapXml } from "utils/sitemap";
import { generateFeedXml } from "utils/feed";

(async () => {
  await generateSitemapXml();
  await generateFeedXml();
})();
