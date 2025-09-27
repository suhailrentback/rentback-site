// app/(auth)/sign-in/page.tsx
"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <a href="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100">
              ← Back to home
            </a>
            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight">
              Welcome back to <span className="text-emerald-600">RentBack</span>
            </h1>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              Sign in to pay rent, earn rewards, and manage your account.
            </p>

            {/* Brand strip */}
            <div className="mt-6 h-2 rounded-full rb-grad" />
          </div>

          {/* Right: form card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-xl max-w-md w-full ml-auto">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/app"; // wire to your real auth later
              }}
            >
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none"
                  placeholder="you@domain.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2 outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold"
              >
                Sign in
              </button>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                By continuing you agree to our{" "}
                <a className="underline" href="/terms">Terms</a> and{" "}
                <a className="underline" href="/privacy">Privacy Policy</a>.
              </div>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes rbShift { 
          0%{background-position:0% 50%} 
          50%{background-position:100% 50%} 
          100%{background-position:0% 50%} 
        }
        .rb-grad {
          background: linear-gradient(120deg, #059669, #14b8a6, #34d399);
          background-size: 200% 200%;
          animation: rbShift 12s ease infinite;
        }
      `}</style>
    </main>
  );
}
