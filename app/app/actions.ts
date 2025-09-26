// /app/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { setRole, setKycLevel, setLang } from "@/lib/session";

export async function setActiveRole(role: "tenant" | "landlord" | "admin") {
  await setRole(role);
  revalidatePath("/app");
}

export async function completeBasicKyc() {
  // KYC level 1 is enough to enter /app (Raast/bank transfer enabled)
  await setKycLevel(1);
  revalidatePath("/app");
}

export async function completeFullKyc() {
  // KYC level 2 (cards/wallets/payouts)
  await setKycLevel(2);
  revalidatePath("/app");
}

export async function switchLang(lang: "en" | "ur") {
  await setLang(lang);
  revalidatePath("/app");
}
