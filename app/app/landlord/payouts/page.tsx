"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { id: "PO-9007", date: "2024-09-15", amount: "PKR 350,000", status: "Sent", bank: "HBL ****1234" },
  { id: "PO-8999", date: "2024-08-15", amount: "PKR 370,000", status: "Sent", bank: "HBL ****1234" },
];

export default function LandlordPayoutsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Payouts</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((p) => (
            <div
              key={p.id}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.amount}</div>
                <div className="text-xs opacity-70">{p.status}</div>
              </div>
              <div className="text-sm opacity-80 mt-1">
                {p.date} • {p.bank}
              </div>
              <div className="text-xs opacity-60">Payout ID {p.id}</div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a
            href="#"
            className="inline-flex items-center rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          >
            Withdraw to bank
          </a>
        </div>
      </KycGate>
    </div>
  );
}
