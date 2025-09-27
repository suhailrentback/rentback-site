// app/app/tenant/page.tsx
import BrandLogo from "@/components/BrandLogo";

export default async function TenantHome() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <div className="flex items-center gap-2 font-bold text-emerald-400 mb-3">
        <BrandLogo />
        Tenant — Home
      </div>

      <div className="grid gap-2">
        <div className="rounded-xl border bg-white/5 border-white/10 p-3">
          Welcome! This is the Tenant home shell. Wire your tabs/components here
          (Pay, Rewards, Support, Profile).
        </div>
        <div className="rounded-xl border bg-white/5 border-white/10 p-3 text-sm opacity-80">
          Tip: keep your existing Pay/Rewards components and mount them under this route or via tabs.
        </div>
      </div>
    </div>
  );
}
