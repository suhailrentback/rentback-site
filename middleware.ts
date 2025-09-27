// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "rb_session";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // TEMP: allow public preview if ?preview=1 is present
  const preview = searchParams.get("preview") === "1";

  // Public routes (allowed without a session)
  const publicPrefixes = [
    "/",
    "/sign-in",
    "/_next",
    "/api/health",
    "/robots.txt",
    "/sitemap.xml",
    "/privacy",
    "/terms",
    "/legal",
    "/founder",
    "/status",

    // TEMP preview: allow dashboards if preview=1
    ...(preview ? ["/app/admin", "/app/tenant", "/app/landlord"] : []),
  ];
  if (publicPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Protect /app* — require session cookie
  if (pathname.startsWith("/app")) {
    const hasSession = req.cookies.get(SESSION_COOKIE)?.value;
    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Use a non-capturing group in the matcher (Next.js requirement)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)',
  ],
};
