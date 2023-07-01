import fs from "fs";
import path from "path";

import { loadDefaultJapaneseParser } from "budoux";
import { Feed } from "feed";
import { chromium } from "playwright";
import React from "react";
import ReactDOM from "react-dom/server";

import { siteMetadata, OGP_DIR } from "../src/const";

import { getFrontMatters } from "./api";
import { OGPContent } from "./OGPContent";

// see: https://zenn.dev/catnose99/articles/c7754ba6e4adac
async function generateFeedXml(): Promise<void> {
  const feed = new Feed({
    id: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    copyright: `Copyright (C) ${new Date().getFullYear()} Daiki Nishikawa`,
    language: "ja",
  });

  const frontMatters = await getFrontMatters();
  frontMatters.forEach((frontMatter) => {
    feed.addItem({
      title: frontMatter.title,
      description: frontMatter.description,
      date: new Date(frontMatter.date),
      link: `${siteMetadata.siteUrl}/${frontMatter.id}`,
    });
  });

  fs.writeFileSync(path.join(process.cwd(), "public", "feed"), feed.rss2());
}

async function generateSitemapXml(): Promise<void> {
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

async function generateOgpImages(): Promise<void> {
  const frontMatters = await getFrontMatters();

  // OGP画像の生成
  const generateImages = frontMatters.map(async ({ id, title }) => generateOgpImage(id, title));
  await Promise.all(generateImages);
}

const generateOgpImage = async (id: string, title: string) => {
  const parser = loadDefaultJapaneseParser();
  const props = { html: parser.translateHTMLString(title) };
  const markup = ReactDOM.renderToStaticMarkup(<OGPContent {...props} />);
  const html = `<!doctype html>${markup}`;

  // 画像の生成
  const browser = await chromium.launch();
  const viewport = { width: 1200, height: 630 }; // OGP画像の推奨サイズ
  const page = await browser.newPage({ viewport });
  await page.setContent(html, { waitUntil: "networkidle" });
  const image = await page.screenshot({ type: "png" });
  await browser.close();

  // 画像の圧縮と保存
  fs.writeFileSync(path.join(process.cwd(), "public", OGP_DIR, `${id}.png`), image);
};

const main = async () => {
  await Promise.all([generateFeedXml(), generateOgpImages(), generateSitemapXml()]);
};

main();
