import React from "react";

import { FaGithub } from "../src/components/Icons";
import { siteMetadata } from "../src/const";

type Props = {
  html: string;
};

export const OGPContent = (props: Props) => (
  <html lang="ja">
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head>
      <style>
        {`@import url("https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500;700&display=swap");
html,
body {
  width: calc(1200px - 75px * 2);
  height: calc(630px - 50px * 2);
  margin: 0;
}`}
      </style>
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
          {siteMetadata.title}
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
          {siteMetadata.github}
        </span>
      </footer>
    </body>
  </html>
);
