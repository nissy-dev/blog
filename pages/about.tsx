import { css } from "@emotion/react";
import { SEO } from "../components/SEO";

export default function About() {
  return (
    <main>
      <SEO title={"Cooming Soon..."} metaDescription={"Cooming Soon..."} />
      <div css={style}>
        <h1>Coming Soon...</h1>
      </div>
    </main>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12rem 0;

  > h1 {
    font-size: 1.5rem;
  }

  > p {
    margin-top: 1rem;
  }
`;
