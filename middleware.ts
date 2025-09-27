import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /app/* here. Public site stays public.
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const raw = req.cookies.get("rb_session")?.value;
  // no session -> go to sign-in
  if (!raw) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("e", "1");
    return NextResponse.redirect(url);
  }

  // read KYC and active role so we can gate onboarding
  let kycLevel = 0;
  try {
    const u = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as {
      kycLevel?: number;
      activeRole?: string;
    };
    kycLevel = (u.kycLevel ?? 0) as number;
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("e", "2"); // bad cookie
    return NextResponse.redirect(url);
  }

  // If KYC < 1 and not already on onboarding, send to onboarding
  if (kycLevel < 1 && !pathname.startsWith("/app/onboarding")) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/onboarding";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Simple matcher — don’t try to hand-exclude static assets with regex
  matcher: ["/app/:path*"],
};
