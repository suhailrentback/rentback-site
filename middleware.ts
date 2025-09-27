// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Redirect any /app/* request to /app/onboarding if KYC < 1.
 * We store KYC as a lightweight cookie "rb_kyc" ("0" or "1") via a server action.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /app/* routes
  if (!pathname.startsWith("/app")) return NextResponse.next();

  // Allow the onboarding route itself
  if (pathname.startsWith("/app/onboarding")) return NextResponse.next();

  // Read KYC cookie (set by completeBasicKycAction)
  const kycCookie = req.cookies.get("rb_kyc")?.value ?? "0";
  const kycLevel = Number(kycCookie) || 0;

  if (kycLevel < 1) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/onboarding";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
