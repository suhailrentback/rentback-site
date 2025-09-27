"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { id: "RB-00123", month: "Sep 2024", url: "#" },
  { id: "RB-00122", month: "Aug 2024", url: "#" },
  { id: "RB-00121", month: "Jul 2024", url: "#" },
];

export default function TenantReceiptsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Receipts</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((r) => (
            <div
              key={r.id}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{r.month}</div>
                <div className="text-xs opacity-70">Ref {r.id}</div>
              </div>
              <a
                href={r.url}
                className="text-sm rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </KycGate>
    </div>
  );
}
