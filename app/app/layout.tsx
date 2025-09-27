// app/app/layout.tsx
import React from "react";
import Logo from "@/components/Logo";
import { getUserOrNull } from "@/lib/session";
import { switchLanguageAction, setActiveRoleAction } from "./actions";

export const dynamic = "force-dynamic"; // keep interactive

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserOrNull();
  const lang = user?.lang || "en";
  const dir = lang === "ur" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 bg-background/80 backdrop-blur border-b border-border">
          <div className="flex items-center gap-2">
            <Logo label="RentBack" />
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <form action={switchLanguageAction}>
              <input
                type="hidden"
                name="lang"
                value={lang === "en" ? "ur" : "en"}
              />
              <button
                type="submit"
                className="border border-border px-2 py-1 rounded text-sm"
              >
                {lang === "en" ? "اردو" : "English"}
              </button>
            </form>

            {/* Role switcher */}
            <form action={setActiveRoleAction}>
              <select
                name="role"
                defaultValue={user?.activeRole}
                className="bg-transparent border border-border px-2 py-1 rounded text-sm"
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
              >
                {(user?.roles ?? ["tenant"]).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </form>

            {/* Small user readout */}
            <div className="text-xs opacity-80">
              {user
                ? `${user.fullName || "User"} • ${user.activeRole} • KYC ${user.kycLevel}`
                : "Guest"}
            </div>
          </div>
        </header>

        {/* Subtle KYC banner */}
        {user && user.kycLevel < 1 ? (
          <div className="px-3 pt-2 max-w-xl mx-auto">
            <div className="border border-amber-300/20 bg-amber-300/10 rounded-xl p-3 text-sm">
              {lang === "en"
                ? "Complete KYC to start payments & rewards. You’ll be redirected to onboarding."
                : "ادائیگیوں اور انعامات کے لیے KYC مکمل کریں۔ آپ کو آن بورڈنگ پر بھیج دیا جائے گا۔"}
            </div>
          </div>
        ) : null}

        <main className="p-3 pb-24 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
