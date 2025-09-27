// /app/app/layout.tsx
import { cookies } from "next/headers";
import { getUser } from "@/lib/session";
import {
  setActiveRoleAction,
  switchLanguageAction,
  switchThemeAction,
} from "./actions";
import BrandLogo from "@/components/BrandLogo";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser(); // middleware guarantees auth
  const theme = cookies().get("rb-theme")?.value === "light" ? "light" : "dark";
  const isLight = theme === "light";

  return (
    <html
      lang={user?.lang || "en"}
      dir={user?.lang === "ur" ? "rtl" : "ltr"}
      className={isLight ? "light" : "dark"}
    >
      <body
        className={
          isLight
            ? "min-h-screen bg-white text-slate-900"
            : "min-h-screen bg-[#0b0b0b] text-white"
        }
      >
        <header
          className={
            "sticky top-0 z-[40] h-14 flex items-center justify-between px-3 border-b " +
            (isLight
              ? "bg-white/85 backdrop-blur border-slate-200"
              : "bg-[#0b0b0bcc] backdrop-saturate-150 backdrop-blur border-white/10")
          }
        >
          <div className="flex items-center gap-2 font-bold">
            <BrandLogo stroke={isLight ? "#059669" : "#34d399"} />
            <span className={isLight ? "text-emerald-600" : "text-emerald-400"}>
              RentBack
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <form action={switchLanguageAction}>
              <input
                type="hidden"
                name="lang"
                value={user?.lang === "en" ? "ur" : "en"}
              />
              <button
                type="submit"
                className={
                  "px-2 py-1 rounded text-sm border " +
                  (isLight
                    ? "border-slate-200 hover:bg-slate-50"
                    : "border-white/10 hover:bg-white/5")
                }
              >
                {user?.lang === "en" ? "اردو" : "English"}
              </button>
            </form>

            {/* Theme toggle */}
            <form action={switchThemeAction}>
              <input
                type="hidden"
                name="theme"
                value={isLight ? "dark" : "light"}
              />
              <button
                type="submit"
                className={
                  "px-2 py-1 rounded text-sm border " +
                  (isLight
                    ? "border-slate-200 hover:bg-slate-50"
                    : "border-white/10 hover:bg-white/5")
                }
                title="Toggle theme"
              >
                {isLight ? "🌙 Dark" : "☀️ Light"}
              </button>
            </form>

            {/* Role switcher */}
            <form action={setActiveRoleAction}>
              <select
                name="role"
                defaultValue={user?.activeRole}
                className={
                  "px-2 py-1 rounded text-sm border bg-transparent " +
                  (isLight ? "border-slate-200" : "border-white/10")
                }
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

        {/* Optional KYC hint (middleware still routes low-KYC to onboarding) */}
        {user && user.kycLevel < 1 ? (
          <div className="px-3 pt-2 max-w-xl mx-auto">
            <div
              className={
                "rounded-xl p-3 text-sm border " +
                (isLight
                  ? "border-amber-300/60 bg-amber-100"
                  : "border-amber-300/20 bg-amber-300/10")
              }
            >
              Complete KYC to start payments & rewards. You’ll be redirected to
              onboarding.
            </div>
          </div>
        ) : null}

        <main className="p-3 pb-24 max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
