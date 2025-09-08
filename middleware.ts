// middleware.ts (at the project root)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";

  // Only rewrite when visiting the status subdomain
  if (host.startsWith("status.")) {
    if (url.pathname !== "/status") {
      url.pathname = "/status";
      return NextResponse.rewrite(url);
    }
  }

  // Otherwise, do nothing (let /privacy, /terms, etc. work)
  return NextResponse.next();
}

// Run on all paths but exclude Next assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
