import { usePathname } from "next/navigation";

import { resources, supportLocales, Locale, i18nKey } from "./resources";

const defaultLocale = "ja";

const isSupportLocale = (locale: string | undefined): locale is Locale =>
  locale !== undefined && Object.keys(resources).includes(locale);

export const useTranslation = (): {
  t: (key: i18nKey) => string;
  locale: Locale;
} => {
  const pathname = usePathname();
  const pathnameWithLocale = supportLocales.some((locale) => pathname.startsWith(`/${locale}`));
  const currentLocale = pathnameWithLocale ? pathname.split("/")[1] : defaultLocale;

  if (!isSupportLocale(currentLocale)) {
    throw new Error(`Unsupported locale: ${currentLocale}`);
  }

  const translate = (key: i18nKey) => {
    return resources[currentLocale][key];
  };
  return { t: translate, locale: currentLocale };
};
