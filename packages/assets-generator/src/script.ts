import { getFrontMatters } from "@blog/libs/repositories";
import { CONTENTS_DIR } from "./constant";
import { generateFeed } from "./utils/generate-feed";
import { generateOgImages } from "./utils/generate-og-images";
import { generateSitemap } from "./utils/generate-sitemap";

export type FrontMatters = Awaited<ReturnType<typeof getFrontMatters>>

async function main() {
  const frontMatters = await getFrontMatters(CONTENTS_DIR);
  return Promise.all([
    generateOgImages(frontMatters),
    generateFeed(frontMatters),
    generateSitemap(frontMatters),
  ])
}

main().catch((error) => console.error(error));
