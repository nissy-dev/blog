import { Footer } from "components/Footer";
import { Header } from "components/Header";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
