import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This middleware runs before routing. If the request host is status.rentback.app,
// we always serve the /status page (but we let _next assets pass through).
export function middleware(req: NextRequest) {
  const hostname = req.nextUrl.hostname; // e.g. "status.rentback.app", "www.rentback.app"

  if (hostname === "status.rentback.app") {
    const url = req.nextUrl.clone();

    // Always rewrite to the status page on this subdomain
    url.pathname = "/status";

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Run for everything except Next.js static/image assets and favicon
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
