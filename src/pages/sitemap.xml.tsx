// see: https://zenn.dev/catnose99/articles/c441954a987c24
import { GetServerSideProps } from "next";

import { getFrontMatters } from "lib/api";
import { siteMetadata } from "utils/const";

async function generateSitemapXml(): Promise<string> {
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
  return xml;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = await generateSitemapXml();

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
