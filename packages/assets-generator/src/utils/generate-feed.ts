import fs from "node:fs/promises";
import path from "node:path";
import { siteMetaData } from "@blog/libs/constant";
import { Feed } from "feed";

import { NEXT_PUBLIC_DIR } from "../constant";
import type { FrontMatters } from "../script";

// see: https://zenn.dev/catnose99/articles/c7754ba6e4adac
export async function generateFeed(frontMatters: FrontMatters): Promise<void> {
  const feed = new Feed({
    id: siteMetaData.siteUrl,
    title: siteMetaData.title,
    description: siteMetaData.description,
    copyright: `Copyright (C) ${new Date().getFullYear()} ${siteMetaData.author}`,
    language: "ja",
  });
  for (const frontMatter of frontMatters) {
    feed.addItem({
      title: frontMatter.title,
      description: frontMatter.description,
      date: new Date(frontMatter.date),
      link: `${siteMetaData.siteUrl}/${frontMatter.id}`,
    });
  }
  await fs.writeFile(path.join(NEXT_PUBLIC_DIR, "feed"), feed.rss2());
}
