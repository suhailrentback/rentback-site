// app/app/actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { setRole, setKycLevel, setLang } from "@/lib/session";

/** Role switch (FormData: name="role") */
export async function setActiveRoleAction(formData: FormData) {
  const role =
    (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  await setRole(role);
  revalidatePath("/app");
}

/** Lang switch (FormData: name="lang" -> "en" | "ur") */
export async function switchLanguageAction(formData: FormData) {
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  await setLang(lang);
  revalidatePath("/app");
}

/** Theme switch (FormData: name="theme" -> "light" | "dark") — cookie-only */
export async function switchThemeAction(formData: FormData) {
  const theme = (formData.get("theme") as "light" | "dark") || "dark";
  cookies().set("rb-theme", theme, { path: "/", httpOnly: false });
  revalidatePath("/app");
}

/** KYC helpers (if you need them) */
export async function completeBasicKycAction() {
  await setKycLevel(1);
  revalidatePath("/app");
}
export async function completeFullKycAction() {
  await setKycLevel(2);
  revalidatePath("/app");
}
