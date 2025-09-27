import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /app/*
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const raw = req.cookies.get("rb_session")?.value;
  if (!raw) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("e", "no-session");
    return NextResponse.redirect(url);
  }

  // Try to read KYC; if bad cookie, send to sign-in to clear it
  let kycLevel = 0;
  try {
    const u = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as { kycLevel?: number };
    kycLevel = (u.kycLevel ?? 0) as number;
  } catch {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("e", "bad-cookie");
    return NextResponse.redirect(url);
  }

  // Gate onboarding for KYC < 1
  if (kycLevel < 1 && !pathname.startsWith("/app/onboarding")) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/onboarding";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
