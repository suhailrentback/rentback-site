"use client";

import React, { useMemo, useState, useEffect } from "react";

// RentBack prototype app shell (brand-colored, with demo payments)
// - Bottom nav (Home, Pay, Rewards, Support, Profile)
// - Right drawer with Status, Security & Privacy, Rewards, About, Founder, Privacy, Terms
// - Role switch (Tenant/Landlord)
// - KYC banner (Home → takes to Profile)
// - Animated gradient card (ends with 0007)
// - Rewards (PK market)
// - Pay tab DEMO: mock payments (Bank Transfer / Card / Wallet)
//   + Receipt Modal, Refund (demo), local persistence
//   + Optional Google Sheet logging via window.RB_PAYMENTS_ENDPOINT

// Brand palette
const BRAND = {
  primary: "#059669",     // emerald-600
  primarySoft: "#10b981", // emerald-500
  primaryLite: "#34d399", // emerald-400
  teal: "#14b8a6",        // teal-500
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
  ring: "rgba(5,150,105,0.20)",
} as const;

// Types
type Tab =
  | "home"
  | "pay"
  | "rewards"
  | "support"
  | "profile"
  | "status"
  | "security"
  | "about"
  | "founder";

type Role = "tenant" | "landlord";
type KycState = "none" | "in-progress" | "verified";
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

type Utm = { source: string; medium: string; campaign: string };

// Utils
const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

const getUtm = (): Utm => {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      source: p.get("utm_source") || "",
      medium: p.get("utm_medium") || "",
      campaign: p.get("utm_campaign") || "",
    };
  } catch {
    return { source: "", medium: "", campaign: "" };
  }
};

// Small building blocks
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
    {subtitle ? (
      <div style={{ opacity: 0.75, fontSize: 13, marginTop: 4 }}>{subtitle}</div>
    ) : null}
  </div>
);

const Row: React.FC<{
  children: React.ReactNode;
  right?: React.ReactNode;
  onClick?: () => void;
}> = ({ children, right, onClick }) => {
  const Comp: any = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.06)",
        background: BRAND.surface,
        textAlign: "left",
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
      }}
    >
      <span>{children}</span>
      {right ? <span style={{ opacity: 0.7, fontSize: 12 }}>{right}</span> : null}
    </Comp>
  );
};

const Pill: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({
  children,
  onClick,
}) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 12px",
      borderRadius: 999,
      border: `1px solid ${BRAND.ring}`,
      background: BRAND.surface,
      color: BRAND.primary,
      cursor: onClick ? "pointer" : "default",
      fontWeight: 600,
    }}
  >
    {children}
  </button>
);

// Brand mark
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

// Animated card
const CardVisual: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 420,
      height: 220,
      borderRadius: 20,
      overflow: "hidden",
      border: "1px solid rgba(0,0,0,0.06)",
      boxShadow: "0 12px 30px rgba(5,150,105,0.18)",
      color: BRAND.text,
      background: `linear-gradient(120deg, ${BRAND.primary}, ${BRAND.teal}, ${BRAND.primaryLite})`,
      backgroundSize: "200% 200%",
      animation: "rb-gradient-move 12s ease infinite",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom right, rgba(255,255,255,0.14), rgba(255,255,255,0))",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: 18,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
          <BrandLogo size={22} stroke="#0f172a" />
          <span>RentBack</span>
        </div>
        <span style={{ fontSize: 12, opacity: 0.9, color: "#0f172a" }}>
          VIRTUAL • Debit
        </span>
      </div>

      <div
        style={{
          marginTop: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: 1,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>
          **** **** **** 0007
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 6,
            fontSize: 12,
            color: "#0f172a",
          }}
        >
          <span>Exp 12/27</span>
          <span>PKR</span>
        </div>
      </div>
    </div>
  </div>
);

// Rewards (PK market)
const rewardsData = [
  { id: "jazz", title: "Jazz Load", note: "Mobile top-up", save: "Save 5%" },
  { id: "telenor", title: "Telenor Load", note: "Mobile top-up", save: "Save 5%" },
  { id: "zong", title: "Zong Load", note: "Mobile top-up", save: "Save 5%" },
  { id: "ufone", title: "Ufone Load", note: "Mobile top-up", save: "Save 5%" },
  { id: "easyp", title: "Easypaisa Wallet", note: "Wallet credit", save: "Save 2%" },
  { id: "jazzc", title: "JazzCash Wallet", note: "Wallet credit", save: "Save 2%" },
  { id: "daraz", title: "Daraz Voucher", note: "Shopping", save: "Up to 8%" },
  { id: "careem", title: "Careem Credit", note: "Rides & food", save: "5%" },
  { id: "foodp", title: "Foodpanda", note: "Food delivery", save: "5%" },
  { id: "kesc", title: "KE Bill Credit", note: "Utilities", save: "2%" },
  { id: "lesco", title: "LESCO Credit", note: "Utilities", save: "2%" },
  { id: "ptcl", title: "PTCL Bill", note: "Broadband", save: "2%" },
] as const;

