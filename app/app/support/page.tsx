// app/app/support/page.tsx
"use client";

import BrandLogo from "@/components/BrandLogo";

export default function SupportPage() {
  const download = (filename: string, content: string, mime = "text/plain") => {
    const blob = new Blob([content], { type: mime + ";charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPaymentsCSV = () => {
    try {
      const raw = localStorage.getItem("rb-demo-payments");
      const arr = raw ? (JSON.parse(raw) as any[]) : [];
      const headers = [
        "ref",
        "amount",
        "landlord",
        "method",
        "status",
        "ts",
        "role"
      ];
      const rows = arr.map((p) => [
        p.ref,
        String(p.amount),
        p.landlord,
        p.method,
        p.status,
        new Date(p.ts).toISOString(),
        p.role ?? ""
      ]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      download("rentback-payments.csv", csv, "text/csv");
    } catch (e) {
      alert("Could not read demo payments from this browser.");
    }
  };

  const exportRedemptionsCSV = () => {
    try {
      const raw = localStorage.getItem("rb-demo-redemptions");
      const arr = raw ? (JSON.parse(raw) as any[]) : [];
      const headers = [
        "ref",
        "rewardId",
        "brand",
        "title",
        "denomination",
        "points",
        "status",
        "ts"
      ];
      const rows = arr.map((r) => [
        r.ref,
        r.rewardId,
        r.brand,
        r.title,
        String(r.denomination),
        String(r.points),
        r.status,
        new Date(r.ts).toISOString()
      ]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      download("rentback-redemptions.csv", csv, "text/csv");
    } catch (e) {
      alert("Could not read demo redemptions from this browser.");
    }
  };

  return (
    <div className="p-3 max-w-xl mx-auto">
      <div className="flex items-center gap-2 font-bold text-emerald-400 mb-3">
        <BrandLogo />
        Support
      </div>

      <div className="rounded-2xl border bg-white/5 border-white/10 p-4">
        <div className="font-semibold">Email support</div>
        <div className="text-sm opacity-80">help@rentback.app</div>
      </div>

      <div className="h-3" />

      <div className="rounded-2xl border bg-white/5 border-white/10 p-4">
        <div className="font-semibold mb-2">Exports (demo CSV)</div>
        <div className="text-sm opacity-80 mb-3">
          These export the demo data stored in your browser (created via the
          Pay/Rewards screens).
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportPaymentsCSV}
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Download payments.csv
          </button>
          <button
            onClick={exportRedemptionsCSV}
            className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5"
          >
            Download redemptions.csv
          </button>
        </div>
      </div>
    </div>
  );
}
