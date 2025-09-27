// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "rb_session";

// Protect everything under /app from anonymous access.
// Also allow assets, API, public pages to pass.
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Allow public routes
  const publicPrefixes = [
    "/_next",
    "/api/health",
    "/robots.txt",
    "/sitemap.xml",
    "/privacy",
    "/terms",
    "/legal",
    "/founder",
    "/status",
    "/",
    "/sign-in",
  ];

  if (publicPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Gate /app*
  if (pathname.startsWith("/app")) {
    const hasSession = req.cookies.get(SESSION_COOKIE)?.value;
    if (!hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.search = `?next=${encodeURIComponent(pathname + search)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|webp)).*)"],
};
