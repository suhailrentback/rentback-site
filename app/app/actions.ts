// app/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { setRole, setKycLevel, setLang } from "@/lib/session";

/** <form action={setActiveRoleAction}> expects FormData with name="role" */
export async function setActiveRoleAction(formData: FormData) {
  const role =
    (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  await setRole(role);
  revalidatePath("/app");
}

/** KYC level 1: unlock rent payments & rewards */
export async function completeBasicKycAction() {
  await setKycLevel(1);
  revalidatePath("/app");
}

/** KYC level 2: higher limits/cards/payouts */
export async function completeFullKycAction() {
  await setKycLevel(2);
  revalidatePath("/app");
}

/** <form action={switchLanguageAction}> expects hidden input name="lang" */
export async function switchLanguageAction(formData: FormData) {
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  await setLang(lang);
  revalidatePath("/app");
}
