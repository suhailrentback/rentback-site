// components/RewardsScreen.tsx
"use client";

import React, { useState } from "react";

type RedemptionStatus = "requested" | "fulfilled" | "cancelled";

type Redemption = {
  id: string;
  ref: string;
  brand: string;
  title: string;
  denomination: number;
  points: number;
  status: RedemptionStatus;
  ts: number;
};

const rewardsCatalog = [
  { id: "jazz", brand: "Jazz", title: "Jazz Load", note: "Mobile top-up", denom: [200, 500, 1000] },
  { id: "foodp", brand: "Foodpanda", title: "Foodpanda", note: "Food delivery", denom: [300, 500, 1000] },
  { id: "daraz", brand: "Daraz", title: "Daraz Voucher", note: "Shopping", denom: [500, 1000, 2000] },
] as const;

export default function RewardsScreen() {
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);

  const redeem = (item: typeof rewardsCatalog[number], denom: number) => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-REDEEM-${Math.floor(100000 + Math.random() * 900000)}`;
    setRedemptions((prev) => [
      {
        id,
        ref,
        brand: item.brand,
        title: item.title,
        denomination: denom,
        points: Math.round(denom / 10),
        status: "requested",
        ts: Date.now(),
      },
      ...prev,
    ]);
  };

  const mark = (id: string, status: RedemptionStatus) =>
    setRedemptions((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border bg-white/5 border-white/10 p-3">
        <div className="font-semibold">Rewards</div>
        <div className="text-xs opacity-70">Pakistan-focused perks</div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          {rewardsCatalog.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="font-semibold">{r.title}</div>
              <div className="text-xs opacity-70">{r.note}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.denom.map((d) => (
                  <button
                    key={d}
                    onClick={() => redeem(r, d)}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-semibold">Recent Redemptions</div>
      {redemptions.length === 0 ? (
        <div className="text-sm opacity-70">No redemptions yet.</div>
      ) : (
        <div className="grid gap-2">
          {redemptions.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between font-semibold">
                <span>
                  {r.brand} — {r.title} (PKR {r.denomination})
                </span>
                <span
                  className={
                    r.status === "fulfilled"
                      ? "text-emerald-300"
                      : r.status === "cancelled"
                      ? "text-slate-400"
                      : "text-slate-200"
                  }
                >
                  {r.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs opacity-80 mt-1">
                <span>
                  Ref {r.ref} • Points: {r.points}
                </span>
                <span>{new Date(r.ts).toLocaleString("en-PK")}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => mark(r.id, "fulfilled")}
                  disabled={r.status === "fulfilled"}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-60"
                >
                  Mark Fulfilled
                </button>
                <button
                  onClick={() => mark(r.id, "cancelled")}
                  disabled={r.status === "cancelled"}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
