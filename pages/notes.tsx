import { css } from "@emotion/react";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MemoList } from "../components/MemoList";
import { FrontMatter, getFrontMatters } from "../lib/api";

type Context = {
  locale: string;
};

type Props = {
  locale: string;
  bookFrontMatters: Array<{ id: string } & FrontMatter>;
  noteFrontMatters: Array<{ id: string } & FrontMatter>;
} & SSRConfig;

export const getStaticProps = async ({ locale }: Context): Promise<{ props: Props }> => {
  const i18nProps = await serverSideTranslations(locale, ["common", "aria-label"]);
  const bookFrontMatters = await getFrontMatters("book");
  const noteFrontMatters = await getFrontMatters("note");

  return {
    props: {
      locale,
      bookFrontMatters,
      noteFrontMatters,
      ...i18nProps,
    },
  };
};

export default function Notes({ bookFrontMatters, noteFrontMatters }: Props) {
  const { t: tcom } = useTranslation("common");
  return (
    <main css={mainStyle}>
      <div css={headerStyle}>
        <h1>{tcom("private-study-note")}</h1>
      </div>
      <div css={memoListContainerStyle}>
        <MemoList title={tcom("reading-book-note")} frontMatters={bookFrontMatters} />
        <MemoList title={tcom("basic-cs-note")} frontMatters={noteFrontMatters} />
      </div>
    </main>
  );
}

const mainStyle = css`
  padding: 3rem 0;
`;

const headerStyle = css`
  padding-bottom: 1rem;

  > h1 {
    font-size: 1.5rem;
    font-weight: var(--font-bold);
    color: var(--base);
    text-align: center;
  }
`;

const memoListContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
