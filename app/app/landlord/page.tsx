// app/app/landlord/page.tsx
"use client";

import React from "react";
import KycPrompt from "@/components/KycPrompt";

export default function LandlordDashboard() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Landlord Dashboard</h1>

      {/* KYC Prompt */}
      <KycPrompt lang="en" />

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
        <p className="opacity-80">
          Welcome to your landlord dashboard. Here you will see an overview of
          tenants, properties, rent payments, and payouts.
        </p>
      </div>
    </div>
  );
}
