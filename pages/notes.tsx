import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";

import { MemoList } from "../components/MemoList";
import { FrontMatter, getFrontMatters } from "../lib/api";

type Props = {
  bookFrontMatters: Array<{ id: string } & FrontMatter>;
  noteFrontMatters: Array<{ id: string } & FrontMatter>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const bookFrontMatters = await getFrontMatters("book");
  const noteFrontMatters = await getFrontMatters("note");

  return {
    props: {
      bookFrontMatters,
      noteFrontMatters,
    },
  };
};

export default function Notes({ bookFrontMatters, noteFrontMatters }: Props) {
  const { t } = useTranslation();
  return (
    <main css={mainStyle}>
      <div css={headerStyle}>
        <h1>{t("private-study-note")}</h1>
      </div>
      <div css={memoListContainerStyle}>
        <MemoList title={t("reading-book-note")} frontMatters={bookFrontMatters} />
        <MemoList title={t("basic-cs-note")} frontMatters={noteFrontMatters} />
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
