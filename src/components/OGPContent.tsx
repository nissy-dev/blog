import { css, Global } from "@emotion/react";

import { siteMetadata } from "utils/const";
import { FaGithub } from "components/icons";

type Props = {
  title: string;
};

export const OGPContent = (props: Props) => (
  <html lang="ja">
    <Global styles={styles} />
    <body>
      <header>
        <span>{siteMetadata.title}</span>
      </header>
      <main>
        <div>{props.title}</div>
      </main>
      <footer>
        <div>
          <FaGithub />
          <span>{siteMetadata.github}</span>
        </div>
        {/* <div>
          <FaTwitter />
          <span>{siteMetadata.twitter}</span>
        </div> */}
      </footer>
    </body>
  </html>
);

const styles = css`
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
    font-family: -apple-system, system-ui, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
      sans-serif, "Segoe UI Emoji";
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  header {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;

    > img {
      width: 48px;
      height: 48px;
    }

    > span {
      font-size: 48px;
      font-weight: 600;
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
      font-weight: 600;
      text-align: center;
    }
  }

  footer {
    display: flex;
    flex: 1;
    justify-content: flex-end;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 24px;

      span {
        margin-left: 10px;
        font-size: 36px;
      }

      svg {
        width: 36px;
        height: 36px;
      }
    }

    /* > div:nth-child(2) > svg {
      color: rgb(29, 155, 240);
    } */
  }
`;