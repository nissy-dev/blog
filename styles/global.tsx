// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css, Global } from "@emotion/react";
import resetCss from "the-new-css-reset/css/reset.css";
import codeBlockStyle from "highlight.js/styles/nord.css";
import githubMarkdownCss from "github-markdown-css/github-markdown.css";

export const GlobalStyle = () => (
  <Global
    styles={css`
      /* load reset css for user-agent stylesheet */
      ${resetCss}

      /* load github markdown css */
      ${githubMarkdownCss}

      /* load theme for code block */
      ${codeBlockStyle}

      /* my global styles */
      :root {
        /* font: https://zenn.dev */
        --font-body: -apple-system, system-ui, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
          sans-serif, "Segoe UI Emoji";
        /* font-weight */
        --font-bold: 600;
        /* color */
        --base: #ef6c35;
        --black: #000000;
        --white: #ffffff;
        --gray: #616161;
        --light-gray: #eeeeee;
        --light-blue: #3b82f6;
        --background: var(--white);
        --foreground: var(--black);
      }

      [data-theme="dark"] {
        --background: var(--black);
        --foreground: var(--white);
      }

      html {
        line-height: 1.5;
        font-size: 15px;
        font-family: var(----font-body);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        margin-left: auto;
        margin-right: auto;
        max-width: 50rem;
        padding: 0 2rem;
      }

      a,
      button {
        cursor: pointer;
      }

      a:hover {
        text-decoration: underline;
      }
    `}
  />
);
