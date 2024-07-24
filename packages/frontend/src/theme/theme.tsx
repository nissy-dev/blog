"use client";

import type React from "react";
import { createContext, useCallback, useEffect, useState } from "react";

type ThemeContext = {
  theme: string | null;
  updateTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
  theme: null,
  updateTheme: () => {},
});

type Theme = "light" | "dark";

const getTheme = (): Theme => {
  const localTheme = localStorage.getItem("theme");
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return localTheme === "light" || localTheme === "dark"
    ? localTheme
    : darkModeQuery.matches
      ? "dark"
      : "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const updateTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const handleThemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      updateTheme(e.matches ? "dark" : "light");
    },
    [updateTheme],
  );

  useEffect(() => {
    updateTheme(getTheme());

    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeQuery.addEventListener("change", handleThemeChange);
    return () => {
      darkModeQuery.removeEventListener("change", handleThemeChange);
    };
  }, [updateTheme, handleThemeChange]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeInitScript = () => {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: レンダリング時の theme のちらつきを防ぐために必要な script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const localTheme = localStorage.getItem('theme');
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const theme = (localTheme === 'light' || localTheme === 'dark') ?
              localTheme : darkModeQuery.matches ?
              'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
          })()
        `,
      }}
    />
  );
};
