// app/app/actions.ts
"use server";

import { cookies } from "next/headers";

/**
 * Marks basic KYC complete (demo): sets rb_kyc=1.
 * In production, you'd do a real check + persist in DB.
 */
export async function completeBasicKycAction(): Promise<void> {
  const c = cookies();
  // Not httpOnly so client can also read if needed for UI; flip to true in prod.
  c.set("rb_kyc", "1", { path: "/", httpOnly: false, sameSite: "lax" });
}

/**
 * Language toggle — expects a <form> with <input name="lang" value="en|ur" />
 */
export async function switchLanguageAction(formData: FormData): Promise<void> {
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  cookies().set("rb_lang", lang, { path: "/", httpOnly: false, sameSite: "lax" });
}

/**
 * Role switcher — <select name="role">tenant|landlord|admin</select>
 */
export async function setActiveRoleAction(formData: FormData): Promise<void> {
  const role = (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  cookies().set("rb_role", role, { path: "/", httpOnly: false, sameSite: "lax" });
}
