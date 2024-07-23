import fs from "node:fs/promises";
import path from "node:path";
import { getFrontMatters } from "@blog/libs/repositories";
import { loadDefaultJapaneseParser } from "budoux";
import { type Browser, chromium } from "playwright";
import ReactDOM from "react-dom/server";

import { OGHtml } from "../components/OGHtml";
import { CONTENTS_DIR, NEXT_PUBLIC_DIR } from "../constant";

const IMAGE_DIR = path.join(NEXT_PUBLIC_DIR, "images");

export async function generateOgImages(): Promise<void> {
  const frontMatters = await getFrontMatters(CONTENTS_DIR);
  const generatedIds = await getGeneratedIds();
  const newFrontMatters = frontMatters.filter(
    ({ id }) => !generatedIds.includes(id),
  );

  if (newFrontMatters.length === 0) {
    return;
  }

  // 不足しているOG画像の生成
  const browser = await chromium.launch();
  const generateImages = newFrontMatters.map(async ({ id, title }) =>
    generateOgImage(browser, id, title),
  );
  await Promise.all(generateImages);
  await browser.close();
}

async function getGeneratedIds(): Promise<string[]> {
  const files = await fs.readdir(IMAGE_DIR);
  return files.map((file) => file.replace(/^og-(.+)\.png$/, "$1"));
}

async function generateOgImage(
  browser: Browser,
  id: string,
  title: string,
): Promise<void> {
  const parser = loadDefaultJapaneseParser();
  const props = { html: parser.translateHTMLString(title) };
  const markup = ReactDOM.renderToStaticMarkup(<OGHtml {...props} />);
  const html = `<!doctype html>${markup}`;

  // OGP画像の推奨サイズ
  const viewport = { width: 1200, height: 630 };
  const page = await browser.newPage({ viewport });
  await page.setContent(html, { waitUntil: "networkidle" });
  const image = await page.screenshot({ type: "png" });

  // 画像の圧縮と保存
  await fs.writeFile(path.join(IMAGE_DIR, `og-${id}.png`), image);
}
