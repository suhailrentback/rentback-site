// app/app/admin/page.tsx
import React from "react";
import AdminNav from "@/components/AdminNav";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default function AdminOverviewPage() {
  return (
    <div className="max-w-5xl mx-auto p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Logo label="Admin" />
          <span className="text-sm opacity-70">Overview</span>
        </div>
        <a
          href="/app"
          className="text-sm border border-black/10 dark:border-white/10 rounded px-3 py-1 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
        >
          Back to App
        </a>
      </div>

      <AdminNav />

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">Active Tenants</div>
          <div className="text-2xl font-semibold mt-1">128</div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">Active Landlords</div>
          <div className="text-2xl font-semibold mt-1">34</div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="text-sm opacity-70">MTD Volume (PKR)</div>
          <div className="text-2xl font-semibold mt-1">12.4M</div>
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="font-semibold mb-2">Recent Payments</div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>TXN-8841 • Tenant A → LL X</span>
              <span className="opacity-70">PKR 120,000</span>
            </li>
            <li className="flex justify-between">
              <span>TXN-8840 • Tenant B → LL Y</span>
              <span className="opacity-70">PKR 95,000</span>
            </li>
            <li className="flex justify-between">
              <span>TXN-8839 • Tenant C → LL Z</span>
              <span className="opacity-70">PKR 70,000</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="font-semibold mb-2">Open KYC Reviews</div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>#KYC-3021 • Tenant D</span>
              <span className="opacity-70">Pending</span>
            </li>
            <li className="flex justify-between">
              <span>#KYC-3019 • Landlord E</span>
              <span className="opacity-70">Needs selfie</span>
            </li>
            <li className="flex justify-between">
              <span>#KYC-3015 • Tenant F</span>
              <span className="opacity-70">Pending</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
