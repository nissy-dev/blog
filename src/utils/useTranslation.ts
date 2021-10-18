import { useRouter } from "next/router";

import ja from "../../public/locales/ja.json";
import en from "../../public/locales/en.json";

const resources = { ja, en };
const defaultLocale = "ja";

export type Locale = keyof typeof resources;

type i18nKey = keyof typeof resources["ja"];

export const supportLocales = Object.keys(resources) as Locale[];

const isSupportLocale = (locale: string | undefined): locale is Locale =>
  locale !== undefined && Object.keys(resources).includes(locale);

export const useTranslation = (): {
  t: (key: i18nKey) => string;
  locale: Locale;
} => {
  const { locale } = useRouter();
  const currentLocale = isSupportLocale(locale) ? locale : defaultLocale;

  const translate = (key: i18nKey) => {
    return resources[currentLocale][key];
  };
  return { t: translate, locale: currentLocale };
};
