"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FLAGS } from "../../lib/flags";

// Types copied to keep this file standalone
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
type EventItem = {
  id: string;
  ts: number;
  kind: string;
  ref?: string;
  meta?: Record<string, any>;
};

const BRAND = {
  primary: "#059669",
  ring: "rgba(5,150,105,0.20)",
  surface: "#fff",
  bg: "#f6faf8",
  text: "#0b0b0b",
};

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({ size = 20, stroke = BRAND.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

function downloadAs(filename: string, content: string, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV<T extends object>(rows: T[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = rows.map((r) =>
    headers.map((h) => JSON.stringify((r as any)[h] ?? "")).join(",")
  );
  return [headers.join(","), ...lines].join("\n");
}

export default function AdminPage() {
  const [code, setCode] = useState("");
  const [authed, setAuthed] = useState(false);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    try {
      setAuthed(localStorage.getItem("rb-admin-ok") === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const p = localStorage.getItem("rb-demo-payments");
      const r = localStorage.getItem("rb-demo-redemptions");
      const e = localStorage.getItem("rb-events");
      if (p) setPayments(JSON.parse(p));
      if (r) setRedemptions(JSON.parse(r));
      if (e) setEvents(JSON.parse(e));
    } catch {}
  }, [authed]);

  const kpis = useMemo(() => {
    const totalAmount = payments.reduce((s, p) => s + p.amount, 0);
    const byStatus: Record<string, number> = {};
    const byMethod: Record<string, number> = {};
    payments.forEach((p) => {
      byStatus[p.status] = (byStatus[p.status] || 0) + 1;
      byMethod[p.method] = (byMethod[p.method] || 0) + 1;
    });

    const redeemByStatus: Record<string, number> = {};
    const redeemByBrand: Record<string, number> = {};
    redemptions.forEach((r) => {
      redeemByStatus[r.status] = (redeemByStatus[r.status] || 0) + 1;
      redeemByBrand[r.brand] = (redeemByBrand[r.brand] || 0) + 1;
    });

    return { totalAmount, byStatus, byMethod, redeemByStatus, redeemByBrand };
  }, [payments, redemptions]);

  const login = () => {
    if (!FLAGS.ENABLE_ADMIN) {
      alert("Admin disabled.");
      return;
    }
    if (code.trim() === FLAGS.ADMIN_CODE) {
      try {
        localStorage.setItem("rb-admin-ok", "1");
      } catch {}
      setAuthed(true);
    } else {
      alert("Incorrect code");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("rb-admin-ok");
    } catch {}
    setAuthed(false);
  };

  if (!FLAGS.ENABLE_ADMIN) {
    return (
      <div style={{ minHeight: "100vh", background: BRAND.bg, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, color: BRAND.primary }}>
          <BrandLogo />
          RentBack — Admin
        </div>
        <div style={{ marginTop: 12 }}>Admin is disabled.</div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: BRAND.bg, display: "grid", placeItems: "center", padding: 16 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            background: BRAND.surface,
            border: `1px solid ${BRAND.ring}`,
            borderRadius: 12,
            padding: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, color: BRAND.primary }}>
            <BrandLogo />
            RentBack — Admin
          </div>
          <div style={{ marginTop: 12, fontSize: 13, opacity: 0.8 }}>
            Enter the admin code to view the read-only dashboard.
          </div>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Admin code"
            style={{ marginTop: 12, padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.12)", width: "100%" }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              onClick={login}
              style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 700, flex: 1 }}
            >
              Unlock
            </button>
            <a href="/" style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: "#fff", fontWeight: 700, textAlign: "center", flex: 1 }}>
              Back
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, padding: 16, color: BRAND.text }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, color: BRAND.primary }}>
          <BrandLogo />
          RentBack — Admin
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => window.print()}
            style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${BRAND.ring}`, background: "#fff", fontWeight: 700 }}
          >
            Print
          </button>
          <button
            onClick={logout}
            style={{ padding: "8px 10px", borderRadius: 8, border: `1px solid ${BRAND.ring}`, background: "#fff7ed", color: "#92400e", fontWeight: 700 }}
          >
            Log out
          </button>
        </div>
      </header>

      {/* KPIs */}
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(2, minmax(0,1fr))", marginTop: 8 }}>
        <div style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: BRAND.surface }}>
          <div style={{ fontWeight: 700 }}>Payments</div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            Count: <b>{payments.length}</b> • Total: <b>
              {new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(
                kpis.totalAmount
              )}
            </b>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
            By status: {Object.entries(kpis.byStatus).map(([k, v]) => `${k}:${v}`).join("  •  ")}
            <br />
            By method: {Object.entries(kpis.byMethod).map(([k, v]) => `${k}:${v}`).join("  •  ")}
          </div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => downloadAs("admin-payments.csv", toCSV(payments), "text/csv;charset=utf-8;")}
              style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: "#fff", fontWeight: 700 }}
            >
              Download CSV
            </button>
          </div>
        </div>

        <div style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: BRAND.surface }}>
          <div style={{ fontWeight: 700 }}>Redemptions</div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            Count: <b>{redemptions.length}</b>
          </div>
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
            By status: {Object.entries(kpis.redeemByStatus).map(([k, v]) => `${k}:${v}`).join("  •  ")}
            <br />
            By brand: {Object.entries(kpis.redeemByBrand).map(([k, v]) => `${k}:${v}`).join("  •  ")}
          </div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => downloadAs("admin-redemptions.csv", toCSV(redemptions), "text/csv;charset=utf-8;")}
              style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: "#fff", fontWeight: 700 }}
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Events */}
      <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: BRAND.surface }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700 }}>Event Log</div>
          <button
            onClick={() => downloadAs("admin-events.csv", toCSV(events), "text/csv;charset=utf-8;")}
            style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: "#fff", fontWeight: 700 }}
          >
            Download CSV
          </button>
        </div>
        <div style={{ marginTop: 10, maxHeight: 360, overflow: "auto", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10 }}>
          {events.length === 0 ? (
            <div style={{ padding: 10, fontSize: 12, opacity: 0.7 }}>No events.</div>
          ) : (
            events
              .slice()
              .sort((a, b) => b.ts - a.ts)
              .map((e) => (
                <div key={e.id} style={{ padding: 10, borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <b>{e.kind}</b> {e.ref ? `• ${e.ref}` : ""}
                    </div>
                    <div style={{ opacity: 0.7 }}>{new Date(e.ts).toLocaleString("en-PK")}</div>
                  </div>
                  {e.meta ? <div style={{ marginTop: 4, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{JSON.stringify(e.meta)}</div> : null}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
