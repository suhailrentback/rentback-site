// app/app/admin/kyc/actions.ts
"use server";

import { revalidatePath } from "next/cache";

export async function approveKyc(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  // TODO: replace with real backend call
  console.log("[KYC] approve", id);
  revalidatePath("/app/admin/kyc");
}

export async function rejectKyc(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  // TODO: replace with real backend call
  console.log("[KYC] reject", id);
  revalidatePath("/app/admin/kyc");
}
