// app/page.tsx
import React from "react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "RentBack — Pay rent, earn rewards",
  description: "Pakistan-focused rent payments with rewards.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-sm opacity-80">
          <a href="#why" className="hover:opacity-100">Why RentBack</a>
          <a href="#how" className="hover:opacity-100">How it works</a>
          <a href="#faq" className="hover:opacity-100">FAQ</a>
          <a
            href="/sign-in"
            className="inline-flex items-center rounded-lg px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Sign in
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Pay rent, earn rewards.
              </h1>
              <p className="mt-4 text-base md:text-lg opacity-80">
                Pay easily via bank transfer, card, or wallet. Landlords see clear
                incoming payments. Tenants earn perks with Pakistani brands.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Sign in
                </a>
                <a
                  href="#why"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Learn more
                </a>
              </div>
              <div className="mt-4 text-xs opacity-70">
                Demo preview — no real payments processed.
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent blur-xl" />
              <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 shadow-[0_12px_40px_rgba(16,185,129,0.18)]">
                <div className="text-sm opacity-80">Virtual Card • PKR</div>
                <div className="mt-4 font-mono text-xl tracking-wider">**** **** **** 0007</div>
                <div className="mt-1 text-xs opacity-70">Exp 12/27 • RentBack</div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Pay", "Rewards", "Receipts"].map((t) => (
                    <div
                      key={t}
                      className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-center text-sm"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: Why RentBack */}
        <section id="why" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Why RentBack</h2>
                <a
                  href="/sign-in"
                  className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Get started
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Fast payments</div>
                  <div className="text-sm opacity-80">Bank transfer, card, or wallet in seconds.</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Rewards</div>
                  <div className="text-sm opacity-80">Redeem perks with Pakistani brands.</div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Landlord visibility</div>
                  <div className="text-sm opacity-80">Clear view of incoming rent and receipts.</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/sign-in"
                  className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Create account
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: How it works */}
        <section id="how" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/15 via-emerald-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
                <a
                  href="/sign-in"
                  className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Sign in
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="text-sm opacity-70 mb-1">Step 1</div>
                  <div className="font-semibold">Verify KYC</div>
                  <div className="text-sm opacity-80 mt-1">
                    Quick onboarding to unlock payments & rewards.
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="text-sm opacity-70 mb-1">Step 2</div>
                  <div className="font-semibold">Pay rent</div>
                  <div className="text-sm opacity-80 mt-1">
                    Pay via bank transfer, card, or wallet — get receipts.
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="text-sm opacity-70 mb-1">Step 3</div>
                  <div className="font-semibold">Earn & redeem</div>
                  <div className="text-sm opacity-80 mt-1">
                    Collect points and redeem perks on Pakistani brands.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/sign-in"
                  className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Start now
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Read FAQ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BIG CTA: FAQ */}
        <section id="faq" className="py-10">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-teal-400/15 via-emerald-300/10 to-transparent blur-xl" />
            <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
                <a
                  href="/sign-in"
                  className="hidden md:inline-flex items-center rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Sign in
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Is this live?</div>
                  <div className="text-sm opacity-80">
                    This is a demo preview — no real payments are processed yet.
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Where do I sign in?</div>
                  <div className="text-sm opacity-80">
                    Use the “Sign in” button above to access the app.
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Do landlords get receipts?</div>
                  <div className="text-sm opacity-80">
                    Yes — tenants get receipts and landlords see clear payment status.
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
                  <div className="font-semibold mb-1">Are rewards in PK?</div>
                  <div className="text-sm opacity-80">
                    Rewards catalogue focuses on Pakistani brands and utilities.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/sign-in"
                  className="inline-flex items-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Create account
                </a>
                <a
                  href="mailto:help@rentback.app"
                  className="inline-flex items-center rounded-xl px-5 py-3 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Contact support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 py-10 border-t border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo label="RentBack" />
            <span className="text-xs opacity-70">© {new Date().getFullYear()}</span>
          </div>
          <div className="text-xs opacity-70 flex gap-4">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:help@rentback.app">help@rentback.app</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
