// components/AdminNav.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const tabs = [
  { href: "/app/admin", label: "Overview" },
  { href: "/app/admin/kyc", label: "KYC" },
  { href: "/app/admin/payments", label: "Payments" },
  { href: "/app/admin/rewards", label: "Rewards" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-4 flex gap-2 overflow-x-auto">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              active
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
