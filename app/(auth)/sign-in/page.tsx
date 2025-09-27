// app/(auth)/sign-in/page.tsx
"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo";

export const dynamic = "force-static";

export default function SignInPage() {
  const [role, setRole] = useState<"tenant" | "landlord" | "admin">("tenant");
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [fullName, setFullName] = useState("");

  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-center my-6">
          <Logo label="RentBack" />
        </div>

        <form action={"/sign-in/action"} method="post" className="grid gap-4">
          <input type="hidden" name="lang" value={lang} />
          <div className="grid gap-2">
            <label className="text-sm opacity-80">Full name (optional)</label>
            <input
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm opacity-80">Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Language:</span>
            <button
              type="button"
              onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}
              className="rounded border border-black/10 dark:border-white/20 px-2 py-1"
            >
              {lang === "en" ? "اردو" : "English"}
            </button>
          </div>

          <button
            formAction={async (formData) => {
              // call server action via special route handler (below)
              const res = await fetch("/sign-in/action", {
                method: "POST",
                body: formData,
              });
              // if server action redirects, browser follows automatically
              if (!res.ok) alert("Something went wrong. Please try again.");
            }}
            className="rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
