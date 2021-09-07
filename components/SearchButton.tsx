import { css } from "@emotion/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";

type Props = {
  showSearchBox: boolean;
  onClick: () => void;
};

export const SearchButton = (props: Props) => {
  const { onClick, showSearchBox } = props;
  const { t: tcom } = useTranslation("common");
  const { t: taria } = useTranslation("aria-label");
  return (
    <button
      type="button"
      onClick={onClick}
      css={buttonStyle}
      title={tcom("search-box")}
      aria-label={showSearchBox ? taria("close-search-box") : taria("open-search-box")}
    >
      <FontAwesomeIcon icon={faSearch} />
    </button>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  color: var(--foreground);
`;
