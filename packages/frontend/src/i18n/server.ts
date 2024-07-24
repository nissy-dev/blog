import "server-only";

import { cache } from "react";
import { RESOURCES, type i18nKey, isSupportLocale } from "./resources";

export const LOCALE_HEADER = "X-Next-Locale";

const getLocale = cache<() => { current: string | undefined }>(() => ({
  current: undefined,
}));
const getStaticParamsLocale = () => getLocale().current;

export const setStaticParamsLocale = (value: string) => {
  getLocale().current = value;
};

export const getTranslation = async () => {
  const currentLocale = getStaticParamsLocale();
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }
  const resource = await RESOURCES[currentLocale]();
  return { t: (key: i18nKey) => resource[key] };
};
