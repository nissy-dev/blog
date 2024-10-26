import fs from "node:fs/promises";
import path from "node:path";
import { siteMetaData } from "@blog/libs/constant";

import { NEXT_PUBLIC_DIR } from "../constant";
import type { FrontMatters } from "../script";

export async function generateSitemap(
  frontMatters: FrontMatters,
): Promise<void> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  xml += `
  <url>
    <loc>${siteMetaData.siteUrl}</loc>
  </url>`;
  for (const frontMatter of frontMatters) {
    xml += `
  <url>
    <loc>${siteMetaData.siteUrl}/post/${frontMatter.id}</loc>
    <lastmod>${frontMatter.date}</lastmod>
  </url>`;
  }
  xml += `\n</urlset>`;
  await fs.writeFile(path.join(NEXT_PUBLIC_DIR, "sitemap.xml"), xml);
}
