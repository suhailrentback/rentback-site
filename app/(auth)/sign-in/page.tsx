// app/(auth)/sign-in/page.tsx
"use client";

import React from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white dark:bg-[#0b0b0b]">
        <div className="flex items-center justify-center mb-4">
          <Logo label="RentBack" />
        </div>

        <h1 className="text-xl font-semibold mb-2">Sign in (Demo)</h1>
        <p className="text-sm opacity-75 mb-6">
          Choose a role and KYC level to preview the app flow.
        </p>

        <form action={signInAndRedirect} className="grid gap-4">
          <label className="grid gap-1 text-sm">
            Role
            <select
              name="role"
              defaultValue="tenant"
              className="border rounded px-2 py-1 bg-transparent"
            >
              <option value="tenant">tenant</option>
              <option value="landlord">landlord</option>
              <option value="admin">admin</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            KYC Level
            <select
              name="kycLevel"
              defaultValue="1"
              className="border rounded px-2 py-1 bg-transparent"
            >
              <option value="0">0 (needs onboarding)</option>
              <option value="1">1 (basic complete)</option>
            </select>
          </label>

          {/* keep your default language */}
          <input type="hidden" name="lang" value="en" />

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
