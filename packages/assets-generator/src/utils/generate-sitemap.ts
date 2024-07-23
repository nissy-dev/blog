import fs from "node:fs/promises";
import path from "node:path";
import { siteMetaData } from "@blog/libs/constant";
import { getFrontMatters } from "@blog/libs/repositories";

import { CONTENTS_DIR, NEXT_PUBLIC_DIR } from "../constant";

export async function generateSitemap(): Promise<void> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const frontMatters = await getFrontMatters(CONTENTS_DIR);
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
