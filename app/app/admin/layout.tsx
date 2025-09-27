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
  // Use tolerant getter so build doesn't throw if session is missing
  const user = await getUserOrNull();

  return (
    <html lang={user?.lang || "en"} dir={user?.lang === "ur" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 bg-background/80 backdrop-blur border-b border-border">
          <div className="flex items-center gap-2">
            <Logo label="RentBack Admin" />
          </div>
          <div className="text-xs opacity-80">
            {user
              ? `${user.fullName || "User"} • ${user.activeRole} • KYC ${user.kycLevel}`
              : "Guest"}
          </div>
        </header>

        <main className="p-4 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
