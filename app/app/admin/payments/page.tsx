// app/app/admin/payments/page.tsx
import React from "react";
import { adminStore } from "@/lib/adminStore";
import PaymentViewer from "../PaymentViewer";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const payments = adminStore.payments;

  return (
    <div className="max-w-5xl mx-auto py-6">
      <h1 className="text-xl font-semibold mb-4">Payments</h1>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left">
              <th className="px-3 py-2">Reference</th>
              <th className="px-3 py-2">Tenant</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Method</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-white/10">
                <td className="px-3 py-2 font-mono">{p.reference}</td>
                <td className="px-3 py-2">{p.tenantName}</td>
                <td className="px-3 py-2">PKR {p.amount.toLocaleString()}</td>
                <td className="px-3 py-2">{p.method}</td>
                <td className="px-3 py-2 uppercase">{p.status}</td>
                <td className="px-3 py-2">{new Date(p.date).toLocaleString()}</td>
                <td className="px-3 py-2">
                  <PaymentViewer paymentId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
