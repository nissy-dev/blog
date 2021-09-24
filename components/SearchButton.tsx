import { css } from "@emotion/react";

import { FaSearch } from "components/icons";
import { useTranslation } from "utils/useTranslation";

type Props = {
  showSearchBox: boolean;
  onClick: () => void;
};

export const SearchButton = (props: Props) => {
  const { onClick, showSearchBox } = props;
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      css={buttonStyle}
      title={t("search-box")}
      aria-label={showSearchBox ? t("close-search-box") : t("open-search-box")}
    >
      <FaSearch />
    </button>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  color: var(--foreground);
`;
