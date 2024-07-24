import { siteMetaData } from "@blog/libs/constant";
import { FaGithub } from "react-icons/fa";

type Props = {
  html: string;
};

export const OGHtml = (props: Props) => (
  <html lang="ja">
    <head>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500;700&display=swap");
        html,
        body {
          width: calc(1200px - 75px * 2);
          height: calc(630px - 50px * 2);
          margin: 0;
        }
      `}</style>
    </head>
    <body
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "'M PLUS 1p', sans-serif",
        fontWeight: 500,
        wordWrap: "break-word",
        overflowWrap: "break-word",
        padding: "50px 75px",
      }}
    >
      <header
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ef6c35",
          }}
        >
          {siteMetaData.title}
        </span>
      </header>
      <main
        style={{
          display: "flex",
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
          padding: "0 50px",
        }}
      >
        <div
          style={{
            fontSize: "54px",
            fontWeight: 700,
            textAlign: "center",
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ビルド時に生成される内容なので問題ない
          dangerouslySetInnerHTML={{ __html: props.html }}
        />
      </main>
      <footer
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <FaGithub
          style={{
            width: "36px",
            height: "36px",
          }}
        />
        <span
          style={{
            fontSize: "36px",
          }}
        >
          {siteMetaData.github}
        </span>
      </footer>
    </body>
  </html>
);
