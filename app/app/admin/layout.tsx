// app/app/admin/layout.tsx
import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser(); // assumes middleware ensures signed-in
  // Guard: only allow users whose activeRole is 'admin'
  if (!user || user.activeRole !== "admin") {
    redirect("/app"); // bounce non-admins back to app home
  }

  return (
    <div className="max-w-5xl mx-auto px-3">
      {/* Header */}
      <header className="sticky top-0 z-[40] h-14 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur px-2">
        <div className="flex items-center gap-2">
          <Logo label="RentBack — Admin" />
        </div>
        <nav className="flex items-center gap-2 text-sm">
          <a href="/app/admin" className="px-3 py-1.5 rounded hover:bg-black/[0.05] dark:hover:bg-white/[0.06]">Overview</a>
          <a href="/app/admin/kyc" className="px-3 py-1.5 rounded hover:bg-black/[0.05] dark:hover:bg-white/[0.06]">KYC</a>
          <a href="/app/admin/payments" className="px-3 py-1.5 rounded hover:bg-black/[0.05] dark:hover:bg-white/[0.06]">Payments</a>
          <a href="/app/admin/rewards" className="px-3 py-1.5 rounded hover:bg-black/[0.05] dark:hover:bg-white/[0.06]">Rewards</a>
        </nav>
      </header>

      <main className="py-4">{children}</main>
    </div>
  );
}
