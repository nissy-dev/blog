"use client";

import { use } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { useI18n } from "../i18n/client";
import { ThemeContext } from "../theme/theme";

import styles from "./ThemeSwitchButton.module.css";

export const ThemeSwitchButton = () => {
  const { theme, updateTheme } = use(ThemeContext);
  const t = useI18n();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => updateTheme(isDark ? "light" : "dark")}
      className={styles.button}
      title={t("toggle-theme")}
      aria-label={isDark ? t("switch-light-mode") : t("switch-dark-mode")}
    >
      <FaSun className={styles.faSun} />
      <FaMoon className={styles.faMoon} />
    </button>
  );
};
