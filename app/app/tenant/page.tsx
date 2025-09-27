// app/app/tenant/page.tsx
import React from "react";
import { getUserOrNull } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function TenantDashboard() {
  const user = await getUserOrNull();
  const lang = user?.lang ?? "en";
  const t =
    lang === "ur"
      ? {
          title: "کرایہ دار ڈیش بورڈ",
          kyc: "ادائیگیوں اور انعامات کے لیے KYC مکمل کریں۔",
          kycBtn: "آن بورڈنگ کھولیں",
          rentDue: "واجب الادا کرایہ",
          rewards: "انعامات کا خلاصہ",
          lastPaid: "آخری ادائیگی",
          quickActions: "فوری ایکشنز",
          payRent: "کرایہ ادا کریں",
          rewardsCta: "انعامات",
          support: "مدد درکار ہے؟",
        }
      : {
          title: "Tenant Dashboard",
          kyc: "Complete KYC to unlock payments & rewards.",
          kycBtn: "Open Onboarding",
          rentDue: "Rent Due",
          rewards: "Rewards Summary",
          lastPaid: "Last Payment",
          quickActions: "Quick Actions",
          payRent: "Pay Rent",
          rewardsCta: "Rewards",
          support: "Need help?",
        };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page title */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{t.title}</h1>
          <p className="text-sm opacity-70">
            {user ? `${user.activeRole} • KYC ${user.kycLevel}` : ""}
          </p>
        </div>
      </div>

      {/* KYC banner */}
      {user && user.kycLevel < 1 && (
        <div className="mb-4 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <span className="text-sm">{t.kyc}</span>
            <a
              href="/app/onboarding"
              className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {t.kycBtn}
            </a>
          </div>
        </div>
      )}

      {/* Top stats */}
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
          <div className="text-xs opacity-70">{t.rentDue}</div>
          <div className="mt-2 text-2xl font-semibold">PKR 120,000</div>
          <div className="text-xs opacity-60 mt-1">Due Oct 5</div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="text-xs opacity-70">{t.rewards}</div>
          <div className="mt-2 text-2xl font-semibold">2,450 pts</div>
          <div className="text-xs opacity-60 mt-1">+250 this month</div>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="text-xs opacity-70">{t.lastPaid}</div>
          <div className="mt-2 text-2xl font-semibold">PKR 120,000</div>
          <div className="text-xs opacity-60 mt-1">Sep 5 • Receipt #RB-0012</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">{t.quickActions}</div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <a
            href="/app/pay"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.payRent}</div>
            <div className="text-xs opacity-70">Bank transfer, card, wallet</div>
          </a>
          <a
            href="/app/rewards"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.rewardsCta}</div>
            <div className="text-xs opacity-70">Redeem perks</div>
          </a>
          <a
            href="/app/support"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.support}</div>
            <div className="text-xs opacity-70">Chat & FAQs</div>
          </a>
        </div>
      </div>
    </div>
  );
}
