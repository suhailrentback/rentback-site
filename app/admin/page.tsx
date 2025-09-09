"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FLAGS } from "@/lib/flags";

// Keep styling consistent with the app
const BRAND = {
  primary: "#059669",
  ring: "rgba(5,150,105,0.20)",
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
} as const;

type PaymentStatus = "initiated" | "sent" | "succeeded" | "refunded";
type Payment = {
  id: string;
  amount: number;
  landlord: string;
  method: "Bank Transfer" | "Card" | "Wallet";
  status: PaymentStatus;
  ts: number;
  ref: string;
};

type RedemptionStatus = "requested" | "fulfilled" | "cancelled";
type Redemption = {
  id: string;
  ref: string;
  rewardId: string;
  brand: string;
  title: string;
  denomination: number;
  points: number;
  status: RedemptionStatus;
  ts: number;
};

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({
  size = 20,
  stroke = BRAND.primary,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

export default function AdminPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [ok, setOk] = useState(false);

  // Very light client gate (the drawer already prompts before pushing here)
  useEffect(() => {
    if (!FLAGS.ENABLE_ADMIN) {
      alert("Admin disabled.");
      router.replace("/");
      return;
    }
    try {
      if (localStorage.getItem("rb-admin-ok") === "1") {
        setOk(true);
        return;
      }
    } catch {}
    const code = window.prompt("Enter admin code");
    if (code && code === FLAGS.ADMIN_CODE) {
      try {
        localStorage.setItem("rb-admin-ok", "1");
      } catch {}
      setOk(true);
    } else {
      alert("Incorrect code");
      router.replace("/");
    }
  }, [router]);

  // Load from localStorage (demo data written by the app)
  useEffect(() => {
    if (!ok) return;
    try {
      const p = localStorage.getItem("rb-demo-payments");
      const r = localStorage.getItem("rb-demo-redemptions");
      if (p) setPayments(JSON.parse(p));
      if (r) setRedemptions(JSON.parse(r));
    } catch {}
  }, [ok]);

  const totals = useMemo(() => {
    const byStatus = payments.reduce<Record<string, number>>((acc, p) => {
      acc[p.status] = (acc[p.status] ?? 0) + p.amount;
      return acc;
    }, {});
    const requested = redemptions.filter((r) => r.status === "requested").length;
    const fulfilled = redemptions.filter((r) => r.status === "fulfilled").length;
    const cancelled = redemptions.filter((r) => r.status === "cancelled").length;
    return { byStatus, requested, fulfilled, cancelled };
  }, [payments, redemptions]);

  const exportCSV = (rows: string[][], filename: string) => {
    const csv = rows.map((r) => r.map((c) => String(c)).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPayments = () => {
    const headers = [
      "ref",
      "amount",
      "landlord",
      "method",
      "status",
      "ts_iso",
    ];
    const rows = [
      headers,
      ...payments
        .slice()
        .sort((a, b) => b.ts - a.ts)
        .map((p) => [
          p.ref,
          String(p.amount),
          p.landlord,
          p.method,
          p.status,
          new Date(p.ts).toISOString(),
        ]),
    ];
    exportCSV(rows, "rentback-admin-payments.csv");
  };

  const exportRedemptions = () => {
    const headers = [
      "ref",
      "brand",
      "title",
      "denomination",
      "points",
      "status",
      "ts_iso",
    ];
    const rows = [
      headers,
      ...redemptions
        .slice()
        .sort((a, b) => b.ts - a.ts)
        .map((r) => [
          r.ref,
          r.brand,
          r.title,
          String(r.denomination),
          String(r.points),
          r.status,
          new Date(r.ts).toISOString(),
        ]),
    ];
    exportCSV(rows, "rentback-admin-redemptions.csv");
  };

  if (!ok) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        color: BRAND.text,
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          background: "#ffffffcc",
          backdropFilter: "saturate(1.8) blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
          <BrandLogo />
          Admin Dashboard
        </div>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: `1px solid ${BRAND.ring}`,
            background: BRAND.surface,
            fontWeight: 600,
          }}
        >
          ← Back to App
        </button>
      </header>

      <main style={{ padding: 16, display: "grid", gap: 16 }}>
        {/* Summary */}
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            background: BRAND.surface,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Overview</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span>Payments: <b>{payments.length}</b></span>
            <span>Sent total: <b>{formatPKR(totals.byStatus["sent"] ?? 0)}</b></span>
            <span>Succeeded total: <b>{formatPKR(totals.byStatus["succeeded"] ?? 0)}</b></span>
            <span>Refunded total: <b>{formatPKR(totals.byStatus["refunded"] ?? 0)}</b></span>
            <span>Redemptions — Requested: <b>{totals.requested}</b></span>
            <span>Fulfilled: <b>{totals.fulfilled}</b></span>
            <span>Cancelled: <b>{totals.cancelled}</b></span>
          </div>
        </div>

        {/* Payments */}
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            background: BRAND.surface,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>Payments</div>
            <button
              onClick={exportPayments}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${BRAND.ring}`,
                background: BRAND.surface,
                fontWeight: 600,
              }}
            >
              Export CSV
            </button>
          </div>
          {payments.length === 0 ? (
            <div style={{ opacity: 0.7, fontSize: 13 }}>No records.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>Ref</th>
                    <th>Landlord</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {payments
                    .slice()
                    .sort((a, b) => b.ts - a.ts)
                    .map((p) => (
                      <tr key={p.id}>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{p.ref}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{p.landlord}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{formatPKR(p.amount)}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{p.method}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{p.status}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{new Date(p.ts).toLocaleString("en-PK")}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Redemptions */}
        <div
          style={{
            padding: 16,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.06)",
            background: BRAND.surface,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>Redemptions</div>
            <button
              onClick={exportRedemptions}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${BRAND.ring}`,
                background: BRAND.surface,
                fontWeight: 600,
              }}
            >
              Export CSV
            </button>
          </div>
          {redemptions.length === 0 ? (
            <div style={{ opacity: 0.7, fontSize: 13 }}>No records.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>Ref</th>
                    <th>Reward</th>
                    <th>Denomination</th>
                    <th>Points</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {redemptions
                    .slice()
                    .sort((a, b) => b.ts - a.ts)
                    .map((r) => (
                      <tr key={r.id}>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{r.ref}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>
                          {r.brand} — {r.title}
                        </td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{formatPKR(r.denomination)}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{r.points}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{r.status}</td>
                        <td style={{ padding: "8px 6px", borderTop: "1px solid #eee" }}>{new Date(r.ts).toLocaleString("en-PK")}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
