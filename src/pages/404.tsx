import { css } from "@emotion/react";

import { SEO } from "../components/SEO";

export default function NotFoundPage() {
  return (
    <main>
      <SEO title={"404: Not Found"} metaDescription={"404: Not Found"} />
      <div css={style}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
      </div>
    </main>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12rem 0;
  color: var(--foreground);

  > h1 {
    font-size: 1.5rem;
  }

  > p {
    margin-top: 1rem;
  }
`;
