import { css, Global } from "@emotion/react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

import { siteMetadata } from "../src/utils/const";

type Props = {
  html: string;
};

export const OGPContent = (props: Props) => (
  <html lang="ja">
    <Global styles={styles} />
    <body>
      <header>
        <span>{siteMetadata.title}</span>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
      </main>
      <footer>
        <FaGithub />
        <span>{siteMetadata.github}</span>
      </footer>
    </body>
  </html>
);

const styles = css`
  /* TODO: 文字化けを防ぐためにGoogle Fontを読み込む */
  /* stylelint-disable-next-line no-invalid-position-at-import-rule */
  @import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500;700&display=swap");

  html,
  body {
    width: calc(1200px - 75px * 2);
    height: calc(630px - 50px * 2);
    margin: 0;
  }

  body {
    display: flex;
    flex-direction: column;
    padding: 50px 75px;
    font-family: "M PLUS 1p", sans-serif;
    font-weight: 500;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  header {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;

    > span {
      font-size: 48px;
      font-weight: 700;
      color: #ef6c35;
    }
  }

  main {
    display: flex;
    flex: 3;
    align-items: center;
    justify-content: center;
    padding: 0 50px;

    > div {
      font-size: 54px;
      font-weight: 700;
      text-align: center;
    }
  }

  footer {
    display: flex;
    flex: 1;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;

    > span {
      font-size: 36px;
    }

    > svg {
      width: 36px;
      height: 36px;
    }
  }
`;
