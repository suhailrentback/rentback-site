"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/app/landlord", label: "Overview" },
  { href: "/app/landlord/properties", label: "Properties" },
  { href: "/app/landlord/tenants", label: "Tenants" },
  { href: "/app/landlord/payments", label: "Payments" },
  { href: "/app/landlord/payouts", label: "Payouts" },
];

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="max-w-xl mx-auto">
      {/* Section tabs */}
      <nav className="sticky top-14 z-[39] bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur border-b border-black/10 dark:border-white/10">
        <div className="px-3 flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => {
            const active = pathname === t.href;
            return (
              <a
                key={t.href}
                href={t.href}
                className={[
                  "shrink-0 rounded-lg px-3 py-2 text-sm border",
                  active
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                ].join(" ")}
              >
                {t.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="p-3">{children}</div>
    </div>
  );
}
