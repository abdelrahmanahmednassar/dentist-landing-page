import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
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
