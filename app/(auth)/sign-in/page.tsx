"use client";

import React from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        <a href="/" className="text-sm opacity-80 hover:opacity-100">Back to site</a>
      </header>

      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Sign in (Demo)</h1>
        <p className="text-sm opacity-75 mb-6">Creates a demo session. No real auth yet.</p>

        <form action={signInAndRedirect} className="grid gap-4 rounded-2xl border border-black/10 dark:border-white/10 p-4">
          <label className="grid gap-1">
            <span className="text-sm">Role</span>
            <select name="role" className="bg-transparent border border-black/10 dark:border-white/10 rounded px-2 py-2" defaultValue="tenant">
              <option value="tenant">tenant</option>
              <option value="landlord">landlord</option>
              <option value="admin">admin</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm">KYC Level</span>
            <select name="kycLevel" className="bg-transparent border border-black/10 dark:border-white/10 rounded px-2 py-2" defaultValue="1">
              <option value="0">0 (needs onboarding)</option>
              <option value="1">1 (basic)</option>
              <option value="2">2 (full)</option>
            </select>
          </label>

          <input type="hidden" name="lang" value="en" />

          <button type="submit" className="rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
