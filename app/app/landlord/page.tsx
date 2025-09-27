// app/app/landlord/page.tsx
import React from "react";
import { getUserOrNull } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LandlordDashboard() {
  const user = await getUserOrNull();
  const lang = user?.lang ?? "en";
  const t =
    lang === "ur"
      ? {
          title: "مالک مکان ڈیش بورڈ",
          kyc: "ادائیگیوں اور پے آؤٹس کے لیے KYC مکمل کریں۔",
          kycBtn: "آن بورڈنگ کھولیں",
          properties: "پراپرٹیز",
          tenants: "کرایہ دار",
          incoming: "آنے والی ادائیگی",
          payoutsBal: "پے آؤٹس بیلنس",
          quickActions: "فوری ایکشنز",
          goPayments: "ادائیگیاں",
          goPayouts: "پے آؤٹس",
          goTenants: "کرایہ دار",
          goProps: "پراپرٹیز",
        }
      : {
          title: "Landlord Dashboard",
          kyc: "Complete KYC to enable payments & payouts.",
          kycBtn: "Open Onboarding",
          properties: "Properties",
          tenants: "Tenants",
          incoming: "Incoming Payment",
          payoutsBal: "Payouts Balance",
          quickActions: "Quick Actions",
          goPayments: "Payments",
          goPayouts: "Payouts",
          goTenants: "Tenants",
          goProps: "Properties",
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
      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
          <div className="text-xs opacity-70">{t.properties}</div>
          <div className="mt-2 text-2xl font-semibold">6</div>
          <div className="text-xs opacity-60 mt-1">Active</div>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="text-xs opacity-70">{t.tenants}</div>
          <div className="mt-2 text-2xl font-semibold">18</div>
          <div className="text-xs opacity-60 mt-1">9 due this week</div>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="text-xs opacity-70">{t.incoming}</div>
          <div className="mt-2 text-2xl font-semibold">PKR 340,000</div>
          <div className="text-xs opacity-60 mt-1">Pending settlement</div>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
          <div className="text-xs opacity-70">{t.payoutsBal}</div>
          <div className="mt-2 text-2xl font-semibold">PKR 720,000</div>
          <div className="text-xs opacity-60 mt-1">Ready to withdraw</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">{t.quickActions}</div>
        </div>
        <div className="grid sm:grid-cols-4 gap-3">
          <a
            href="/app/landlord/payments"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.goPayments}</div>
            <div className="text-xs opacity-70">View & reconcile</div>
          </a>
          <a
            href="/app/landlord/payouts"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.goPayouts}</div>
            <div className="text-xs opacity-70">Withdraw funds</div>
          </a>
          <a
            href="/app/landlord/tenants"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.goTenants}</div>
            <div className="text-xs opacity-70">Rent status</div>
          </a>
          <a
            href="/app/landlord/properties"
            className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.03] dark:hover:bg-white/[0.06]"
          >
            <div className="font-semibold">{t.goProps}</div>
            <div className="text-xs opacity-70">Units & leases</div>
          </a>
        </div>
      </div>
    </div>
  );
}
