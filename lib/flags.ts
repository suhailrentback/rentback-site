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
      ? true // default ON for ease while piloting
      : process.env.NEXT_PUBLIC_RB_ENABLE_QA === "true",
} as const;
