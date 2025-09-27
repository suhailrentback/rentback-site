// lib/session.ts
import { cookies } from "next/headers";

export type Role = "tenant" | "landlord" | "admin";
export type Lang = "en" | "ur";
export type KycLevel = 0 | 1 | 2;

export type User = {
  id: string;
  roles: Role[];
  activeRole: Role;
  kycLevel: KycLevel;
  lang: Lang;
};

const COOKIE_NAME = "rb_session";

export async function getUserOrNull(): Promise<User | null> {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return null;
  try {
    return JSON.parse(c) as User;
  } catch {
    return null;
  }
}

export async function getUser(): Promise<User> {
  const u = await getUserOrNull();
  if (!u) throw new Error("NO_SESSION");
  return u;
}

export async function setSession(user: User): Promise<void> {
  cookies().set(COOKIE_NAME, JSON.stringify(user), {
    httpOnly: false, // demo only
    sameSite: "lax",
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}
