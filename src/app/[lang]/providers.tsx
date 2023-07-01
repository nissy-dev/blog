"use client";

import { ThemeProvider } from "next-themes";

import { LocaleContext } from "../../i18n/client";

export function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
  return (
    <ThemeProvider>
      <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>
    </ThemeProvider>
  );
}
