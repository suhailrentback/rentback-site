// app/(auth)/sign-in/page.tsx
"use client";

import React, { useState } from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  const [role, setRole] = useState<"tenant" | "landlord" | "admin">("tenant");
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [kycLevel, setKycLevel] = useState<number>(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <div className="w-[92vw] max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <div className="flex items-center justify-center mb-4">
          <Logo label="RentBack" />
        </div>
        <h1 className="text-xl font-semibold text-center mb-2">Sign in (Demo)</h1>
        <p className="text-sm opacity-70 text-center mb-6">
          Choose a role and KYC level to preview the app.
        </p>

        <form action={signInAndRedirect} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm mb-1">Language</label>
            <select
              name="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
          </div>

          {/* KYC Level */}
          <div>
            <label className="block text-sm mb-1">KYC Level</label>
            <select
              name="kycLevel"
              value={kycLevel}
              onChange={(e) => setKycLevel(Number(e.target.value))}
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
            >
              <option value={0}>0 — Not completed (go to Onboarding)</option>
              <option value={1}>1 — Basic KYC done</option>
              <option value={2}>2 — Advanced KYC</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-medium"
          >
            Continue
          </button>
        </form>

        <div className="text-[11px] opacity-60 mt-3 text-center">
          Demo only — no real auth or payments.
        </div>
      </div>
    </div>
  );
}
