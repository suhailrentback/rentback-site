// app/app/landlord/page.tsx
import React from "react";
import Logo from "@/components/Logo";
import KycPrompt from "@/components/KycPrompt";

export const dynamic = "force-dynamic";

export default function LandlordOverview() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <div className="text-sm uppercase tracking-wider opacity-60">Landlord</div>
            <h1 className="text-xl md:text-2xl font-semibold">Overview</h1>
          </div>
        </div>
        <a
          href="/app/landlord/payments"
          className="inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          View Payments
        </a>
      </div>

      {/* KYC prompt */}
      <KycPrompt />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Kpi title="Total Due" value="PKR 255,000" sub="Oct cycle" />
        <Kpi title="Collected" value="PKR 170,000" sub="This month" />
        <Kpi title="Pending" value="PKR 85,000" sub="1 tenant" />
        <Kpi title="Active Tenants" value="3" sub="2 properties" />
      </div>

      {/* Collections snapshot + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 relative">
          <Glow />
          <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Collections snapshot</h2>
              <span className="text-xs opacity-60">Demo graph</span>
            </div>
            {/* Lightweight bars (no lib) */}
            <div className="grid grid-cols-6 gap-3 h-28 items-end">
              {[60, 80, 45, 90, 70, 55].map((h, i) => (
                <div key={i} className="rounded-xl bg-emerald-500/70 dark:bg-emerald-500/60" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-3 text-xs opacity-60">Last 6 months</div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
          <h2 className="font-semibold mb-4">Quick actions</h2>
          <div className="grid gap-3">
            <Action href="/app/landlord/properties" label="Manage Properties" hint="Units • Addresses" />
            <Action href="/app/landlord/tenants" label="Manage Tenants" hint="Add • Archive" />
            <Action href="/app/landlord/payouts" label="Payouts" hint="Bank accounts" />
          </div>
        </div>
      </div>

      {/* Recent payments table */}
      <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent payments</h2>
          <a href="/app/landlord/payments" className="text-sm opacity-80 hover:opacity-100">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left opacity-60">
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="py-2 pr-4">Tenant</th>
                <th className="py-2 pr-4">Property</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {[
                { t: "Ali Raza", p: "Clifton Apt 4B", a: "PKR 85,000", s: "Completed", d: "Sep 05" },
                { t: "Sara Khan", p: "DHA Phase 5", a: "PKR 95,000", s: "Pending", d: "Oct 01" },
                { t: "Usman Iqbal", p: "Gulshan 2C", a: "PKR 75,000", s: "Completed", d: "Sep 03" },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-3 pr-4 font-medium">{row.t}</td>
                  <td className="py-3 pr-4">{row.p}</td>
                  <td className="py-3 pr-4 font-mono">{row.a}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      row.s === "Completed"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}>
                      {row.s}
                    </span>
                  </td>
                  <td className="py-3">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ——— UI bits ——— */

function Kpi({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
      <div className="text-xs uppercase tracking-wider opacity-60">{title}</div>
      <div className="text-lg md:text-xl font-semibold mt-1">{value}</div>
      {sub ? <div className="text-xs opacity-60 mt-1">{sub}</div> : null}
    </div>
  );
}

function Action({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <a
      href={href}
      className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] block"
    >
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-60">{hint}</div>
    </a>
  );
}

function Glow() {
  return (
    <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent blur-2xl" />
  );
}
