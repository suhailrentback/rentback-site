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
          <a href="#features" className="hover:opacity-100">Features</a>
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
                RentBack helps tenants pay rent easily and earn perks with
                Pakistani brands — while landlords get clear visibility on
                incoming payments and receipts.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href="/sign-in"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Sign in
                </a>
                <a
                  href="#features"
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

        {/* Features */}
        <section id="features" className="py-12">
          <h2 className="text-2xl font-bold mb-6">Why RentBack</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              <div className="font-semibold mb-1">Fast payments</div>
              <div className="text-sm opacity-80">Bank transfer, card, or wallet.</div>
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
        </section>

        {/* How it works */}
        <section id="how" className="py-12">
          <h2 className="text-2xl font-bold mb-6">How it works</h2>
          <ol className="grid md:grid-cols-3 gap-4 list-decimal pl-5">
            <li className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              Create an account and verify KYC.
            </li>
            <li className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              Pay rent via bank transfer, card, or wallet.
            </li>
            <li className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              Earn and redeem rewards; download receipts anytime.
            </li>
          </ol>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              <div className="font-semibold mb-1">Is this live?</div>
              <div className="text-sm opacity-80">This is a demo preview — no real payments.</div>
            </div>
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
              <div className="font-semibold mb-1">Where do I sign in?</div>
              <div className="text-sm opacity-80">
                Use the Sign in button in the header to access the app.
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
