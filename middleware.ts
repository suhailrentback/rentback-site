import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // app.<domain> → only send "/" to /app
  if (host.startsWith("app.")) {
    if (url.pathname === "/") {
      url.pathname = "/app";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // status.<domain> → everything (except assets) goes to /status
  if (host.startsWith("status.")) {
    // allow assets to pass
    if (
      url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/favicon") ||
      url.pathname.startsWith("/og")
    ) {
      return NextResponse.next();
    }
    url.pathname = "/status";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // run on everything except static assets & api routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
