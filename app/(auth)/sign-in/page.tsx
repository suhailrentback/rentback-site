"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

type Role = "tenant" | "landlord" | "admin";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("tenant");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const rolePath = role === "admin" ? "admin" : role === "landlord" ? "landlord" : "tenant";
    // Pure client navigation — no server action involved
    router.push(`/app/${rolePath}`);
  }

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
        <p className="opacity-80 mb-6">Choose your role to continue to the dashboard.</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium mb-2">Select role</legend>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="tenant"
                checked={role === "tenant"}
                onChange={() => setRole("tenant")}
              />
              <span>Tenant</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="landlord"
                checked={role === "landlord"}
                onChange={() => setRole("landlord")}
              />
              <span>Landlord</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              <span>Admin</span>
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy ? "Continuing..." : "Continue"}
          </button>
        </form>
      </main>
    </div>
  );
}
