// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // Run on everything except static assets & metadata routes
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.*|apple-touch-icon.*).*)",
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = (req.headers.get("host") || "").toLowerCase().split(":")[0];

  // All requests coming to app.rentback.app should see the product UI
  // We keep the URL pretty ("/") and serve content from "/app" via REWRITE.
  if (host === "app.rentback.app" || host.startsWith("app.")) {
    // Pretty root → serve /app
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/app";
      return NextResponse.rewrite(url);
    }
    // Optional nicety: if someone types /app on the subdomain, redirect to pretty "/"
    if (url.pathname === "/app") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Everything else (rentback.app) falls through to your landing site.
  return NextResponse.next();
}
