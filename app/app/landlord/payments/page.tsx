"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { ref: "RB-31009", tenant: "Ali Raza", unit: "Gulberg Heights — Apt 904", amount: "PKR 120,000", status: "Settled" },
  { ref: "RB-30988", tenant: "Fatima Khan", unit: "DHA Phase 5 — House 23A", amount: "PKR 250,000", status: "Pending" },
];

export default function LandlordPaymentsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Incoming payments</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((p) => (
            <div
              key={p.ref}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.amount}</div>
                <div className="text-xs opacity-70">{p.status}</div>
              </div>
              <div className="text-sm opacity-80 mt-1">
                {p.tenant} • {p.unit}
              </div>
              <div className="text-xs opacity-60">Ref {p.ref}</div>
            </div>
          ))}
        </div>
      </KycGate>
    </div>
  );
}
