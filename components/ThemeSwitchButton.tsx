import { css } from "@emotion/react";
import { useTheme } from "next-themes";

import { FaMoon, FaSun } from "components/icons";
import { useTranslation } from "utils/useTranslation";

export const ThemeSwitchButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      css={buttonStyle}
      title={t("toggle-theme")}
      aria-label={isDark ? t("switch-light-mode") : t("switch-dark-mode")}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

const buttonStyle = css`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  color: var(--foreground);
`;
