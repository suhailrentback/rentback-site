// app/app/tenant/page.tsx
"use client";

import Link from "next/link";
import KycGate from "@/components/KycGate";
import RoleGate from "@/components/RoleGate";
import { setActiveRoleAction } from "../actions";

const Card = ({ title, value, sub }: { title: string; value: string; sub?: string }) => (
  <div className="p-3 rounded-2xl border bg-white/5 border-white/10">
    <div className="text-[12px] opacity-70">{title}</div>
    <div className="text-lg font-semibold mt-1">{value}</div>
    {sub ? <div className="text-[12px] opacity-70 mt-1">{sub}</div> : null}
  </div>
);

export default function TenantDashboardPage() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-emerald-400">Tenant — Dashboard</div>
        <Link
          href="/app"
          className="text-sm border border-white/10 px-2 py-1 rounded hover:bg-white/5"
        >
          Back to App
        </Link>
      </div>

      <RoleGate requiredRole="tenant" action={setActiveRoleAction}>
        <KycGate>
          {/* Overview */}
          <div className="grid grid-cols-2 gap-2">
            <Card title="Upcoming Rent" value="PKR 120,000" sub="Due Oct 1" />
            <Card title="Rewards Balance" value="8,250 pts" sub="≈ PKR 825" />
            <Card title="Last Payment" value="PKR 120,000" sub="Ref RB-841223" />
            <Card title="Status" value="Good standing" sub="No overdue items" />
          </div>

          {/* Quick actions */}
          <div className="mt-4 rounded-2xl border bg-white/5 border-white/10 p-3">
            <div className="font-semibold mb-2">Quick Actions</div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/app?tab=pay"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
              >
                Pay Rent
              </Link>
              <Link
                href="/app?tab=rewards"
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
              >
                Redeem Rewards
              </Link>
              <Link
                href="/app/profile"
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
              >
                Update Profile
              </Link>
            </div>
          </div>

          {/* Recent activity (demo) */}
          <div className="mt-4">
            <div className="font-semibold mb-2">Recent Activity</div>
            <ul className="rounded-2xl border bg-white/5 border-white/10 divide-y divide-white/10">
              {[
                { t: "Payment", d: "Sep 1, 2025", v: "PKR 120,000", r: "RB-731220" },
                { t: "Reward", d: "Aug 18, 2025", v: "Foodpanda PKR 500", r: "RB-REDEEM-556941" },
              ].map((it, i) => (
                <li key={i} className="px-3 py-2 text-sm flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.t}</div>
                    <div className="opacity-70 text-[12px]">{it.d} • Ref {it.r}</div>
                  </div>
                  <div className="font-semibold">{it.v}</div>
                </li>
              ))}
            </ul>
          </div>
        </KycGate>
      </RoleGate>
    </div>
  );
}
