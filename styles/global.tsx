import { css, Global } from "@emotion/react";
// eslint-disable-next-line
// @ts-ignore
import okaidia from "prismjs/themes/prism-okaidia.css";

export const GlobalStyle = () => (
  <Global
    styles={css`
      /* reset css: https://github.com/elad2412/the-new-css-reset */
      *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
        all: unset;
        display: revert;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      ol,
      ul {
        list-style: none;
      }

      img {
        max-width: 100%;
      }

      table {
        border-collapse: collapse;
      }

      /* https://stackoverflow.com/questions/24309651/cant-override-user-agent-stylesheet-coloring-my-links */
      a {
        color: inherit;
      }

      /* load okaidia theme for prismjs */
      ${okaidia}

      /* my global styles */
      :root {
        /* font */
        --font-body: -apple-system, "BlinkMacSystemFont", "Hiragino Kaku Gothic ProN",
          "Hiragino Sans", Meiryo, sans-serif, "Segoe UI Emoji";
        --font-code: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace, Apple Color Emoji,
          Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        /* font-weight */
        --font-bold: 600;
        /* color */
        --base: #ef6c35;
        /* --base: #000000; */
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
        font-size: 16px;
        font-family: var(----font-body);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @media screen and (max-width: 640px) {
          font-size: 12px;
        }
      }

      body {
        margin-left: auto;
        margin-right: auto;
        max-width: 48rem;
        padding: 0 1rem;
      }

      a,
      button {
        cursor: pointer;
      }
    `}
  />
);
