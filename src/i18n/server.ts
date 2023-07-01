import "server-only";

import { RESOURCES, Locale, i18nKey, isSupportLocale } from "./resources";

export const getTranslation = (locale: Locale) => {
  if (!isSupportLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return { t: (key: i18nKey) => RESOURCES[locale][key] };
};
