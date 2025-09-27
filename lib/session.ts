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
    if (!data?.activeRole || !Array.isArray(data.roles)) return null;
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
  });
}

export async function getUser(): Promise<User | null> {
  return parseCookie();
}

export async function requireUser(): Promise<User> {
  const u = parseCookie();
  if (!u) redirect("/sign-in");
  return u!;
}

export async function setSession(user: User): Promise<void> {
  writeCookie(user);
}

export async function clearSession(): Promise<void> {
  cookies().delete(COOKIE_NAME);
}
