// /app/app/layout.tsx
import React from "react";
import { getUser } from "@/lib/session";
import { setActiveRole, switchLang } from "./actions";

export const dynamic = "force-dynamic"; // keep interactive

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser(); // null never happens because middleware gates

  return (
    <html lang={user?.lang || "en"} dir={user?.lang === "ur" ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-[#0b0b0b] text-white">
        <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 bg-[#0b0b0bcc] backdrop-saturate-150 backdrop-blur border-b border-white/10">
          <div className="flex items-center gap-2 font-bold text-emerald-400">
            <span>🏠</span> RentBack
          </div>

          <form
            action={switchLang}
            className="flex items-center gap-2"
          >
            <input type="hidden" name="lang" value={user?.lang === "en" ? "ur" : "en"} />
            <button type="submit" className="border border-white/10 px-2 py-1 rounded text-sm">
              {user?.lang === "en" ? "اردو" : "English"}
            </button>
          </form>
          <form action={switchLang}>
  <input type="hidden" name="lang" value={...} />
</form>

<form action={setActiveRole}>
  <select name="role" ... />
</form>

          <div className="flex items-center gap-2">
            {/* Role switcher (only show roles the user has) */}
            <form action={setActiveRole}>
              <select
                name="role"
                defaultValue={user?.activeRole}
                className="bg-transparent border border-white/10 px-2 py-1 rounded text-sm"
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
              >
                {(user?.roles ?? ["tenant"]).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </header>

        {/* If KYC <1, show a subtle sticky banner even though middleware forces onboarding */}
        {user && user.kycLevel < 1 ? (
          <div className="px-3 pt-2 max-w-xl mx-auto">
            <div className="border border-amber-300/20 bg-amber-300/10 rounded-xl p-3 text-sm">
              Complete KYC to start payments & rewards. You’ll be redirected to onboarding.
            </div>
          </div>
        ) : null}

        <main className="p-3 pb-24 max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
