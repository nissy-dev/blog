import { generateFeed } from "./utils/generate-feed";
import { generateOgImages } from "./utils/generate-og-images";
import { generateSitemap } from "./utils/generate-sitemap";

async function main() {
  return Promise.all([
    generateOgImages(),
    generateFeed(),
    generateSitemap(),
  ])
}

main().catch((error) => console.error(error));
