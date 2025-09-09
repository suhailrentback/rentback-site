// lib/flags.ts
export const FLAGS = {
  DEMO_MODE: process.env.NEXT_PUBLIC_RB_DEMO_MODE === "true",
  ENABLE_REWARDS:
    process.env.NEXT_PUBLIC_RB_ENABLE_REWARDS === undefined
      ? true
      : process.env.NEXT_PUBLIC_RB_ENABLE_REWARDS === "true",
  ENABLE_REAL_PAYMENTS: process.env.NEXT_PUBLIC_RB_ENABLE_REAL_PAYMENTS === "true",
  ENABLE_QA:
    process.env.NEXT_PUBLIC_RB_ENABLE_QA === undefined
      ? true
      : process.env.NEXT_PUBLIC_RB_ENABLE_QA === "true",

  // Phase 2
  ENABLE_ADMIN:
    process.env.NEXT_PUBLIC_RB_ENABLE_ADMIN === undefined
      ? true
      : process.env.NEXT_PUBLIC_RB_ENABLE_ADMIN === "true",
  // Demo-only gate (client-visible). Set in Vercel env as needed.
  ADMIN_CODE: process.env.NEXT_PUBLIC_RB_ADMIN_CODE || "rentback-admin",
} as const;
