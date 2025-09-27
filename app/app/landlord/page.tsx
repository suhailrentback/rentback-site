// app/app/landlord/page.tsx
import BrandLogo from "@/components/BrandLogo";

export default async function LandlordHome() {
  return (
    <div className="p-3 max-w-xl mx-auto">
      <div className="flex items-center gap-2 font-bold text-emerald-400 mb-3">
        <BrandLogo />
        Landlord — Home
      </div>

      <div className="grid gap-2">
        <div className="rounded-xl border bg-white/5 border-white/10 p-3">
          This is the Landlord home shell. Add Units, Incoming, Statements, Support, Profile.
        </div>
        <div className="rounded-xl border bg-white/5 border-white/10 p-3 text-sm opacity-80">
          You can reuse your ledger/components from the preview and split by role.
        </div>
      </div>
    </div>
  );
}
