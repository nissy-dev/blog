import { css, Global } from "@emotion/react";

const globalCSS = css`
  html,
  body {
    margin: 10px;
    background: "white";
  }
`;

export const globalStyles = <Global styles={globalCSS} />;
