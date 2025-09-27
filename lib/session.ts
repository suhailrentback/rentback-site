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

const KEY = "rb_user";

// --- core helpers ---
export function readUser(): User | null {
  try {
    const v = cookies().get(KEY)?.value;
    if (!v) return null;
    const p = JSON.parse(v);
    const user: User = {
      id: p.id || "dev",
      roles: (p.roles as RBRole[]) || ["tenant"],
      activeRole: (p.activeRole as RBRole) || "tenant",
      kycLevel: (p.kycLevel as 0 | 1 | 2) ?? 0,
      lang: (p.lang as Lang) || "en",
      fullName: p.fullName,
    };
    return user;
  } catch {
    return null;
  }
}

export function writeUser(u: User) {
  cookies().set(KEY, JSON.stringify(u), {
    httpOnly: false, // demo only; set true when you move to real auth
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearUser() {
  cookies().delete(KEY);
}

// --- compatibility shim ---
// Many pages still `import { getUser } from "@/lib/session"` and sometimes `await getUser()`.
export async function getUser(): Promise<User | null> {
  return readUser();
}
