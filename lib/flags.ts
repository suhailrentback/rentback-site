// lib/flags.ts
export const flags = {
  logging: true,       // sheet logging on/off
  demoMode: true,      // guard real charges
};

export const isProd = process.env.NODE_ENV === "production";
