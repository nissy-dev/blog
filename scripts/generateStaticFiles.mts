import { generateFeedXml } from "../src/utils/feed";
import { generateOgpImages } from "../src/utils/ogp";
import { generateSitemapXml } from "../src/utils/sitemap";

const main = async () => {
  await Promise.all([generateFeedXml(), generateOgpImages(), generateSitemapXml()]);
};

main();
