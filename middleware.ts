// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PUBLIC = new Set<string>([
  "/", "/sign-in", "/privacy", "/terms", "/founder",
  "/robots.txt", "/sitemap.xml", "/api/health",
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public + static assets
  if (
    PUBLIC.has(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/legal/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Gate /app/*
  if (pathname.startsWith("/app")) {
    // Read our demo cookie
    let user: { kycLevel?: number } | null = null;
    try {
      const raw = req.cookies.get("rb_user")?.value;
      if (raw) user = JSON.parse(raw);
    } catch {}

    // No session → go to sign-in (NOT “/”)
    if (!user) {
      const url = new URL("/sign-in", req.url);
      return NextResponse.redirect(url);
    }

    // KYC guard → force onboarding
    if (typeof user.kycLevel !== "number" || user.kycLevel < 1) {
      if (!pathname.startsWith("/app/onboarding")) {
        const url = new URL("/app/onboarding", req.url);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
