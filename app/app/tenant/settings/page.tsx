"use client";

import React from "react";
import Logo from "@/components/Logo";

export default function TenantSettingsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Logo />
        <span className="text-xs opacity-70">Settings</span>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4">
        <div className="font-semibold mb-2">Preferences</div>
        <div className="text-sm opacity-80">
          Language and theme are controlled on the landing page for now.
        </div>
      </div>
    </div>
  );
}
