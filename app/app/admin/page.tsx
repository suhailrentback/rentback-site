// app/app/admin/page.tsx
import React from "react";
import { getUserOrNull } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const user = await getUserOrNull();
  const lang = user?.lang ?? "en";

  const t =
    lang === "ur"
      ? {
          title: "ایڈمن",
          kycQueue: "KYC قطار",
          payments: "ادائیگیاں",
          rewards: "انعامات",
          support: "سپورٹ",
          go: "جائیں",
        }
      : {
          title: "Admin",
          kycQueue: "KYC Queue",
          payments: "Payments",
          rewards: "Rewards",
          support: "Support",
          go: "Open",
        };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">
            {user ? `${user.activeRole} • KYC ${user.kycLevel}` : ""}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <a
          href="/app/admin/kyc"
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] shadow-[0_8px_30px_rgba(16,185,129,0.12)]"
        >
          <div className="text-xs opacity-70">{t.kycQueue}</div>
          <div className="mt-2 text-2xl font-semibold">7</div>
          <div className="text-xs opacity-60 mt-1">{t.go}</div>
        </a>

        <a
          href="/app/admin/payments"
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
        >
          <div className="text-xs opacity-70">{t.payments}</div>
          <div className="mt-2 text-2xl font-semibold">124</div>
          <div className="text-xs opacity-60 mt-1">{t.go}</div>
        </a>

        <a
          href="/app/admin/rewards"
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
        >
          <div className="text-xs opacity-70">{t.rewards}</div>
          <div className="mt-2 text-2xl font-semibold">38</div>
          <div className="text-xs opacity-60 mt-1">{t.go}</div>
        </a>

        <a
          href="/app/support"
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
        >
          <div className="text-xs opacity-70">{t.support}</div>
          <div className="mt-2 text-2xl font-semibold">Inbox</div>
          <div className="text-xs opacity-60 mt-1">{t.go}</div>
        </a>
      </div>
    </div>
  );
}
