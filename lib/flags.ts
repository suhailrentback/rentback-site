// lib/flags.ts
export type Flags = {
  ENABLE_ADMIN: boolean;
  ADMIN_CODE: string;
};

export const FLAGS: Flags = {
  // Toggle admin drawer item (client-visible, so we use NEXT_PUBLIC_* vars)
  ENABLE_ADMIN: (process.env.NEXT_PUBLIC_ENABLE_ADMIN ?? "1") === "1",
  // Simple gate for /admin (prompt code). Change in Vercel env to rotate.
  ADMIN_CODE: process.env.NEXT_PUBLIC_ADMIN_CODE ?? "0007",
};
