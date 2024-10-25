import { siteMetaData } from "@blog/libs/constant";
import { getPostById, getPostIds } from "@blog/libs/repositories";
import type { Metadata } from "next";

import { CONTENTS_DIR } from "../../../constant";
import { dateFormat } from "../../../functions/dateFormat";
import { MobileToc } from "./_components/MobileToc";
import { PostHeader } from "./_components/PostHeader";
import { Toc } from "./_components/Toc";

import styles from "./page.module.css";

export async function generateStaticParams() {
  const ids = await getPostIds(CONTENTS_DIR);
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { frontMatter } = await getPostById(CONTENTS_DIR, id);
  const { description, excerpt, title } = frontMatter;
  return {
    title,
    description: description || excerpt,
    openGraph: {
      images: [{ url: `${siteMetaData.siteUrl}/images/og-${id}.png` }],
    },
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const { frontMatter, tocHtml, contentHtml } = await getPostById(
    CONTENTS_DIR,
    id,
  );

  const { tags, title, date, timeToRead } = frontMatter;
  const { dateDisplayString, dateISOString } = dateFormat(new Date(date), "ja");
  return (
    <>
      <aside className={styles.tocWrapper}>
        <Toc tocHtml={tocHtml} />
      </aside>
      <main className={styles.main}>
        <PostHeader
          tags={tags}
          publishedAt={dateDisplayString}
          publishedAtISOString={dateISOString}
          title={title}
          timeToRead={timeToRead}
        />
        <div className={styles.mobileTocWrapper}>
          <MobileToc tocHtml={tocHtml} />
        </div>
        <div
          className={"markdown-body"}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成される内容なので問題ない
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </>
  );
}
