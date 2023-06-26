import { usePathname } from "next/navigation";

import { RESOURCES, SUPPORTED_LOCALES, DEFAULT_LOCALE, Locale, i18nKey } from "./resources";

const isSupportLocale = (locale: string | undefined): locale is Locale =>
  locale !== undefined && Object.keys(RESOURCES).includes(locale);

export const useTranslation = (): {
  t: (key: i18nKey) => string;
  locale: Locale;
} => {
  const pathname = usePathname();
  const pathnameWithLocale = SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`));
  const currentLocale = pathnameWithLocale ? pathname.split("/")[1] : DEFAULT_LOCALE;

  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }

  const translate = (key: i18nKey) => {
    return RESOURCES[currentLocale][key];
  };
  return { t: translate, locale: currentLocale };
};
