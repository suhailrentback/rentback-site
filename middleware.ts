import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (host.startsWith("status.")) {
    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith("/status")) url.pathname = "/status";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

