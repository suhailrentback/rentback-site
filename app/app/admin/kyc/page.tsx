// app/app/admin/kyc/page.tsx
import React from "react";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminKycPage() {
  const rows = [
    { id: "KYC-3021", user: "Tenant D", type: "Tenant", status: "Pending" },
    { id: "KYC-3019", user: "Landlord E", type: "Landlord", status: "Needs selfie" },
    { id: "KYC-3015", user: "Tenant F", type: "Tenant", status: "Pending" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-3">
      <AdminNav />
      <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.04] dark:bg-white/[0.06]">
            <tr>
              <th className="text-left p-3">Case</th>
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/10 dark:border-white/10">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.user}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
