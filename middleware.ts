import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // status.rentback.app -> /status
  if (host.startsWith("status.")) {
    if (url.pathname !== "/status") {
      url.pathname = "/status";
      return NextResponse.rewrite(url);
    }
  }

  // app.rentback.app -> /app
  if (host.startsWith("app.")) {
    if (!url.pathname.startsWith("/app")) {
      url.pathname = "/app";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icons|manifest.json|api).*)"],
};
