// app/(auth)/sign-in/page.tsx
import React from "react";
import Logo from "@/components/Logo";
import { signInRedirect } from "./actions";

export const dynamic = "force-static"; // ok to prerender

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { e?: string };
}) {
  const hasError = searchParams?.e === "1";

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="opacity-80 mb-6">
          Choose your role to continue to the dashboard.
        </p>

        {hasError && (
          <div className="mb-4 rounded-lg border border-red-300/30 bg-red-500/10 p-3 text-sm">
            Something went wrong. Please try again. If it keeps happening,
            contact <a className="underline" href="mailto:help@rentback.app">help@rentback.app</a>.
          </div>
        )}

        <form action={signInRedirect} className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium mb-2">Select role</legend>

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
          </fieldset>

          <button
            type="submit"
            className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
