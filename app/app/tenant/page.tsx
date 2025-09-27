// app/app/tenant/page.tsx
"use client";

import React from "react";
import KycPrompt from "@/components/KycPrompt";

export default function TenantDashboard() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tenant Dashboard</h1>

      {/* KYC Prompt */}
      <KycPrompt lang="en" />

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
        <p className="opacity-80">
          Welcome to your tenant dashboard. Here you will see your rent due,
          payment history, and rewards summary.
        </p>
      </div>
    </div>
  );
}
