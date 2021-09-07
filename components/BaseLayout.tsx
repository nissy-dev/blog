import { useState } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Search } from "./Search";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const handleSearchBox = () => setShowSearchBox(!showSearchBox);

  return (
    <>
      <Header handleSearchBox={handleSearchBox} showSearchBox={showSearchBox} />
      {showSearchBox && <Search />}
      {children}
      <Footer />
    </>
  );
};
