import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./i18n/resources";
import { LOCALE_HEADER } from "./i18n/server";

const extractLocale = (headers: Negotiator.Headers) => {
  return (
    new Negotiator({ headers }).language(SUPPORTED_LOCALES) ?? DEFAULT_LOCALE
  );
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = SUPPORTED_LOCALES.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
  };
  const locale = extractLocale(headers);

  // Redirect if there is no locale
  if (pathnameIsMissingLocale && locale !== DEFAULT_LOCALE) {
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }

  // Set the locale header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"
  ],
};
