import React from "react";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { requireUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // If there is no valid cookie, this redirects to /sign-in (no throw, no crash)
  const user = await requireUser();

  const lang = user.lang || "en";
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen">
        <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <Logo label="RentBack" />
          </div>
          <div className="text-xs opacity-70">{user.activeRole}</div>
        </header>

        {/* Soft reminder; middleware still sends KYC<1 to /app/onboarding */}
        {user.kycLevel < 1 ? (
          <div className="px-3 pt-2 max-w-xl mx-auto">
            <div className="border border-amber-300/20 bg-amber-300/10 rounded-xl p-3 text-sm">
              {lang === "en"
                ? "Complete KYC to start payments & rewards."
                : "ادائیگیوں اور انعامات کے لیے KYC مکمل کریں۔"}
            </div>
          </div>
        ) : null}

        <main className="p-3 pb-24 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
