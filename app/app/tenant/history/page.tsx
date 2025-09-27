"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { id: "RB-00123", month: "Sep 2024", amount: "PKR 120,000", status: "Paid", method: "Bank Transfer" },
  { id: "RB-00122", month: "Aug 2024", amount: "PKR 120,000", status: "Paid", method: "Card" },
  { id: "RB-00121", month: "Jul 2024", amount: "PKR 120,000", status: "Paid", method: "Wallet" },
];

export default function TenantHistoryPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Payment history</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((row) => (
            <div
              key={row.id}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{row.month}</div>
                <div className="text-sm opacity-75">{row.amount}</div>
              </div>
              <div className="text-xs opacity-70 mt-1">
                {row.status} • {row.method} • Ref {row.id}
              </div>
            </div>
          ))}
        </div>
      </KycGate>
    </div>
  );
}
