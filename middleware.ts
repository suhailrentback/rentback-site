// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Very small cookie-based "session" so non-technical founders can test now.
// In production, replace with real auth/session and JWT or NextAuth.
function readCookie(req: NextRequest, name: string): string | null {
  return req.cookies.get(name)?.value ?? null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only care about product area
  if (!pathname.startsWith("/app")) return NextResponse.next();

  // "Logged in" if rb_auth=1 cookie exists
  const isAuthed = readCookie(req, "rb_auth") === "1";

  if (!isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "1");
    return NextResponse.redirect(url);
  }

  // kycLevel: "0" | "1" | "2"
  const kycLevel = Number(readCookie(req, "rb_kyc") ?? "0");
  const needsOnboarding = kycLevel < 1;
  const isOnboarding = pathname.startsWith("/app/onboarding");

  if (needsOnboarding && !isOnboarding) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/onboarding";
    return NextResponse.redirect(url);
  }

  if (!needsOnboarding && isOnboarding) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  // Admin gate: only allow admins into /app/admin/*
  if (pathname.startsWith("/app/admin")) {
    const roles = (readCookie(req, "rb_roles") ?? "").split(",").filter(Boolean);
    if (!roles.includes("admin")) {
      const url = req.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
