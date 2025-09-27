// lib/session.ts
import { cookies } from "next/headers";

export type RBRole = "tenant" | "landlord" | "admin";
export type Lang = "en" | "ur";

export type User = {
  id: string;
  roles: RBRole[];
  activeRole: RBRole;
  kycLevel: 0 | 1 | 2;
  lang: Lang;
  fullName?: string;
};

const COOKIE = "rb_user";

export function getUser(): User | null {
  try {
    const c = cookies().get(COOKIE)?.value;
    if (!c) return null;
    const parsed = JSON.parse(c);
    // minimal shape guard with sane defaults
    const user: User = {
      id: parsed.id || "dev",
      roles: (parsed.roles as RBRole[]) || ["tenant"],
      activeRole: (parsed.activeRole as RBRole) || "tenant",
      kycLevel: (parsed.kycLevel as 0 | 1 | 2) ?? 0,
      lang: (parsed.lang as Lang) || "en",
      fullName: parsed.fullName,
    };
    return user;
  } catch {
    return null;
  }
}

export function setUser(u: User) {
  const value = JSON.stringify(u);
  cookies().set(COOKIE, value, {
    httpOnly: false, // TEMP for demo; switch to true when using real auth
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearUser() {
  cookies().delete(COOKIE);
}
