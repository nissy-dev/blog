import { css } from "@emotion/react";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t: taria } = useTranslation("aria-label");
  const { t: tcom } = useTranslation("common");
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      css={buttonStyle}
      title={tcom("toggle-theme")}
      aria-label={isDark ? taria("switch-light-mode") : taria("switch-dark-mode")}
    >
      {isDark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
    </button>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 1.5rem;
  color: var(--foreground);
`;