const RewardsGrid: React.FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 12,
    }}
  >
    {rewardsData.map((r) => (
      <div
        key={r.id}
        style={{
          padding: 12,
          borderRadius: 14,
          border: "1px solid rgba(0,0,0,0.06)",
          background: BRAND.surface,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ fontWeight: 600 }}>{r.title}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{r.note}</div>
        <div style={{ marginTop: 6 }}>
          <span
            style={{
              fontSize: 11,
              padding: "4px 6px",
              borderRadius: 8,
              background: "#ecfdf5",
              color: BRAND.primary,
            }}
          >
            {r.save}
          </span>
        </div>
        <button
          style={{
            marginTop: 8,
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.1)",
            background: BRAND.primary,
            color: "white",
            fontWeight: 600,
          }}
        >
          Redeem
        </button>
      </div>
    ))}
  </div>
);

// Receipt Modal
const ReceiptModal: React.FC<{ payment: Payment; onClose: () => void }> = ({
  payment,
  onClose,
}) => {
  const date = new Date(payment.ts).toLocaleString("en-PK");
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        background: "rgba(0,0,0,0.4)",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          background: BRAND.surface,
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 14,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: BRAND.primary,
            }}
          >
            <BrandLogo /> Receipt
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ opacity: 0.7 }}>Ref</div>
            <div style={{ fontWeight: 700 }}>{payment.ref}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Date</div>
            <div>{date}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Landlord / Property</div>
            <div>{payment.landlord}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Method</div>
            <div>{payment.method}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Status</div>
            <div style={{ fontWeight: 600 }}>{payment.status}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Amount</div>
            <div style={{ fontWeight: 700 }}>{formatPKR(payment.amount)}</div>
          </div>
          <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
            Demo receipt — no real funds moved.
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
            <button
              onClick={() => window.print()}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${BRAND.ring}`,
                background: BRAND.surface,
                fontWeight: 600,
              }}
            >
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${BRAND.ring}`,
                background: BRAND.primary,
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional Apps Script logging
async function postToSheet(p: Payment, role: Role, utm: Utm) {
  try {
    const endpoint = (window as any).RB_PAYMENTS_ENDPOINT as string | undefined;
    if (!endpoint) return;
    const payload = {
      table: "payments",
      ref: p.ref,
      amount: p.amount,
      landlord: p.landlord,
      method: p.method,
      status: p.status,
      ts: new Date(p.ts).toISOString(),
      role,
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      ua: navigator.userAgent,
    };
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {}
}

// Tabs
const HomeTab: React.FC<{ role: Role; kyc: KycState; goProfile: () => void }> = ({
  role,
  kyc,
  goProfile,
}) => {
  const headline = role === "tenant" ? "Your rent, organized" : "Your rentals, at a glance";
  const sub =
    role === "tenant"
      ? "Track dues, pay faster, and earn rewards."
      : "See incoming rents and tenant activity.";

  return (
    <div>
      <SectionTitle title={headline} subtitle={sub} />

      {/* KYC banner */}
      {kyc !== "verified" ? (
        <div
          style={{
            padding: 14,
            borderRadius: 16,
            border: `1px solid ${BRAND.ring}`,
            background: "linear-gradient(180deg, #f0fdf4, #ffffff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Verify your identity</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              Finish KYC to unlock higher limits and faster payouts.
            </div>
          </div>
          <button
            onClick={goProfile}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: `1px solid ${BRAND.ring}`,
              background: BRAND.primary,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Continue KYC
          </button>
        </div>
      ) : null}

      <div style={{ height: 16 }} />

      {/* Card */}
      <CardVisual />

      <div style={{ height: 16 }} />

      {/* Simple dashboard rows */}
      {role === "tenant" ? (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="PKR 120,000">Pending Balance</Row>
          <Row right="Due 1 Oct">Upcoming Rent</Row>
          <Row right="2 rewards">New Rewards</Row>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="3 units">Active Listings</Row>
          <Row right="PKR 360,000">Expected This Month</Row>
          <Row right="1 overdue">Follow-ups</Row>
        </div>
      )}
    </div>
  );
};

type PayTabProps = {
  payments: Payment[];
  addPayment: (p: Payment) => void;
  updatePayment: (id: string, patch: Partial<Payment>) => void;
  role: Role;
  utm: Utm;
  onOpenReceipt: (p: Payment) => void;
};

const PayTab: React.FC<PayTabProps> = ({
  payments,
  addPayment,
  updatePayment,
  role,
  utm,
  onOpenReceipt,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [landlord, setLandlord] = useState<string>("");
  const [method, setMethod] = useState<Payment["method"]>("Bank Transfer");
  const [message, setMessage] = useState<string>("");

  const handleCreate = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0 || !landlord.trim()) {
      setMessage("Enter amount and landlord name.");
      return;
    }
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    const status: PaymentStatus =
      method === "Bank Transfer" ? "initiated" : "succeeded";
    const base: Payment = {
      id,
      amount: amt,
      landlord: landlord.trim(),
      method,
      status,
      ts: Date.now(),
      ref,
    };
    addPayment(base);
    setMessage(
      method === "Bank Transfer"
        ? "Transfer instructions generated below. Mark as sent when done."
        : "Payment succeeded (demo). View receipt below."
    );
    setAmount("");
    setLandlord("");
    postToSheet(base, role, utm);
  };

  const markSent = (id: string) => {
    const p = payments.find((x) => x.id === id);
    if (!p) return;
    const patch: Partial<Payment> = { status: "sent" };
    updatePayment(id, patch);
    postToSheet({ ...p, ...patch } as Payment, role, utm);
  };

  const refund = (id: string) => {
    const p = payments.find((x) => x.id === id);
    if (!p) return;
    if (p.status === "refunded") return;
    const patch: Partial<Payment> = { status: "refunded" };
    updatePayment(id, patch);
    postToSheet({ ...p, ...patch } as Payment, role, utm);
  };

  const downloadCSV = () => {
    const headers = [
      "ref",
      "amount",
      "landlord",
      "method",
      "status",
      "ts",
      "role",
      "utmSource",
      "utmMedium",
      "utmCampaign",
    ];
    const rows = payments.map((p) => [
      p.ref,
      String(p.amount),
      p.landlord,
      p.method,
      p.status,
      new Date(p.ts).toISOString(),
      role,
      utm.source,
      utm.medium,
      utm.campaign,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rentback-demo-payments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <SectionTitle title="Pay rent" subtitle="Demo Mode — no real charges" />

      <div style={{ display: "grid", gap: 10, marginBottom: 10 }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Amount (PKR)"
          inputMode="numeric"
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.1)",
            background: BRAND.surface,
          }}
        />
        <input
          value={landlord}
          onChange={(e) => setLandlord(e.target.value)}
          placeholder="Landlord / Property"
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.1)",
            background: BRAND.surface,
          }}
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Payment["method"])}
          style={{
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.1)",
            background: BRAND.surface,
          }}
        >
          <option>Bank Transfer</option>
          <option>Card</option>
          <option>Wallet</option>
        </select>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={handleCreate}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: `1px solid ${BRAND.ring}`,
              background: BRAND.primary,
              color: "#fff",
              fontWeight: 700,
            }}
          >
            Create Payment (Demo)
          </button>
          <button
            onClick={downloadCSV}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: `1px solid ${BRAND.ring}`,
              background: BRAND.surface,
              color: BRAND.primary,
              fontWeight: 700,
            }}
          >
            Download CSV
          </button>
        </div>
        {message ? (
          <div style={{ fontSize: 12, color: BRAND.primary }}>{message}</div>
        ) : null}
      </div>

      <SectionTitle title="Recent" />
      <div style={{ display: "grid", gap: 10 }}>
        {payments.length === 0 ? (
          <div style={{ fontSize: 13, opacity: 0.7 }}>No demo payments yet.</div>
        ) : (
          payments
            .slice()
            .sort((a, b) => b.ts - a.ts)
            .map((p) => (
              <div
                key={p.id}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: BRAND.surface,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <span>{p.landlord}</span>
                  <span>{formatPKR(p.amount)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                    fontSize: 12,
                    opacity: 0.8,
                  }}
                >
                  <span>
                    {p.method} • Ref {p.ref}
                  </span>
                  <span
                    style={{
                      color:
                        p.status === "succeeded"
                          ? BRAND.primary
                          : p.status === "sent"
                          ? "#92400e"
                          : p.status === "refunded"
                          ? "#6b7280"
                          : "#1f2937",
                    }}
                  >
                    {p.status === "succeeded"
                      ? "Succeeded"
                      : p.status === "sent"
                      ? "Sent"
                      : p.status === "refunded"
                      ? "Refunded"
                      : "Instructions"}
                  </span>
                </div>
                {p.method === "Bank Transfer" && p.status === "initiated" ? (
                  <div style={{ marginTop: 10, fontSize: 12 }}>
                    <div>
                      Send to: <b>RentBack Collections</b>
                    </div>
                    <div>
                      IBAN: <b>PK00-RENT-0000-0000-0007</b>
                    </div>
                    <div>
                      Memo: <b>{p.ref}</b>
                    </div>
                    <button
                      onClick={() => markSent(p.id)}
                      style={{
                        marginTop: 8,
                        padding: "8px 10px",
                        borderRadius: 10,
                        border: `1px solid ${BRAND.ring}`,
                        background: BRAND.primary,
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      Mark as Sent
                    </button>
                  </div>
                ) : null}
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => onOpenReceipt(p)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background: BRAND.surface,
                      color: BRAND.primary,
                      fontWeight: 600,
                    }}
                  >
                    View Receipt
                  </button>
                  <button
                    onClick={() => refund(p.id)}
                    disabled={p.status === "refunded" || p.status === "initiated"}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background:
                        p.status === "refunded" || p.status === "initiated"
                          ? "#f9fafb"
                          : "#fff7ed",
                      color: "#92400e",
                      fontWeight: 600,
                      opacity:
                        p.status === "refunded" || p.status === "initiated" ? 0.6 : 1,
                    }}
                  >
                    {p.status === "refunded" ? "Refunded" : "Refund (Demo)"}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

const RewardsTab: React.FC = () => (
  <div>
    <SectionTitle title="Rewards" subtitle="Pakistan-focused perks" />
    <RewardsGrid />
  </div>
);

const SupportTab: React.FC = () => (
  <div>
    <SectionTitle title="Support" subtitle="We usually reply within 24h" />
    <Row right="help@rentback.app">Email support</Row>
    <div style={{ height: 8 }} />
    <Row right="@rentback">Twitter/X</Row>
  </div>
);

const ProfileTab: React.FC<{ kyc: KycState; setKyc: (k: KycState) => void }> = ({
  kyc,
  setKyc,
}) => (
  <div>
    <SectionTitle title="Profile" />
    <Row right={kyc === "verified" ? "Verified" : kyc === "in-progress" ? "In progress" : "Not started"}>
      KYC
    </Row>
    <div style={{ height: 8 }} />
    {kyc !== "verified" ? (
      <button
        onClick={() => setKyc(kyc === "none" ? "in-progress" : "verified")}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: `1px solid ${BRAND.ring}`,
          background: BRAND.primary,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {kyc === "none" ? "Start KYC" : "Complete KYC"}
      </button>
    ) : (
      <div style={{ fontSize: 12, opacity: 0.75 }}>KYC complete. Thanks!</div>
    )}
  </div>
);

const StatusScreen: React.FC = () => (
  <div>
    <SectionTitle
      title="Regulatory Status"
      subtitle="SBP Sandbox — preparation & updates"
    />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      <li>Preparation complete (materials & partner outreach)</li>
      <li>Draft application ready</li>
      <li>Awaiting sandbox submission window</li>
    </ul>
  </div>
);

const SecurityPrivacy: React.FC = () => (
  <div>
    <SectionTitle title="Security & Privacy" subtitle="How we protect your data" />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      <li>Encryption in transit; least-privilege access</li>
      <li>Payments via licensed partners; no full PAN stored</li>
      <li>Minimal retention; deletion on request (legal bounds)</li>
      <li>Planned: 2FA, device binding, audit logs</li>
      <li>Report issues: help@rentback.app</li>
    </ul>
  </div>
);

const AboutScreen: React.FC = () => (
  <div>
    <SectionTitle title="About RentBack" subtitle="Turning rent into rewards" />
    <p style={{ lineHeight: 1.6 }}>
      RentBack helps tenants pay rent conveniently while earning rewards, and gives
      landlords clearer visibility on incoming payments.
    </p>
  </div>
);

const FounderScreen: React.FC = () => (
  <div>
    <SectionTitle title="Founder" />
    <div style={{ display: "grid", gap: 8 }}>
      <Row right="CEO">Suhail Ahmed</Row>
      <Row right="help@rentback.app">Contact</Row>
    </div>
  </div>
);

// App shell
function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<Role>("tenant");
  const [kyc, setKyc] = useState<KycState>("none");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receiptFor, setReceiptFor] = useState<Payment | null>(null);
  const utm = useMemo(() => getUtm(), []);

  // persist demo payments
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rb-demo-payments");
      if (raw) setPayments(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("rb-demo-payments", JSON.stringify(payments));
    } catch {}
  }, [payments]);

  const content = useMemo(() => {
    switch (tab) {
      case "home":
        return <HomeTab role={role} kyc={kyc} goProfile={() => setTab("profile")} />;
      case "pay":
        return (
          <PayTab
            payments={payments}
            addPayment={(p) => setPayments((prev) => [...prev, p])}
            updatePayment={(id, patch) =>
              setPayments((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))
            }
            role={role}
            utm={utm}
            onOpenReceipt={(p) => setReceiptFor(p)}
          />
        );
      case "rewards":
        return <RewardsTab />;
      case "support":
        return <SupportTab />;
      case "profile":
        return <ProfileTab kyc={kyc} setKyc={setKyc} />;
      case "status":
        return <StatusScreen />;
      case "security":
        return <SecurityPrivacy />;
      case "about":
        return <AboutScreen />;
      case "founder":
        return <FounderScreen />;
      default:
        return null;
    }
  }, [tab, role, kyc, payments, utm]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        display: "flex",
        flexDirection: "column",
        color: BRAND.text,
      }}
    >
      {/* Keyframes for animated card gradient */}
      <style>
        {
          "@keyframes rb-gradient-move {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}"
        }
      </style>

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
          RentBack
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            border: "1px solid rgba(0,0,0,0.1)",
            background: BRAND.surface,
            borderRadius: 10,
            padding: 8,
          }}
        >
          {/* Hamburger */}
          <div style={{ width: 18, height: 2, background: "#111", marginBottom: 3 }} />
          <div style={{ width: 18, height: 2, background: "#111", marginBottom: 3 }} />
          <div style={{ width: 18, height: 2, background: "#111" }} />
        </button>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: 14, paddingBottom: 80 }}>{content}</main>

      {/* Bottom Nav */}
      <nav
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          background: BRAND.surface,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          height: 64,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          alignItems: "center",
        }}
      >
        {(
          [
            { key: "home", label: "Home" },
            { key: "pay", label: "Pay" },
            { key: "rewards", label: "Rewards" },
            { key: "support", label: "Support" },
            { key: "profile", label: "Profile" },
          ] as { key: Tab; label: string }[]
        ).map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key)}
            style={{
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: tab === it.key ? 700 : 500,
              color: tab === it.key ? BRAND.primary : "#0f172a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span>{it.label}</span>
          </button>
        ))}
      </nav>

      {/* Right Drawer */}
      {menuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 320,
              maxWidth: "90%",
              height: "100%",
              background: BRAND.surface,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "-8px 0 24px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div style={{ fontWeight: 700 }}>Menu</div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close"
                style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}
              >
                ✕
              </button>
            </div>

            <SectionTitle title="Explore" />
            <Row
              onClick={() => {
                setTab("status");
                setMenuOpen(false);
              }}
            >
              Status
            </Row>
            <Row
              onClick={() => {
                setTab("security");
                setMenuOpen(false);
              }}
            >
              Security & Privacy
            </Row>
            <Row
              onClick={() => {
                setTab("rewards");
                setMenuOpen(false);
              }}
            >
              Rewards
            </Row>
            <Row
              onClick={() => {
                setTab("about");
                setMenuOpen(false);
              }}
            >
              About
            </Row>
            <Row
              onClick={() => {
                setTab("founder");
                setMenuOpen(false);
              }}
            >
              Founder
            </Row>
            <Row onClick={() => window.open("/privacy", "_blank")}>Privacy Policy</Row>
            <Row onClick={() => window.open("/terms", "_blank")}>Terms of Service</Row>

            <div style={{ height: 6 }} />
            <SectionTitle title="Role" subtitle="Switch experience" />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setRole("tenant")}>
                {role === "tenant" ? "● Tenant" : "Tenant"}
              </Pill>
              <Pill onClick={() => setRole("landlord")}>
                {role === "landlord" ? "● Landlord" : "Landlord"}
              </Pill>
            </div>
          </div>
        </div>
      ) : null}

      {/* Receipt Modal */}
      {receiptFor ? (
        <ReceiptModal payment={receiptFor} onClose={() => setReceiptFor(null)} />
      ) : null}
    </div>
  );
}

export default function Page() {
  return <App />;
}
