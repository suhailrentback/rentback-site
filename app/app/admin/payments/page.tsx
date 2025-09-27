// app/app/admin/payments/page.tsx
import React from "react";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminPaymentsPage() {
  const rows = [
    { id: "TXN-8841", tenant: "Tenant A", landlord: "LL X", amount: 120000, status: "Settled" },
    { id: "TXN-8840", tenant: "Tenant B", landlord: "LL Y", amount: 95000, status: "Pending" },
    { id: "TXN-8839", tenant: "Tenant C", landlord: "LL Z", amount: 70000, status: "Failed" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-3">
      <AdminNav />
      <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.04] dark:bg-white/[0.06]">
            <tr>
              <th className="text-left p-3">TXN</th>
              <th className="text-left p-3">Tenant</th>
              <th className="text-left p-3">Landlord</th>
              <th className="text-left p-3">Amount (PKR)</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-black/10 dark:border-white/10">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.tenant}</td>
                <td className="p-3">{r.landlord}</td>
                <td className="p-3">{r.amount.toLocaleString()}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                    View
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
