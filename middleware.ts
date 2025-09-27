// middleware.ts — TEMP: no auth/KYC gating so pages never 500
export function middleware() {
  // intentionally no-op
}

// Match nothing (effectively disabled)
export const config = {
  matcher: [],
};
