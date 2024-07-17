export const RESOURCES = {
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};
export const SUPPORTED_LOCALES = Object.keys(RESOURCES) as Locale[];
export const DEFAULT_LOCALE = "ja";
export type Locale = keyof typeof RESOURCES;
export type i18nKey = keyof Awaited<
  ReturnType<(typeof RESOURCES)[typeof DEFAULT_LOCALE]>
>;

export const isSupportLocale = (
  locale: string | null | undefined
): locale is Locale =>
  locale != null && Object.keys(RESOURCES).includes(locale);
