// /lib/session.ts
"use server";

import { cookies } from "next/headers";

export type RBUser = {
  id: string;                 // mock id for now
  roles: Array<"tenant" | "landlord" | "admin">;
  activeRole: "tenant" | "landlord" | "admin";
  kycLevel: 0 | 1 | 2;        // 0=none, 1=basic, 2=verified
  lang: "en" | "ur";
};

// Read the current user from cookies (mock session)
export async function getUser(): Promise<RBUser | null> {
  const jar = await cookies();
  if (jar.get("rb_auth")?.value !== "1") return null;

  const rolesCookie = jar.get("rb_roles")?.value ?? "tenant";
  const roles = rolesCookie.split(",").filter(Boolean) as RBUser["roles"];

  const activeRole =
    (jar.get("rb_activeRole")?.value as RBUser["activeRole"]) ||
    (roles.includes("tenant") ? "tenant" : roles[0] || "tenant");

  const kycLevel = Number(jar.get("rb_kyc")?.value ?? "0") as RBUser["kycLevel"];
  const lang = ((jar.get("rb_lang")?.value as RBUser["lang"]) ?? "en") as "en" | "ur";

  return {
    id: jar.get("rb_uid")?.value || "demo-user",
    roles: roles.length ? roles : ["tenant"],
    activeRole,
    kycLevel,
    lang,
  };
}

// Mutators (used by onboarding + header role switcher)
export async function setRole(role: RBUser["activeRole"]) {
  const jar = await cookies();
  jar.set("rb_activeRole", role, { path: "/" });
}

export async function setKycLevel(level: RBUser["kycLevel"]) {
  const jar = await cookies();
  jar.set("rb_kyc", String(level), { path: "/" });
}

export async function setLang(lang: RBUser["lang"]) {
  const jar = await cookies();
  jar.set("rb_lang", lang, { path: "/" });
}

// Dev helper: "log in" without real auth (landing button will set these)
export async function devLogin({
  roles = ["tenant"],
  activeRole,
  kycLevel = 0,
  lang = "en",
}: {
  roles?: RBUser["roles"];
  activeRole?: RBUser["activeRole"];
  kycLevel?: RBUser["kycLevel"];
  lang?: RBUser["lang"];
}) {
  const jar = await cookies();
  jar.set("rb_auth", "1", { path: "/" });
  jar.set("rb_uid", "demo-user", { path: "/" });
  jar.set("rb_roles", roles.join(","), { path: "/" });
  jar.set(
    "rb_activeRole",
    activeRole || (roles.includes("tenant") ? "tenant" : roles[0]),
    { path: "/" }
  );
  jar.set("rb_kyc", String(kycLevel), { path: "/" });
  jar.set("rb_lang", lang, { path: "/" });
}

export async function devLogout() {
  const jar = await cookies();
  ["rb_auth", "rb_uid", "rb_roles", "rb_activeRole", "rb_kyc", "rb_lang"].forEach((n) =>
    jar.delete(n)
  );
}
