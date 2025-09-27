// app/(auth)/sign-in/page.tsx
import React from "react";
import { signInAction } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <Logo label="RentBack" />
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="opacity-80 text-sm mb-6">
          Pick your role to enter the app. KYC comes later.
        </p>

        <form action={signInAction} className="grid gap-4">
          <fieldset className="rounded-xl border border-black/10 dark:border-white/10 p-4">
            <legend className="text-sm opacity-80 px-1">Role</legend>
            <div className="grid gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="tenant" defaultChecked />
                <span>Tenant</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="landlord" />
                <span>Landlord</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="admin" />
                <span>Admin</span>
              </label>
            </div>
          </fieldset>

          {/* keep language simple for sign-in */}
          <input type="hidden" name="lang" value="en" />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
