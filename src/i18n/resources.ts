import en from "./dictionaries/en.json";
import ja from "./dictionaries/ja.json";

export const RESOURCES = { ja, en };
export const SUPPORTED_LOCALES = Object.keys(RESOURCES) as Locale[];
export const DEFAULT_LOCALE = "ja";
export type Locale = keyof typeof RESOURCES;
export type i18nKey = keyof typeof RESOURCES["ja"];
