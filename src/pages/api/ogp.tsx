import { loadDefaultJapaneseParser } from "budoux";
import DOMPurify from "isomorphic-dompurify";
import * as playwright from "playwright-aws-lambda";
import ReactDOM from "react-dom/server";

import { OGPContent } from "components/OGPContent";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function OGP(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // HTMLの生成
  const { title } = req.query;
  // XSSを防ぐためにDOMPurifyを使用
  const sanitizedTitle = DOMPurify.sanitize((title as string) ?? "");
  const parser = loadDefaultJapaneseParser();
  const props = { html: parser.translateHTMLString(sanitizedTitle) };
  const markup = ReactDOM.renderToStaticMarkup(<OGPContent {...props} />);
  const html = `<!doctype html>${markup}`;

  // 画像の生成
  const browser = await playwright.launchChromium();
  const viewport = { width: 1200, height: 630 }; // OGP画像の推奨サイズ
  const page = await browser.newPage({ viewport });
  await page.setContent(html, { waitUntil: "networkidle" });
  const image = await page.screenshot({ type: "png" });
  await browser.close();

  // APIレスポンスの生成
  res.setHeader("Cache-Control", "max-age=216000, s-maxage=216000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(image);
}
