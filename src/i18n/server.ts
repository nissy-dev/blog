import "server-only";

import { RESOURCES, SUPPORTED_LOCALES, Locale, i18nKey } from "./resources";

export const getTranslation = (locale: Locale) => {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return { t: (key: i18nKey) => RESOURCES[locale][key] };
};
