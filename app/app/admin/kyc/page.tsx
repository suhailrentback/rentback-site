// app/app/admin/kyc/page.tsx
import React from "react";

export default function AdminKycPage() {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
      <div className="text-lg font-semibold mb-2">KYC Queue</div>
      <p className="text-sm opacity-80">
        Minimal stub. Later: list pending/verifying/verified users with filters and actions.
      </p>
      <ul className="mt-3 text-sm list-disc pl-5 space-y-1 opacity-80">
        <li>Search by CNIC, phone, email</li>
        <li>View documents & selfie</li>
        <li>Approve / reject with reason</li>
      </ul>
    </div>
  );
}
