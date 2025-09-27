// app/(auth)/sign-in/page.tsx
import React from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
        <Logo label="RentBack" />
        <a href="/" className="text-sm opacity-80 hover:opacity-100">← Back to site</a>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold">Sign in (Demo)</h1>
          <p className="mt-2 text-sm opacity-80">
            Choose a role to preview dashboards. We’ll ask for KYC inside the app.
          </p>

          <form action={signInAndRedirect} className="mt-6 space-y-6">
            {/* Name (optional) */}
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input
                name="fullName"
                placeholder="e.g., Ali Khan"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
              />
            </div>

            {/* Role only */}
            <div>
              <div className="block text-sm mb-2 font-medium">Role</div>
              <div className="grid grid-cols-3 gap-2">
                {(["tenant", "landlord", "admin"] as const).map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2"
                  >
                    <input type="radio" name="role" value={r} defaultChecked={r === "tenant"} />
                    <span className="capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm mb-1">Language</label>
              <select
                name="lang"
                defaultValue="en"
                className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
              >
                <option value="en">English</option>
                <option value="ur">اردو</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Continue
              </button>
            </div>

            <div className="text-xs opacity-70">
              Demo only — we set a local session and route you to your dashboard.
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
