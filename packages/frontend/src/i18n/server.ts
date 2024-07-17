import "server-only";

import { headers } from "next/headers";
import { RESOURCES, type i18nKey, isSupportLocale } from "./resources";

export const LOCALE_HEADER = "X-Next-Locale";

export const getTranslation = async () => {
  const currentLocale = headers().get(LOCALE_HEADER);
  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }
  const resource = await RESOURCES[currentLocale]();
  return { t: (key: i18nKey) => resource[key] };
};
