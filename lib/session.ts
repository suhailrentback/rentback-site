// lib/session.ts
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

// ---- server helpers (used by pages/actions) ----
export async function getUser(): Promise<User | null> {
  try {
    const raw = cookies().get("rb_user")?.value;
    if (!raw) return null;
    const u = JSON.parse(raw) as User;
    return u ?? null;
  } catch {
    return null;
  }
}

export async function devLogin(u: User): Promise<void> {
  // Non-HTTPOnly so middleware (edge) can read it easily; fine for demo.
  cookies().set("rb_user", JSON.stringify(u), {
    path: "/",
    sameSite: "lax",
    secure: true,
    // no httpOnly on purpose (edge middleware can't read server httpOnly cookies)
  });
}

export async function devLogout(): Promise<void> {
  cookies().delete("rb_user");
}
