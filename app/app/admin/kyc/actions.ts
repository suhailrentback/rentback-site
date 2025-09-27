// app/app/admin/kyc/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function approveKyc(formData: FormData) {
  const id = String(formData.get("id") || "");
  // TODO: replace with real backend call
  console.log("[KYC] approve", id);
  revalidatePath("/app/admin/kyc");
  return { ok: true };
}

export async function rejectKyc(formData: FormData) {
  const id = String(formData.get("id") || "");
  // TODO: replace with real backend call
  console.log("[KYC] reject", id);
  revalidatePath("/app/admin/kyc");
  return { ok: true };
}
