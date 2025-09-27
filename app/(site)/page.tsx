// app/(site)/page.tsx
import React from "react";
import Logo from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-10">
        <Logo />
        <span className="text-sm opacity-70">Pakistan</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
        Pay rent, earn rewards.
      </h1>
      <p className="mt-3 text-base md:text-lg opacity-80 max-w-2xl">
        RentBack lets tenants pay rent easily and earn perks, while landlords get clear visibility on incoming payments.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="/(auth)/sign-in"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Sign in
        </a>
        <a
          href="#learn"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-black/10 dark:border-white/20"
        >
          Learn more
        </a>
      </div>

      <section id="learn" className="mt-16 grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="font-semibold mb-1">Fast payments</div>
          <div className="text-sm opacity-80">
            Bank transfer, card, or wallet options.
          </div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="font-semibold mb-1">Rewards</div>
          <div className="text-sm opacity-80">
            Redeem perks with Pakistani brands.
          </div>
        </div>
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-4">
          <div className="font-semibold mb-1">Landlord visibility</div>
          <div className="text-sm opacity-80">
            Clear view of incoming rent and receipts.
          </div>
        </div>
      </section>
    </div>
  );
}
