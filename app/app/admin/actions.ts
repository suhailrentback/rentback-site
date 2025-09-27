"use server";

import { revalidatePath } from "next/cache";

/**
 * Approve a user's KYC (demo no-op).
 */
export async function approveKycAction(formData: FormData) {
  const userId = String(formData.get("userId") || "");
  // TODO: call your backend here
  console.log("[admin] approve KYC ->", userId);
  revalidatePath("/app/admin"); // refresh admin list
}

/**
 * Reject a user's KYC (demo no-op).
 */
export async function rejectKycAction(formData: FormData) {
  const userId = String(formData.get("userId") || "");
  const reason = String(formData.get("reason") || "");
  // TODO: call your backend here
  console.log("[admin] reject KYC ->", userId, reason);
  revalidatePath("/app/admin");
}

/**
 * View a payment (demo no-op).
 * You could return details for a modal/drawer in a real app.
 */
export async function viewPaymentAction(formData: FormData) {
  const paymentId = String(formData.get("paymentId") || "");
  console.log("[admin] view payment ->", paymentId);
  // no redirect; just revalidate if you render details server-side
  revalidatePath("/app/admin/payments");
}
