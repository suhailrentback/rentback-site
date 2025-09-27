// app/(auth)/sign-in/page.tsx
import React from "react";
import Logo from "@/components/Logo";
import { signInAction } from "./actions"; // keep your existing action export

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur sticky top-0">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        <a
          href="/"
          className="text-xs border border-black/10 dark:border-white/20 rounded px-2 py-1"
        >
          Back to Home
        </a>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10">
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent blur-xl" />
          <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6">
            <h1 className="text-2xl font-bold mb-1">Sign in</h1>
            <p className="text-sm opacity-80 mb-6">Choose your role to continue.</p>

            <form action={signInAction} className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Role</label>
                <select
                  name="role"
                  defaultValue="tenant"
                  className="mt-1 w-full bg-transparent border border-black/10 dark:border-white/20 rounded-lg px-3 py-2"
                >
                  <option value="tenant">tenant</option>
                  <option value="landlord">landlord</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Full name (optional)</label>
                <input
                  name="fullName"
                  placeholder="Your name"
                  className="mt-1 w-full bg-transparent border border-black/10 dark:border-white/20 rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Continue
              </button>

              <div className="text-xs opacity-70">
                Demo preview — no real authentication or payments.
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
