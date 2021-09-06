import { Header } from "./Header";
import { Footer } from "./Footer";
import { Search } from "./Search";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Search />
      {children}
      <Footer />
    </>
  );
};
