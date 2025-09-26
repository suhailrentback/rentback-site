// app/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { setRole, setKycLevel, setLang } from "@/lib/session";

/**
 * Accepts FormData from <form action={setActiveRole}> with a <select name="role">
 */
export async function setActiveRole(formData: FormData) {
  const role =
    (formData.get("role") as "tenant" | "landlord" | "admin") || "tenant";
  await setRole(role);
  revalidatePath("/app");
}

/**
 * KYC level 1 is enough to enter /app (Raast/bank transfer enabled)
 */
export async function completeBasicKyc() {
  await setKycLevel(1);
  revalidatePath("/app");
}

/**
 * Optional: KYC level 2 for higher limits/cards/payouts
 */
export async function completeFullKyc() {
  await setKycLevel(2);
  revalidatePath("/app");
}

/**
 * Accepts FormData from <form action={switchLang}> with a hidden <input name="lang">
 */
export async function switchLang(formData: FormData) {
  const lang = (formData.get("lang") as "en" | "ur") || "en";
  await setLang(lang);
  revalidatePath("/app");
}
