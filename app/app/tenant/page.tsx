// app/app/tenant/page.tsx
import React from "react";
import Logo from "@/components/Logo";
import KycPrompt from "@/components/KycPrompt";

export const dynamic = "force-dynamic";

export default function TenantOverview() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <div className="text-sm uppercase tracking-wider opacity-60">Tenant</div>
            <h1 className="text-xl md:text-2xl font-semibold">Overview</h1>
          </div>
        </div>
        <a
          href="/app/pay"
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Pay Rent
        </a>
      </div>

      {/* KYC prompt (shows CTA if not completed) */}
      <KycPrompt />

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Rent Due" value="PKR 85,000" sub="Due Oct 05" />
        <SummaryCard title="Rewards Balance" value="2,450 pts" sub="+120 this month" />
        <SummaryCard title="Last Payment" value="PKR 85,000" sub="Sep 05 • Receipt #9821" />
      </div>

      {/* Virtual card + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <Glow />
          <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
            <div className="text-sm opacity-70">Virtual Card • PKR</div>
            <div className="mt-3 font-mono text-2xl tracking-widest">**** **** **** 0007</div>
            <div className="text-xs opacity-60 mt-1">Exp 12/27 • RentBack</div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <Pill>Pay</Pill>
              <Pill>Rewards</Pill>
              <Pill>Receipts</Pill>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Quick actions</h2>
            <span className="text-xs opacity-60">Safe preview</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Action href="/app/pay" label="Pay Rent" hint="Bank • Card • Wallet" />
            <Action href="/app/rewards" label="Rewards" hint="Redeem perks" />
            <Action href="/app/support" label="Support" hint="Get help" />
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent activity</h2>
          <a href="#" className="text-sm opacity-80 hover:opacity-100">View all</a>
        </div>
        <ul className="divide-y divide-black/10 dark:divide-white/10">
          {[
            { t: "Rent • Sep 05", v: "- PKR 85,000", s: "Completed" },
            { t: "Reward • Sep 01", v: "+ 120 pts", s: "Earned" },
            { t: "Receipt • Aug 05", v: "PKR 85,000", s: "Completed" },
          ].map((r, i) => (
            <li key={i} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.t}</div>
                <div className="text-xs opacity-60">{r.s}</div>
              </div>
              <div className="text-sm font-mono opacity-80">{r.v}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ——— UI bits ——— */

function SummaryCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
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
      className="rounded-xl border border-black/10 dark:border-white/10 p-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
    >
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-60">{hint}</div>
    </a>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-center">
      {children}
    </div>
  );
}

function Glow() {
  return (
    <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent blur-2xl" />
  );
}
