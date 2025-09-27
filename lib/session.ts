// lib/session.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Role = "tenant" | "landlord" | "admin";
export type Lang = "en" | "ur";
export type KycLevel = 0 | 1 | 2;

export type User = {
  id: string;
  roles: Role[];
  activeRole: Role;
  kycLevel: KycLevel;
  lang: Lang;
  fullName?: string;
};

const COOKIE_NAME = "rb_session";

function parseCookie(): User | null {
  try {
    const c = cookies().get(COOKIE_NAME)?.value;
    if (!c) return null;
    const data = JSON.parse(Buffer.from(c, "base64").toString("utf8")) as User;
    // minimal sanity checks
    if (!data || !data.activeRole || !Array.isArray(data.roles)) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCookie(user: User) {
  const payload = Buffer.from(JSON.stringify(user), "utf8").toString("base64");
  cookies().set({
    name: COOKIE_NAME,
    value: payload,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    // secure is automatically enforced on Vercel prod
  });
}

export async function getUser(): Promise<User | null> {
  return parseCookie();
}

export async function requireUser(): Promise<User> {
  const user = parseCookie();
  if (!user) redirect("/sign-in");
  return user!;
}

export async function setSession(user: User): Promise<void> {
  writeCookie(user);
}

export async function clearSession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}

// convenience helpers
export async function setActiveRole(role: Role): Promise<void> {
  const u = parseCookie();
  if (!u) redirect("/sign-in");
  const next = { ...u!, activeRole: role };
  writeCookie(next);
}

export async function setLang(lang: Lang): Promise<void> {
  const u = parseCookie();
  if (!u) redirect("/sign-in");
  const next = { ...u!, lang };
  writeCookie(next);
}
