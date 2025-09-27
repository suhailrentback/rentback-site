import React from "react";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Admin • Overview</h1>
        <Logo />
      </div>

      <div className="grid gap-4">
        <a href="/app/admin/kyc" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">KYC Review</div>
          <div className="text-sm opacity-75">Approve or reject new users.</div>
        </a>

        <a href="/app/admin/payments" className="rounded-xl border border-white/10 bg-white/5 p-4 block hover:bg-white/10">
          <div className="font-semibold">Payments</div>
          <div className="text-sm opacity-75">Inspect recent transactions.</div>
        </a>
      </div>
    </div>
  );
}
