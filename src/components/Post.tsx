"use client";

import { dateFormat } from "../functions/dateFormat";
import { useTranslation } from "../i18n/client";
import { FrontMatter } from "../lib/api";

import { MobileToc } from "./MobileToc";
import styles from "./Post.module.scss";
import { PostHeader } from "./PostHeader";
import { Toc } from "./Toc";

type Props = {
  frontMatter: FrontMatter;
  tocHtml: string;
  contentHtml: string;
};

export function Post({ frontMatter, tocHtml, contentHtml }: Props) {
  const { locale } = useTranslation();
  const { tags, title, date, timeToRead } = frontMatter;
  const { dateDisplayString, dateISOString } = dateFormat(new Date(date), locale);

  return (
    <>
      <aside className={styles["toc-wrapper"]}>
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
        <div className={styles["mobile-toc-wrapper"]}>
          <MobileToc tocHtml={tocHtml} />
        </div>
        <div
          className={`markdown-body ${styles["markdown-body"]}`}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </>
  );
}
