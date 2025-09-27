// app/(auth)/sign-in/page.tsx
import React from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static"; // sign-in can be static

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        <a href="/" className="text-sm opacity-80 hover:opacity-100">
          Back to home
        </a>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="text-sm opacity-80 mt-1">
            Demo login for development. No real authentication yet.
          </p>

          <form action={signInAndRedirect} className="mt-6 space-y-5">
            {/* Role */}
            <div>
              <label className="text-sm font-medium">Choose your role</label>
              <select
                name="role"
                className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
                defaultValue="tenant"
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm font-medium">Language</label>
              <select
                name="lang"
                className="mt-2 w-full rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="ur">اردو</option>
              </select>
            </div>

            {/* KYC */}
            <div className="flex items-center gap-2">
              <input id="kycDone" name="kycDone" type="checkbox" className="size-4" />
              <label htmlFor="kycDone" className="text-sm">
                I have completed basic KYC (skip onboarding)
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Continue
            </button>

            <p className="text-xs opacity-70">
              You’ll be redirected to onboarding if KYC isn’t completed, or to your role’s
              dashboard if it is.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
