import { cookies } from "next/headers";

export type Role = "tenant" | "landlord" | "admin";
export type KycLevel = 0 | 1 | 2;

export type User = {
  id: string;
  roles: Role[];
  activeRole: Role;
  kycLevel: KycLevel;
  lang: "en" | "ur";
  name?: string;
};

export async function getUserOrNull(): Promise<User | null> {
  try {
    const raw = cookies().get("rb_session")?.value;
    if (!raw) return null;

    const data = JSON.parse(raw);

    // Minimal validation + defaults (prevents redirect loops)
    const roles = (Array.isArray(data.roles) && data.roles.length ? data.roles : ["tenant"]) as Role[];
    const activeRole: Role = (["tenant","landlord","admin"].includes(data.activeRole) ? data.activeRole : roles[0]) as Role;
    const kycLevel: KycLevel = ([0,1,2].includes(data.kycLevel) ? data.kycLevel : 0) as KycLevel;
    const lang: "en" | "ur" = (data.lang === "ur" ? "ur" : "en");
    const id = typeof data.id === "string" ? data.id : "anon";
    const name = typeof data.name === "string" ? data.name : undefined;

    return { id, roles, activeRole, kycLevel, lang, name };
  } catch {
    return null;
  }
}
