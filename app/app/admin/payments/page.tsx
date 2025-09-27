// app/app/admin/payments/page.tsx
"use client";

import React, { useMemo, useState } from "react";

type Payment = {
  id: string;
  tenant: string;
  property: string;
  amount: string;
  status: "pending" | "settled" | "failed";
  date: string;
  method: "bank" | "card" | "wallet";
};

const MOCK: Payment[] = [
  { id: "pay_2001", tenant: "Ali Raza", property: "Gulberg Apt 3A", amount: "PKR 120,000", status: "pending", date: "2024-09-05", method: "bank" },
  { id: "pay_2002", tenant: "Zainab S.", property: "DHA Phase 5 House", amount: "PKR 240,000", status: "settled", date: "2024-09-04", method: "card" },
  { id: "pay_2003", tenant: "Hamza Y.", property: "Clifton Apt 9C", amount: "PKR 95,000", status: "failed", date: "2024-09-03", method: "wallet" },
];

export default function AdminPayments() {
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = useMemo(() => MOCK.find(p => p.id === openId) || null, [openId]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Payments</h1>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.04] dark:bg-white/[0.06]">
            <tr className="text-left">
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Method</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK.map((p) => (
              <tr key={p.id} className="border-t border-black/10 dark:border-white/10">
                <td className="px-4 py-2">{p.tenant}</td>
                <td className="px-4 py-2">{p.property}</td>
                <td className="px-4 py-2">{p.amount}</td>
                <td className="px-4 py-2 capitalize">{p.status}</td>
                <td className="px-4 py-2">{p.date}</td>
                <td className="px-4 py-2 uppercase">{p.method}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setOpenId(p.id)}
                    className="rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer / Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenId(null)}
          />
          <div className="relative w-full sm:max-w-lg bg-white dark:bg-[#0b0b0b] border border-black/10 dark:border-white/10 rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Payment {selected.id}</div>
              <button onClick={() => setOpenId(null)} aria-label="Close">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Tenant" value={selected.tenant} />
              <Info label="Property" value={selected.property} />
              <Info label="Amount" value={selected.amount} />
              <Info label="Status" value={selected.status} />
              <Info label="Date" value={selected.date} />
              <Info label="Method" value={selected.method.toUpperCase()} />
              <Info label="Reference" value="RB-REF-0027" />
              <Info label="Fee" value="PKR 250" />
            </div>

            <div className="mt-4 flex gap-2">
              <button className="rounded-lg px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700">
                Mark Settled
              </button>
              <button className="rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                Refund
              </button>
              <a
                href="/app/admin/payments"
                className="ml-auto text-xs opacity-70 underline"
                onClick={() => setOpenId(null)}
              >
                Close
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-3">
      <div className="text-[11px] uppercase tracking-wide opacity-60">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
