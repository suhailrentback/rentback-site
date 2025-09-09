// lib/flags.ts
export const FLAGS = {
  DEMO_MODE: process.env.NEXT_PUBLIC_RB_DEMO_MODE === "true",
  ENABLE_REWARDS:
    process.env.NEXT_PUBLIC_RB_ENABLE_REWARDS === undefined
      ? true
      : process.env.NEXT_PUBLIC_RB_ENABLE_REWARDS === "true",
  ENABLE_REAL_PAYMENTS: process.env.NEXT_PUBLIC_RB_ENABLE_REAL_PAYMENTS === "true",
} as const;
