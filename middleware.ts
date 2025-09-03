import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * If request hostname is exactly "status.rentback.app",
 * always serve the /status page (but allow static assets through).
 */
export function middleware(req: NextRequest) {
  const hostname = req.nextUrl.hostname; // e.g. "status.rentback.app"
  if (hostname === "status.rentback.app") {
    const url = req.nextUrl.clone();
    url.pathname = "/status";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// Run on all paths so we also catch "/"
export const config = {
  matcher: ["/:path*"],
};
