import fs from "fs";
import path from "path";

import { getFrontMatters } from "lib/api";

import { siteMetadata } from "./const";

export async function generateSitemapXml(): Promise<void> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const frontMatters = await getFrontMatters();
  frontMatters.forEach((frontMatter) => {
    xml += `
      <url>
        <loc>${siteMetadata.siteUrl}/post/${frontMatter.id}</loc>
        <lastmod>${frontMatter.date}</lastmod>
      </url>
    `;
  });

  xml += `</urlset>`;
  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), xml);
}
