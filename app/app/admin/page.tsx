// app/app/admin/page.tsx
import React from "react";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default function AdminHome() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <div className="text-sm uppercase tracking-wider opacity-60">Admin</div>
            <h1 className="text-xl md:text-2xl font-semibold">Control Center</h1>
          </div>
        </div>
        <a
          href="/app/admin/kyc"
          className="inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Open KYC Queue
        </a>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Kpi title="Users" value="1,204" sub="+38 today" />
        <Kpi title="KYCs Pending" value="7" sub="Requires review" />
        <Kpi title="Payments (30d)" value="PKR 9.8M" sub="+4%" />
        <Kpi title="Disputes" value="0" sub="All clear" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <NavCard
          title="KYC Reviews"
          desc="Review and approve tenant/landlord KYC."
          href="/app/admin/kyc"
          cta="Open queue"
        />
        <NavCard
          title="Payments"
          desc="Monitor and inspect payment activity."
          href="/app/admin/payments"
          cta="View payments"
        />
        <NavCard
          title="Rewards"
          desc="Manage and audit reward issuance."
          href="/app/admin/rewards"
          cta="Go to rewards"
        />
      </div>

      {/* Recent system log (mock) */}
      <div className="mt-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent system log</h2>
          <a href="#" className="text-sm opacity-80 hover:opacity-100">Download</a>
        </div>
        <ul className="divide-y divide-black/10 dark:divide-white/10 text-sm">
          {[
            "KYC approved: User #1023 • landlord",
            "Payment completed: TX# 9f3a21 • PKR 85,000",
            "Rewards issued: 120 pts • User #774",
          ].map((l, i) => (
            <li key={i} className="py-2 opacity-80">{l}</li>
          ))}
        </ul>
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

function NavCard({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-80 mt-1">{desc}</div>
      <a
        href={href}
        className="mt-4 inline-flex items-center rounded-xl px-4 py-2 border border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
      >
        {cta}
      </a>
    </div>
  );
}
