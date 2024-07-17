import path from "node:path";
import { getPostById, getPostIds } from "@blog/libs";
import type { Metadata } from "next";

import { CONTENTS_DIR, siteMetadata } from "../../../../constant";
import { type Locale, SUPPORTED_LOCALES } from "../../../../i18n/resources";
import { dateFormat } from "../../_functions/dateFormat";
import { MobileToc } from "./_components/MobileToc";
import { PostHeader } from "./_components/PostHeader";
import { Toc } from "./_components/Toc";

import styles from "./page.module.css";

export async function generateStaticParams() {
  const ids = await getPostIds(CONTENTS_DIR);
  return ids.flatMap((id) => {
    return SUPPORTED_LOCALES.map((locale) => ({ id, locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontMatter } = await getPostById(CONTENTS_DIR, params.id);
  const { description, excerpt, title } = frontMatter;
  return {
    title,
    description: description || excerpt,
    openGraph: {
      images: [
        {
          url: path.join(siteMetadata.siteUrl, `/images/ogps/${params.id}.png`),
        },
      ],
    },
  };
}

type Props = {
  params: {
    locale: Locale;
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const { locale, id } = params;
  const { frontMatter, tocHtml, contentHtml } = await getPostById(
    CONTENTS_DIR,
    id
  );
  const { tags, title, date, timeToRead } = frontMatter;
  const { dateDisplayString, dateISOString } = dateFormat(
    new Date(date),
    locale
  );
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
