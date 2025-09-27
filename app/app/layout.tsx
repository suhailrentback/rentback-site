import React from "react";
import { getUserOrNull } from "@/lib/session";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserOrNull(); // never throws

  return (
    <html lang={(user?.lang ?? "en")} dir={(user?.lang === "ur" ? "rtl" : "ltr")} suppressHydrationWarning>
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-3 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
          <Logo label="RentBack" />
          <div className="text-xs opacity-80">
            {user ? `${user.activeRole} • KYC ${user.kycLevel}` : "Guest"}
          </div>
        </header>
        <main className="p-3 pb-24 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
