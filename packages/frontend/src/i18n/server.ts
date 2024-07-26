import "server-only";

import { cache } from "react";
import { RESOURCES, type i18nKey, isSupportLocale } from "./resources";

const getLocale = cache<() => { current: string | undefined }>(() => ({
  current: undefined,
}));

export const setStaticParamsLocale = (value: string) => {
  getLocale().current = value;
};

export const getTranslation = cache(async () => {
  const currentLocale = getLocale().current;
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }
  const resource = await RESOURCES[currentLocale]();
  return { t: (key: i18nKey) => resource[key] };
});
