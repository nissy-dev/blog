import { css } from "@emotion/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  locale: string;
};

const ArticleListItem = () => {
  return <article></article>;
};

export default function Home({ posts }) {
  return <div css={style}>My page</div>;
}

export const getStaticProps = async ({ locale }: Props) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "footer"])),
  },
});

const style = css`
  font-size: 30px;
`;
