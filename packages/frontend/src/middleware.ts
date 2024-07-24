import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./i18n/resources";

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

  if (pathname === "/" || pathname.startsWith("/tag") || pathname.startsWith("/post")) {
    return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    // https://next-international.vercel.app/docs/app-setup#setup-middleware
    "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
  ],
};
