"use client";

import { type ReactNode, createContext, use, useCallback } from "react";

import { DEFAULT_LOCALE, type Locale, type i18nKey } from "./resources";

type Context = {
  locale: Locale;
  resource: Record<i18nKey, string> | null;
};

const I18nContext = createContext<Context>({
  locale: DEFAULT_LOCALE,
  resource: null,
});

export const I18nProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: Context;
}) => {
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = (): {
  t: (key: i18nKey) => string;
  locale: Locale;
} => {
  const { locale, resource } = use(I18nContext);
  if (!resource) {
    throw new Error("Resource is not loaded yet");
  }

  const translate = useCallback(
    (key: i18nKey) => {
      return resource[key];
    },
    [resource]
  );
  return { t: translate, locale };
};
