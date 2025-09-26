// app/page.tsx
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0b0b] text-white">
        {/* Header */}
        // inside header
<div className="flex items-center gap-2 font-bold text-emerald-400">
  <BrandLogo />
  RentBack
</div>
        <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-white/10 bg-[#0b0b0bcc] backdrop-blur">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span className="text-lg">🏠</span> RentBack
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/sign-in"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm"
            >
              Get started
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <main className="max-w-5xl mx-auto px-4">
          <section className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Turn rent into <span className="text-emerald-400">rewards</span>.
              </h1>
              <p className="mt-4 text-slate-300/90 text-base md:text-lg">
                Pay rent simply (Raast, bank transfer, cards, wallets) and earn
                Pakistan-focused perks. Landlords get transparent incoming payments,
                statements, and faster reconciliations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-semibold"
                >
                  Create account
                </Link>
                <a
                  href="#how-it-works"
                  className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 font-semibold"
                >
                  How it works
                </a>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                🇵🇰 Built for Pakistan • EN/UR + RTL • Demo sandbox available
              </div>
            </div>

            {/* Card mock */}
            <div className="relative w-full max-w-[460px] h-[240px] md:h-[260px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(5,150,105,0.20)] mx-auto rb-animated-bg">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>🏠</span> RentBack
                  </div>
                  <span className="text-[12px] text-slate-900/90">VIRTUAL • Debit</span>
                </div>
                <div className="mt-auto font-mono tracking-wider">
                  <div className="text-[20px] font-semibold text-slate-900">**** **** **** 0007</div>
                  <div className="flex gap-5 mt-1 text-[12px] text-slate-900">
                    <span>Exp 12/27</span>
                    <span>PKR</span>
                  </div>
                </div>
              </div>
              <style>{`@keyframes rb-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
              .rb-animated-bg{background:linear-gradient(120deg,#059669,#14b8a6,#34d399);background-size:200% 200%;animation:rb-grad 12s ease infinite}`}</style>
            </div>
          </section>

          {/* Value props */}
          <section id="how-it-works" className="py-12 grid md:grid-cols-3 gap-4">
            {[
              {
                t: "Pay rent, earn rewards",
                d: "Raast, bank transfer, card, wallets — you choose. Earn points on eligible payments.",
              },
              {
                t: "Landlord visibility",
                d: "See incoming and outstanding payments with simple reconciliation and statements.",
              },
              {
                t: "SBP sandbox ready",
                d: "KYC-first flows, data minimization, and an audit-friendly ledger from day one.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="font-semibold">{x.t}</div>
                <div className="text-sm opacity-80 mt-1">{x.d}</div>
              </div>
            ))}
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-10 py-6 border-t border-white/10 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} RentBack — All rights reserved.
        </footer>
      </body>
    </html>
  );
}
