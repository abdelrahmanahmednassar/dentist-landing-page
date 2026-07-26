import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (now fully localized under [locale])
  if (pathname.includes("/admin")) {
    const isLoginPage = pathname.includes("/admin/login");
    const token = request.cookies.get(COOKIE_NAME)?.value;
    let user = null;

    if (token) {
      user = await verifySessionToken(token);
    }

    if (isLoginPage) {
      if (user) {
        const dashboardUrl = new URL(pathname.replace("/login", ""), request.url);
        return NextResponse.redirect(dashboardUrl);
      }
    } else {
      if (!user) {
        const localePrefix = pathname.startsWith("/en") ? "/en" : "/ar";
        const loginUrl = new URL(`${localePrefix}/admin/login`, request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/"],
};
