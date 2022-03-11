import fs from "fs";
import path from "path";

import { loadDefaultJapaneseParser } from "budoux";
import { chromium } from "playwright";
import ReactDOM from "react-dom/server";

import { OGPContent } from "../components/OGPContent";
import { getFrontMatters } from "../lib/api";

const OGP_DIR = "images/ogps";

export async function generateOgpImages(): Promise<void> {
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

export function getOgpImagePath(id: string): string {
  return path.join("/", OGP_DIR, `${id}.png`);
}
