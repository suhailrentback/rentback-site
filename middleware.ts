import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.nextUrl.hostname; // e.g. status.rentback.app
  if (hostname === "status.rentback.app") {
    const url = req.nextUrl.clone();
    url.pathname = "/status";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
