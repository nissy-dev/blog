import { css } from "@emotion/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main css={mainStyle}>{children}</main>
      <Footer />
    </>
  );
};

const mainStyle = css`
  padding-bottom: 3rem;
`;
