import { createContext, useContext, useCallback } from "react";

import { RESOURCES, DEFAULT_LOCALE, i18nKey, isSupportLocale, Locale } from "./resources";

export const LocaleContext = createContext<string>(DEFAULT_LOCALE);

export const useTranslation = (): {
  t: (key: i18nKey) => string;
  locale: Locale;
} => {
  const currentLocale = useContext(LocaleContext);
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }

  const translate = useCallback(
    (key: i18nKey) => {
      return RESOURCES[currentLocale][key];
    },
    [currentLocale]
  );
  return { t: translate, locale: currentLocale };
};
