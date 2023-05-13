import "server-only";

import { resources, supportLocales, Locale, i18nKey } from "./resources";

export const getTranslation = (locale: Locale) => {
  if (!supportLocales.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  return { t: (key: i18nKey) => resources[locale][key] };
};
