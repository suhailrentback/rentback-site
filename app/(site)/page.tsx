"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandCard from "@/components/BrandCard";

export default function MarketingHome() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0b0b] dark:text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">RentBack</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="#how" className="opacity-80 hover:opacity-100">How it works</Link>
          <Link href="#why" className="opacity-80 hover:opacity-100">Why RentBack</Link>
          <Link href="#faq" className="opacity-80 hover:opacity-100">FAQ</Link>
          <Link
            href="/sign-in"
            className="px-3 py-2 rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Sign in
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Pay rent. Earn rewards. <span className="text-emerald-600 dark:text-emerald-400">All in PKR.</span>
          </h1>
          <p className="mt-3 text-base opacity-80">
            A cleaner way to pay rent in Pakistan—bank transfer, card, or wallet—while earning perks on everyday brands.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-3 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Get started
            </Link>
            <a
              href="#how"
              className="px-4 py-3 rounded-xl font-semibold border border-black/10 dark:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/5"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BrandCard />
        </div>
      </section>

      {/* CTA sections */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-4">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">1) Create your account</div>
            <div className="opacity-80 text-sm">Sign in and complete basic KYC—takes a few minutes.</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">2) Pay your landlord</div>
            <div className="opacity-80 text-sm">Bank transfer (Raast), card, or wallet—whatever’s easiest.</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">3) Earn rewards</div>
            <div className="opacity-80 text-sm">Redeem on Pakistani brands like Jazz, Careem, Daraz, and more.</div>
          </div>
        </div>
      </section>

      <section id="why" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-4">Why RentBack</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">Transparent</div>
            <div className="opacity-80 text-sm">Track payments with clear references and receipts.</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">Rewarding</div>
            <div className="opacity-80 text-sm">Turn rent into perks you actually use.</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">Pakistan-first</div>
            <div className="opacity-80 text-sm">Raast friendly, PKR native, and localized support.</div>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-4">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">Is this live?</div>
            <div className="opacity-80 text-sm">We’re rolling out in phases—join the waitlist by signing in.</div>
          </div>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <div className="font-semibold mb-1">Do you charge fees?</div>
            <div className="opacity-80 text-sm">Bank transfers are free in demo; partner fees may apply when live.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="opacity-80 text-sm">© {new Date().getFullYear()} RentBack</span>
        </div>
        <div className="flex gap-4 text-sm opacity-80">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/complaints">Complaints</Link>
          <Link href="/legal/founder">Founder</Link>
        </div>
      </footer>
    </div>
  );
}
