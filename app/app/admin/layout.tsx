// app/app/admin/layout.tsx
import React from "react";
import Logo from "@/components/Logo";
import { getUserOrNull } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserOrNull(); // tolerant: may be null

  return (
    <html
      lang={user?.lang ?? "en"}
      dir={user?.lang === "ur" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-3 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <Logo label="RentBack" />
            <span className="font-medium">Admin</span>
          </div>
          <div className="text-xs opacity-80">
            {user ? `${user.activeRole} • KYC ${user.kycLevel}` : "Guest"}
          </div>
        </header>

        <main className="p-3 pb-24 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
