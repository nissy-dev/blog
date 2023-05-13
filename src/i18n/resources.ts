import en from "./dictionaries/en.json";
import ja from "./dictionaries/ja.json";

export const resources = { ja, en };
export const supportLocales = Object.keys(resources) as Locale[];
export type Locale = keyof typeof resources;
export type i18nKey = keyof typeof resources["ja"];
