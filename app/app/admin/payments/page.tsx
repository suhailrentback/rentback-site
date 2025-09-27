"use client";

import React from "react";
import { viewPaymentAction } from "../actions";

// Demo data
const demoPayments = [
  { id: "p_1001", tenant: "Ayesha Khan", amount: "PKR 85,000", status: "Pending" },
  { id: "p_1002", tenant: "Zain Ahmed", amount: "PKR 90,000", status: "Succeeded" },
];

export default function AdminPaymentsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Payments</h1>

      <div className="grid gap-3">
        {demoPayments.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.tenant}</div>
                <div className="text-xs opacity-70">{p.amount} • {p.status}</div>
              </div>
              <form action={viewPaymentAction}>
                <input type="hidden" name="paymentId" value={p.id} />
                <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-sm">
                  View
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
