// app/(auth)/sign-in/page.tsx
import React from "react";
import { signInAndRedirect } from "./actions";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="h-14 flex items-center px-4 border-b border-black/10 dark:border-white/10">
        <Logo label="RentBack" />
      </header>

      <main className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

        <form action={signInAndRedirect} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm">Role</label>
            <select
              name="role"
              className="border border-black/10 dark:border-white/20 rounded px-3 py-2 bg-transparent"
              defaultValue="tenant"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Name</label>
            <input
              name="fullName"
              placeholder="Your name"
              className="border border-black/10 dark:border-white/20 rounded px-3 py-2 bg-transparent"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm">Language</label>
            <select
              name="lang"
              className="border border-black/10 dark:border-white/20 rounded px-3 py-2 bg-transparent"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>

        <p className="text-xs opacity-70 mt-4">
          Demo preview — no real authentication or payments yet.
        </p>
      </main>
    </div>
  );
}
