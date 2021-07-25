import { css, Global } from "@emotion/react";

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

      /* my global styles */
      :root {
        /* font */
        --font-body: "Helvetica Neue", "Noto Sans", Arial, sans-serif;
        /* font-weight */
        --fontWeight-medium: 500;
        --fontWeight-semibold: 600;
        --fontWeight-bold: 700;
        /* font-size */
        /* --fontSize-root: 16px; */
        /* --fontSize-1: 1rem;
        --fontSize-2: 1.2rem;
        --fontSize-3: 1.44rem;
        --fontSize-4: 1.728rem;
        --fontSize-5: 2.074rem; */
        /* color */
        --black: #000000;
        --white: #ffffff;
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
      }

      body {
        font-family: var(----font-body);
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
