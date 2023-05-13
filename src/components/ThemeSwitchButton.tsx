"use client";

import { useTheme } from "next-themes";

import { useTranslation } from "../i18n/client";

import { FaMoon, FaSun } from "./Icons";
import styles from "./ThemeSwitchButton.module.scss";

export const ThemeSwitchButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={styles.button}
      title={t("toggle-theme")}
      aria-label={isDark ? t("switch-light-mode") : t("switch-dark-mode")}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};
