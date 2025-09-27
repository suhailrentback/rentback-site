// lib/session.ts
// Minimal cookie-based demo session utilities for App Router (Next 13/14)

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
  fullName?: string;
};

const COOKIE_NAME = "rb_session";

// --- internal helpers ---
function parseCookie(): User | null {
  try {
    const raw = cookies().get(COOKIE_NAME)?.value;
    if (!raw) return null;
    // store plain JSON in the cookie for the demo
    const obj = JSON.parse(raw);
    return obj as User;
  } catch {
    return null;
  }
}

function writeCookie(user: User | null) {
  const jar = cookies();
  if (!user) {
    jar.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
    return;
  }
  jar.set(COOKIE_NAME, JSON.stringify(user), {
    path: "/",
    httpOnly: false, // demo: allow reading on client if ever needed
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

// --- public API ---

/** Returns the current user or null (never throws). */
export async function getUserOrNull(): Promise<User | null> {
  return parseCookie();
}

/** Returns the current user or throws (use in server components). */
export async function getUser(): Promise<User> {
  const u = parseCookie();
  if (!u) throw new Error("No session");
  return u;
}

/** Overwrites the entire session with the given user object. */
export async function setSession(user: User): Promise<void> {
  writeCookie(user);
}

/** Applies a shallow patch to the current session (no-op if no session). */
export async function updateSession(patch: Partial<User>): Promise<void> {
  const current = parseCookie();
  if (!current) return;
  writeCookie({ ...current, ...patch });
}

/** Clears the session cookie. */
export async function clearSession(): Promise<void> {
  writeCookie(null);
}

/**
 * Dev-only login helper: creates a session quickly.
 * Call this from your sign-in action with minimal fields.
 */
export async function devLogin(input: {
  role: Role;
  lang: Lang;
  fullName?: string;
  kycLevel?: KycLevel; // default 0
}) {
  const user: User = {
    id: "demo-" + Math.random().toString(36).slice(2, 8),
    roles: [input.role],
    activeRole: input.role,
    lang: input.lang,
    kycLevel: input.kycLevel ?? 0,
    fullName: input.fullName,
  };
  writeCookie(user);
  return user;
}
