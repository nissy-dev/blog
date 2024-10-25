import type { Locale } from "../i18n";

export const dateFormat = (date: Date, locale: Locale) => {
  const intlDateFormat = Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return {
    dateDisplayString: intlDateFormat.format(date),
    dateISOString: date.toISOString(),
  };
};
