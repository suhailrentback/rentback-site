// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Only require an authenticated session for /app/*.
 * Do NOT gate by KYC here anymore — KYC is enforced in-page via <KycPrompt />.
 *
 * NOTE: If your session cookie name is different, update RB_SESSION_COOKIE below.
 */
const RB_SESSION_COOKIE = "rb_session";

export const config = {
  matcher: ["/app/:path*"],
};

export function middleware(req: NextRequest) {
  const hasSession = Boolean(req.cookies.get(RB_SESSION_COOKIE)?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
