// see: https://zenn.dev/catnose99/articles/c7754ba6e4adac
import fs from "fs";
import path from "path";

import { Feed } from "feed";

import { getFrontMatters } from "lib/api";
import { siteMetadata } from "utils/const";

export async function generateFeedXml(): Promise<void> {
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
