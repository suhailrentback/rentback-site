// lib/session.ts
"use server";

import { cookies } from "next/headers";

export type Role = "tenant" | "landlord" | "admin";
export type Lang = "en" | "ur";
export type KycLevel = 0 | 1 | 2;

export type User = {
  roles: Role[];
  activeRole: Role;
  kycLevel: KycLevel;
  lang: Lang;
};

const COOKIE_NAME = "rb_session";

function encode(v: unknown) {
  return Buffer.from(JSON.stringify(v)).toString("base64url");
}
function decode<T>(raw: string): T | null {
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

/** Read current user session from the signed cookie (unsiged here for demo). */
export async function getUser(): Promise<User | null> {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return null;
  const parsed = decode<User>(c);
  if (!parsed) return null;
  // very light validation
  if (!parsed.activeRole || !parsed.roles?.length) return null;
  return parsed;
}

/** Dev/demo login: write a cookie the middleware & server can read. */
export async function devLogin(u: User): Promise<void> {
  const value = encode(u);
  cookies().set({
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60 * 24 * 30, // 30 days (optional)
  });
}

/** Clear the session. */
export async function logout(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}
