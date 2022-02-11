// @ts-nocheck
import { css, Global } from "@emotion/react";
import githubMarkdownCss from "github-markdown-css/github-markdown.css";
import codeBlockStyle from "highlight.js/styles/nord.css";
import resetCss from "the-new-css-reset/css/reset.css";

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
        --max-width: 52rem;
        /* font: https://zenn.dev */
        --font-body: -apple-system, system-ui, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
          sans-serif, "Segoe UI Emoji";
        /* font-weight */
        --font-bold: 600;
        /* color */
        --base: #ef6c35;
        --black: #23282f;
        --gray-500: #9e9e9e;
        --gray-300: #e0e0e0;
        --gray-200: #eeeeee;
        --gray-50: #fafafa;
        --light-blue-a700: #0091ea;
        --blue-800: #1565c0;
        --blue-gray-800: #37474f;
        --background: var(--gray-50);
        --foreground: var(--black);
        --link-color: var(--blue-800);
        --code-background-color: var(--gray-200);
        --blockquote-color: var(--gray-500);
        --blockquote-border-color: var(--gray-300);
      }

      [data-theme="dark"] {
        --background: var(--black);
        --foreground: var(--gray-50);
        --link-color: var(--light-blue-a700);
        --code-background-color: var(--blue-gray-800);
      }

      html {
        font-family: var(--font-body);
        font-size: 15px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        max-width: var(--max-width);
        padding: 0 2rem;
        margin-right: auto;
        margin-left: auto;
        word-wrap: break-word;
        overflow-wrap: break-word;
        background-color: var(--background);
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
