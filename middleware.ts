import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApp = pathname.startsWith("/app/app");
  const isOnboarding = pathname.startsWith("/app/app/onboarding");

  if (isApp && !isOnboarding) {
    const kyc = req.cookies.get("rb-kyc")?.value;
    if (kyc !== "1") {
      const url = req.nextUrl.clone();
      url.pathname = "/app/app/onboarding";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/app/:path*"],
};
