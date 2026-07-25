import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = request.cookies.get(COOKIE_NAME)?.value;
    let user = null;

    if (token) {
      user = await verifySessionToken(token);
    }

    if (isLoginPage) {
      if (user) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    } else {
      if (!user) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Get locale from cookie
  const locale = request.cookies.get("locale")?.value || "ar";

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  // Return response with updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
