// app/app/admin/rewards/page.tsx
import React from "react";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminRewardsPage() {
  const partners = [
    { id: "PR-01", name: "K-Electric", type: "Utility", status: "Active" },
    { id: "PR-02", name: "GroceryCo", type: "Retail", status: "Paused" },
    { id: "PR-03", name: "RideShare PK", type: "Transport", status: "Active" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-3">
      <AdminNav />
      <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.04] dark:bg-white/[0.06]">
            <tr>
              <th className="text-left p-3">Partner ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                    Edit
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
