import fs from "node:fs/promises";
import path from "node:path";
import { loadDefaultJapaneseParser } from "budoux";
import { type Browser, chromium } from "playwright";
import ReactDOM from "react-dom/server";

import { OGHtml } from "../components/OGHtml";
import { NEXT_PUBLIC_DIR } from "../constant";
import type { FrontMatters } from "../script";


export async function generateOgImages(frontMatters: FrontMatters): Promise<void> {
  // 不足しているOG画像の生成
  const browser = await chromium.launch();
  const generateImages = frontMatters.map(async ({ id, title }) =>
    generateOgImage(browser, id, title),
  );
  await Promise.all(generateImages);
  await browser.close();
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
  await fs.writeFile(path.join(NEXT_PUBLIC_DIR, `images/og-${id}.png`), image);
}
