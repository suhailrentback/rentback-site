"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { id: "T-2001", name: "Ali Raza", unit: "Gulberg Heights — Apt 904", status: "Active", due: "PKR 120,000" },
  { id: "T-2002", name: "Fatima Khan", unit: "DHA Phase 5 — House 23A", status: "Invited", due: "-" },
];

export default function LandlordTenantsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Tenants</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((t) => (
            <div
              key={t.id}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm opacity-75">{t.due}</div>
              </div>
              <div className="text-xs opacity-70 mt-1">
                {t.unit} • {t.status} • ID {t.id}
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href="#"
                  className="text-xs rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  View details
                </a>
                <a
                  href="#"
                  className="text-xs rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Message
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href="#"
            className="inline-flex items-center rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          >
            Invite tenant
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg px-4 py-2 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-sm"
          >
            Upload CSV
          </a>
        </div>
      </KycGate>
    </div>
  );
}
