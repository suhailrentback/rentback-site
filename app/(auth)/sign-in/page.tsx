// app/(auth)/sign-in/page.tsx
export const dynamic = "force-static";

import React from "react";
import Logo from "@/components/Logo";
import { signInAction } from "./actions";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <Logo label="RentBack" />
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm opacity-75 mb-6">
          Choose your role to enter the demo dashboards.
        </p>

        <form action={signInAction} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Full name (optional)</label>
            <input
              name="fullName"
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
              placeholder="e.g. Ali Khan"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Role</label>
            <select
              name="role"
              defaultValue="tenant"
              className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
