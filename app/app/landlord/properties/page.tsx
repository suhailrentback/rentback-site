"use client";

import React from "react";
import Logo from "@/components/Logo";
import KycGate from "@/components/KycGate";

const MOCK = [
  { id: "P-101", name: "Gulberg Heights — Apt 904", rent: "PKR 120,000", status: "Occupied" },
  { id: "P-102", name: "DHA Phase 5 — House 23A", rent: "PKR 250,000", status: "Vacant" },
];

export default function LandlordPropertiesPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Properties</span>
      </div>

      <KycGate>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b]">
          {MOCK.map((p) => (
            <div
              key={p.id}
              className="p-4 border-b last:border-b-0 border-black/5 dark:border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm opacity-75">{p.rent}</div>
              </div>
              <div className="text-xs opacity-70 mt-1">
                {p.status} • ID {p.id}
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href="#"
                  className="text-xs rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="text-xs rounded-lg px-3 py-1.5 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  View leases
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <a
            href="#"
            className="inline-flex items-center rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
          >
            Add property
          </a>
        </div>
      </KycGate>
    </div>
  );
}
