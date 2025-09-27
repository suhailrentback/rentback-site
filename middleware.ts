import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only guard the in-app area. Your repo uses /app/app/* for the product.
  const isAppArea = pathname.startsWith("/app/app");

  if (!isAppArea) return NextResponse.next();

  // Skip guard on onboarding page itself
  const isOnboarding = pathname.startsWith("/app/app/onboarding");
  if (isOnboarding) return NextResponse.next();

  // Demo KYC check via cookie
  const kyc = req.cookies.get("rb-kyc")?.value;
  if (kyc !== "1") {
    const url = req.nextUrl.clone();
    url.pathname = "/app/app/onboarding";
    // Optional: carry return URL
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/app/app/:path*",
  ],
};
