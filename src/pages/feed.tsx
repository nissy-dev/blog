// see: https://zenn.dev/catnose99/articles/c7754ba6e4adac
import { GetServerSidePropsContext } from "next";

import { Feed } from "feed";

import { getFrontMatters } from "lib/api";
import { siteMetadata } from "utils/const";

async function generateFeedXml() {
  const feed = new Feed({
    id: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    copyright: "Copyright (C) 2021 Daiki Nishikawa",
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

  return feed.rss2();
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間キャッシュする
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
