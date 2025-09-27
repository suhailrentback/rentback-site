// app/app/landlord/page.tsx
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

export default function LandlordDashboardPage() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-emerald-400">Landlord — Dashboard</div>
        <Link
          href="/app"
          className="text-sm border border-white/10 px-2 py-1 rounded hover:bg-white/5"
        >
          Back to App
        </Link>
      </div>

      <RoleGate requiredRole="landlord" action={setActiveRoleAction}>
        <KycGate>
          {/* Overview */}
          <div className="grid grid-cols-2 gap-2">
            <Card title="Active Units" value="3" sub="DHA, Gulberg, PECHS" />
            <Card title="Expected This Month" value="PKR 360,000" sub="3 tenants" />
            <Card title="Received" value="PKR 120,000" sub="1 of 3 paid" />
            <Card title="Overdue" value="PKR 0" sub="—" />
          </div>

          {/* Properties */}
          <div className="mt-4">
            <div className="font-semibold mb-2">Properties</div>
            <ul className="rounded-2xl border bg-white/5 border-white/10 divide-y divide-white/10">
              {[
                { name: "DHA Phase 6 — Apt 1203", tenant: "Ali Raza", due: "Oct 1", amt: "PKR 120,000", status: "Pending" },
                { name: "Gulberg III — House 21", tenant: "Sara Khan", due: "Oct 1", amt: "PKR 120,000", status: "Pending" },
                { name: "PECHS Block 2 — Apt 5B", tenant: "Usman Iqbal", due: "Oct 1", amt: "PKR 120,000", status: "Paid" },
              ].map((p, i) => (
                <li key={i} className="px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{p.name}</div>
                    <div className="font-semibold">{p.amt}</div>
                  </div>
                  <div className="opacity-80 text-[12px] flex items-center justify-between mt-1">
                    <span>Tenant: {p.tenant} • Due {p.due}</span>
                    <span className={p.status === "Paid" ? "text-emerald-300" : "text-amber-300"}>
                      {p.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-4 rounded-2xl border bg-white/5 border-white/10 p-3">
            <div className="font-semibold mb-2">Actions</div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/app?tab=status"
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
              >
                Regulatory Status
              </Link>
              <Link
                href="/app?tab=support"
                className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </KycGate>
      </RoleGate>
    </div>
  );
}
