import { Locale } from "utils/useTranslation";

export const dateFormat = (date: Date, locale: Locale) => {
  const intlDateFormat = Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return intlDateFormat.format(date);
};
