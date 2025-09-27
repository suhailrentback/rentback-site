// app/app/admin/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { adminStore } from "@/lib/adminStore";

export async function approveKycAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const item = adminStore.kyc.find(k => k.id === id);
  if (item) {
    item.status = "approved";
    item.notes = String(formData.get("notes") || "");
  }
  revalidatePath("/app/admin/kyc");
}

export async function rejectKycAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  const reason = String(formData.get("reason") || "Rejected");
  const item = adminStore.kyc.find(k => k.id === id);
  if (item) {
    item.status = "rejected";
    item.notes = reason;
  }
  revalidatePath("/app/admin/kyc");
}
