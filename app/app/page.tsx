'use client';

import React, { useEffect, useMemo, useState } from "react";

// ==========================
// RentBack — Unified App Prototype (LIVE)
// - Bottom nav (Home, Pay, Rewards, Support, Profile)
// - Right Drawer: Status, Security & Privacy, Rewards, About, Founder, Privacy, Terms, Language, Role switch
// - Simple EN/UR i18n with RTL handling
// - Demo Payments with Receipt modal + CSV + localStorage
// - Animated gradient card (ends with 0007)
// - Rewards grid (PK starter catalog)
// ==========================

// ---- Brand palette
const BRAND = {
  primary: "#059669", // emerald-600
  primarySoft: "#10b981", // emerald-500
  primaryLite: "#34d399", // emerald-400
  teal: "#14b8a6", // teal-500
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
  ring: "rgba(5,150,105,0.20)",
} as const;

// ---- i18n strings (EN + UR)
const STRINGS = {
  en: {
    appName: "RentBack",
    homeTitleTenant: "Your rent, organized",
    homeSubTenant: "Track dues, pay faster, and earn rewards.",
    homeTitleLandlord: "Your rentals, at a glance",
    homeSubLandlord: "See incoming rents and tenant activity.",

    kycTitle: "Verify your identity",
    kycSub: "Finish KYC to unlock higher limits and faster payouts.",
    kycCta: "Continue KYC",

    pendingBalance: "Pending Balance",
    upcomingRent: "Upcoming Rent",
    newRewards: "New Rewards",
    activeListings: "Active Listings",
    expectedMonth: "Expected This Month",
    followUps: "Follow-ups",

    payTitle: "Pay rent",
    paySub: "Demo Mode — no real charges",
    amountPh: "Amount (PKR)",
    landlordPh: "Landlord / Property",
    bank: "Bank Transfer",
    card: "Card",
    wallet: "Wallet",
    createDemo: "Create Payment (Demo)",
    downloadCsv: "Download CSV",
    recent: "Recent",
    markSent: "Mark as Sent",
    viewReceipt: "View Receipt",
    refunded: "Refunded",
    refundDemo: "Refund (Demo)",

    rewardsTitle: "Rewards",
    rewardsSub: "Pakistan‑focused perks",
    redeem: "Redeem",

    supportTitle: "Support",
    supportSub: "We usually reply within 24h",
    emailSupport: "Email support",

    profile: "Profile",
    kyc: "KYC",
    startKyc: "Start KYC",
    completeKyc: "Complete KYC",
    kycDone: "KYC complete. Thanks!",

    statusTitle: "Regulatory Status",
    statusSub: "SBP Sandbox — preparation & updates",

    secTitle: "Security & Privacy",
    secSub: "How we protect your data",

    aboutTitle: "About RentBack",
    aboutSub: "Turning rent into rewards",

    founder: "Founder",

    navHome: "Home",
    navPay: "Pay",
    navRewards: "Rewards",
    navSupport: "Support",
    navProfile: "Profile",

    drawerMenu: "Menu",
    drawerExplore: "Explore",
    drawerStatus: "Status",
    drawerSecurity: "Security & Privacy",
    drawerAbout: "About",
    drawerFounder: "Founder",
    drawerPrivacy: "Privacy Policy",
    drawerTerms: "Terms of Service",
    drawerRole: "Role",
    drawerLang: "Language",

    tenant: "Tenant",
    landlord: "Landlord",
  },
  ur: {
    appName: "رینٹ بیک",
    homeTitleTenant: "آپ کا کرایہ منظم",
    homeSubTenant: "واجبات ٹریک کریں، تیزی سے ادا کریں اور انعامات حاصل کریں۔",
    homeTitleLandlord: "آپ کے کرائے، ایک نظر میں",
    homeSubLandlord: "آنے والی ادائیگیاں اور کرایہ دار سرگرمی دیکھیں۔",

    kycTitle: "اپنی شناخت کی تصدیق کریں",
    kycSub: "زیادہ حدود اور تیز ادائیگیوں کے لیے KYC مکمل کریں۔",
    kycCta: "KYC جاری رکھیں",

    pendingBalance: "بقایا رقم",
    upcomingRent: "آئندہ کرایہ",
    newRewards: "نئے انعامات",
    activeListings: "فعال لسٹنگز",
    expectedMonth: "اس ماہ متوقع",
    followUps: "فالو اپس",

    payTitle: "کرایہ ادا کریں",
    paySub: "ڈیمو موڈ — حقیقی چارجز نہیں",
    amountPh: "رقم (PKR)",
    landlordPh: "مالک مکان / پراپرٹی",
    bank: "بینک ٹرانسفر",
    card: "کارڈ",
    wallet: "والیٹ",
    createDemo: "ڈیمو ادائیگی بنائیں",
    downloadCsv: "CSV ڈاؤن لوڈ کریں",
    recent: "حالیہ",
    markSent: "بھیج دیا نشان لگائیں",
    viewReceipt: "رسید دیکھیں",
    refunded: "واپس کر دی گئی",
    refundDemo: "ریفنڈ (ڈیمو)",

    rewardsTitle: "انعامات",
    rewardsSub: "پاکستان کے مطابق سہولیات",
    redeem: "ریڈیم",

    supportTitle: "مدد",
    supportSub: "ہم عموماً 24 گھنٹوں میں جواب دیتے ہیں",
    emailSupport: "ای میل سپورٹ",

    profile: "پروفائل",
    kyc: "KYC",
    startKyc: "KYC شروع کریں",
    completeKyc: "KYC مکمل کریں",
    kycDone: "KYC مکمل۔ شکریہ!",

    statusTitle: "ریگولیٹری حیثیت",
    statusSub: "اسٹیٹ بینک سینڈ باکس — تیاری اور اپڈیٹس",

    secTitle: "سیکیورٹی اور پرائیویسی",
    secSub: "ہم آپ کے ڈیٹا کو کیسے محفوظ رکھتے ہیں",

    aboutTitle: "رینٹ بیک کے بارے میں",
    aboutSub: "کرایہ کو انعامات میں بدلنا",

    founder: "بانی",

    navHome: "ہوم",
    navPay: "ادائیگی",
    navRewards: "انعامات",
    navSupport: "مدد",
    navProfile: "پروفائل",

    drawerMenu: "مینیو",
    drawerExplore: "ایکسپلور",
    drawerStatus: "اسٹیٹس",
    drawerSecurity: "سیکیورٹی اور پرائیویسی",
    drawerAbout: "متعلق",
    drawerFounder: "بانی",
    drawerPrivacy: "پرائیویسی پالیسی",
    drawerTerms: "سروس کی شرائط",
    drawerRole: "کردار",
    drawerLang: "زبان",

    tenant: "کرایہ دار",
    landlord: "مالک",
  },
} as const;

// ---- Helpers
const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

const getUtm = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
    };
  } catch {
    return { source: "", medium: "", campaign: "" };
  }
};

// ---- Reusable UI
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
    {subtitle ? <div style={{ opacity: 0.75, fontSize: 13, marginTop: 4 }}>{subtitle}</div> : null}
  </div>
);

const Row: React.FC<{ children: React.ReactNode; right?: React.ReactNode; onClick?: () => void }> = ({ children, right, onClick }) => (
  <button
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
  </button>
);

const Pill: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
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

const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({ size = 20, stroke = BRAND.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9h14v-9" />
  </svg>
);

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
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient( to bottom right, rgba(255,255,255,0.14), rgba(255,255,255,0) )" }} />
    <div style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
          <BrandLogo size={22} stroke="#0f172a" />
          <span>RentBack</span>
        </div>
        <span style={{ fontSize: 12, opacity: 0.9, color: "#0f172a" }}>VIRTUAL • Debit</span>
      </div>

      <div style={{ marginTop: "auto", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>**** **** **** 0007</div>
        <div style={{ display: "flex", gap: 20, marginTop: 6, fontSize: 12, color: "#0f172a" }}>
          <span>Exp 12/27</span>
          <span>PKR</span>
        </div>
      </div>
    </div>
  </div>
);

// Rewards starter catalog
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

const RewardsGrid: React.FC<{ t: any; onRedeem?: (id: string) => void }> = ({ t, onRedeem }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
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
          <span style={{ fontSize: 11, padding: "4px 6px", borderRadius: 8, background: "#ecfdf5", color: BRAND.primary }}>{r.save}</span>
        </div>
        <button
          onClick={() => onRedeem && onRedeem(r.id)}
          style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.primary, color: "white", fontWeight: 600 }}
        >
          {t.redeem}
        </button>
      </div>
    ))}
  </div>
);

// Payment types
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

// Receipt modal
const ReceiptModal: React.FC<{ payment: Payment; onClose: () => void }> = ({ payment, onClose }) => {
  const date = new Date(payment.ts).toLocaleString("en-PK");
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", padding: 16 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 720, background: BRAND.surface, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
            <BrandLogo /> Receipt
          </div>
          <button onClick={onClose} aria-label="Close" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}>✕</button>
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
          <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>Demo receipt — no real funds moved.</div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
            <button onClick={() => window.print()} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, fontWeight: 600 }}>Print / Save PDF</button>
            <button onClick={onClose} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 700 }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optional: Google Sheet logging (Apps Script)
async function postToSheet(p: Payment, role: "tenant" | "landlord", utm: { source: string; medium: string; campaign: string }) {
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

// ---- Tabs
const HomeTab: React.FC<{ role: "tenant" | "landlord"; kyc: "none" | "in-progress" | "verified"; goProfile: () => void; t: any }> = ({ role, kyc, goProfile, t }) => {
  const headline = role === "tenant" ? t.homeTitleTenant : t.homeTitleLandlord;
  const sub = role === "tenant" ? t.homeSubTenant : t.homeSubLandlord;
  return (
    <div>
      <SectionTitle title={headline} subtitle={sub} />
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
            <div style={{ fontWeight: 700 }}>{t.kycTitle}</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{t.kycSub}</div>
          </div>
          <button onClick={goProfile} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}>{t.kycCta}</button>
        </div>
      ) : null}

      <div style={{ height: 16 }} />
      <CardVisual />
      <div style={{ height: 16 }} />

      {role === "tenant" ? (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="PKR 120,000">{t.pendingBalance}</Row>
          <Row right="Due 1 Oct">{t.upcomingRent}</Row>
          <Row right="2">{t.newRewards}</Row>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="3">{t.activeListings}</Row>
          <Row right="PKR 360,000">{t.expectedMonth}</Row>
          <Row right="1">{t.followUps}</Row>
        </div>
      )}
    </div>
  );
};

const PayTab: React.FC<{
  payments: Payment[];
  addPayment: (p: Payment) => void;
  updatePayment: (id: string, patch: Partial<Payment>) => void;
  role: "tenant" | "landlord";
  utm: { source: string; medium: string; campaign: string };
  onOpenReceipt: (p: Payment) => void;
  t: any;
}> = ({ payments, addPayment, updatePayment, role, utm, onOpenReceipt, t }) => {
  const [amount, setAmount] = useState("");
  const [landlord, setLandlord] = useState("");
  const [method, setMethod] = useState<Payment["method"]>("Bank Transfer");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0 || !landlord.trim()) {
      setMessage("Enter amount and landlord name.");
      return;
    }
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    const status: PaymentStatus = method === "Bank Transfer" ? "initiated" : "succeeded";
    const base: Payment = { id, amount: amt, landlord: landlord.trim(), method, status, ts: Date.now(), ref };
    addPayment(base);
    setMessage(method === "Bank Transfer" ? "Transfer instructions generated below. Mark as sent when done." : "Payment succeeded (demo). View receipt below.");
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
    const headers = ["ref", "amount", "landlord", "method", "status", "ts", "role", "utmSource", "utmMedium", "utmCampaign"];
    const rows = payments.map((p) => [p.ref, String(p.amount), p.landlord, p.method, p.status, new Date(p.ts).toISOString(), role, utm.source, utm.medium, utm.campaign]);
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
      <SectionTitle title={t.payTitle} subtitle={t.paySub} />

      <div style={{ display: "grid", gap: 10, marginBottom: 10 }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={t.amountPh}
          inputMode="numeric"
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        />
        <input
          value={landlord}
          onChange={(e) => setLandlord(e.target.value)}
          placeholder={t.landlordPh}
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Payment["method"])}
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        >
          <option>{t.bank}</option>
          <option>{t.card}</option>
          <option>{t.wallet}</option>
        </select>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={handleCreate} style={{ padding: "12px 14px", borderRadius: 12, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 700 }}>{t.createDemo}</button>
          <button onClick={downloadCSV} style={{ padding: "12px 14px", borderRadius: 12, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, color: BRAND.primary, fontWeight: 700 }}>{t.downloadCsv}</button>
        </div>
        {message ? <div style={{ fontSize: 12, color: BRAND.primary }}>{message}</div> : null}
      </div>

      <SectionTitle title={t.recent} />
      <div style={{ display: "grid", gap: 10 }}>
        {payments.length === 0 ? (
          <div style={{ fontSize: 13, opacity: 0.7 }}>No demo payments yet.</div>
        ) : (
          payments
            .slice()
            .sort((a, b) => b.ts - a.ts)
            .map((p) => (
              <div key={p.id} style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: BRAND.surface }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span>{p.landlord}</span>
                  <span>{formatPKR(p.amount)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                  <span>
                    {p.method} • Ref {p.ref}
                  </span>
                  <span style={{ color: p.status === "succeeded" ? BRAND.primary : p.status === "sent" ? "#92400e" : p.status === "refunded" ? "#6b7280" : "#1f2937" }}>
                    {p.status === "succeeded" ? "Succeeded" : p.status === "sent" ? "Sent" : p.status === "refunded" ? "Refunded" : "Instructions"}
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
                    <button onClick={() => markSent(p.id)} style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}>
                      {t.markSent}
                    </button>
                  </div>
                ) : null}
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => onOpenReceipt(p)} style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, color: BRAND.primary, fontWeight: 600 }}>
                    {t.viewReceipt}
                  </button>
                  <button
                    onClick={() => refund(p.id)}
                    disabled={p.status === "refunded" || p.status === "initiated"}
                    style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: p.status === "refunded" || p.status === "initiated" ? "#f9fafb" : "#fff7ed", color: "#92400e", fontWeight: 600, opacity: p.status === "refunded" || p.status === "initiated" ? 0.6 : 1 }}
                  >
                    {p.status === "refunded" ? t.refunded : t.refundDemo}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

const RewardsTab: React.FC<{ t: any; onRedeem: (id: string) => void }> = ({ t, onRedeem }) => (
  <div>
    <SectionTitle title={t.rewardsTitle} subtitle={t.rewardsSub} />
    <RewardsGrid t={t} onRedeem={onRedeem} />
  </div>
);

const SupportTab: React.FC<{ t: any }> = ({ t }) => (
  <div>
    <SectionTitle title={t.supportTitle} subtitle={t.supportSub} />
    <Row right="help@rentback.app">{t.emailSupport}</Row>
    <div style={{ height: 8 }} />
    <Row right="@rentback">Twitter/X</Row>
  </div>
);

const ProfileTab: React.FC<{ kyc: "none" | "in-progress" | "verified"; setKyc: (k: any) => void; t: any }> = ({ kyc, setKyc, t }) => (
  <div>
    <SectionTitle title={t.profile} />
    <Row right={kyc === "verified" ? "Verified" : kyc === "in-progress" ? "In progress" : "Not started"}>{t.kyc}</Row>
    <div style={{ height: 8 }} />
    {kyc !== "verified" ? (
      <button onClick={() => setKyc(kyc === "none" ? "in-progress" : "verified")} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}>
        {kyc === "none" ? t.startKyc : t.completeKyc}
      </button>
    ) : (
      <div style={{ fontSize: 12, opacity: 0.75 }}>{t.kycDone}</div>
    )}
  </div>
);

const StatusScreen: React.FC<{ t: any }> = ({ t }) => (
  <div>
    <SectionTitle title={t.statusTitle} subtitle={t.statusSub} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      <li>Preparation complete (materials & partner outreach)</li>
      <li>Draft application ready</li>
      <li>Awaiting sandbox submission window</li>
    </ul>
  </div>
);

const SecurityPrivacy: React.FC<{ t: any }> = ({ t }) => (
  <div>
    <SectionTitle title={t.secTitle} subtitle={t.secSub} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      <li>Encryption in transit; least-privilege access</li>
      <li>Payments via licensed partners; no full PAN stored</li>
      <li>Minimal retention; deletion on request (legal bounds)</li>
      <li>Planned: 2FA, device binding, audit logs</li>
      <li>Report issues: help@rentback.app</li>
    </ul>
  </div>
);

const AboutScreen: React.FC<{ t: any }> = ({ t }) => (
  <div>
    <SectionTitle title={t.aboutTitle} subtitle={t.aboutSub} />
    <p style={{ lineHeight: 1.6 }}>RentBack helps tenants pay rent conveniently while earning rewards, and gives landlords clearer visibility on incoming payments.</p>
  </div>
);

const FounderScreen: React.FC<{ t: any }> = ({ t }) => (
  <div>
    <SectionTitle title={t.founder} />
    <div style={{ display: "grid", gap: 8 }}>
      <Row right="CEO">Suhail Ahmed</Row>
      <Row right="help@rentback.app">Contact</Row>
    </div>
  </div>
);

// ---- App
export default function App() {
  const [tab, setTab] = useState<
    | "home"
    | "pay"
    | "rewards"
    | "support"
    | "profile"
    | "status"
    | "security"
    | "about"
    | "founder"
  >("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [kyc, setKyc] = useState<"none" | "in-progress" | "verified">("none");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receiptFor, setReceiptFor] = useState<Payment | null>(null);
  const [lang, setLang] = useState<"en" | "ur">("en");

  const utm = useMemo(() => getUtm(), []);
  const t = STRINGS[lang];

  // Persist/restore demo payments
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

  // Language → set html lang/dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const content = useMemo(() => {
    switch (tab) {
      case "home":
        return <HomeTab role={role} kyc={kyc} goProfile={() => setTab("profile")} t={t} />;
      case "pay":
        return (
          <PayTab
            payments={payments}
            addPayment={(p) => setPayments((prev) => [...prev, p])}
            updatePayment={(id, patch) => setPayments((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))}
            role={role}
            utm={utm}
            onOpenReceipt={(p) => setReceiptFor(p)}
            t={t}
          />
        );
      case "rewards":
        return <RewardsTab t={t} onRedeem={(id) => alert(`Redeem ${id} — coming soon`)} />;
      case "support":
        return <SupportTab t={t} />;
      case "profile":
        return <ProfileTab kyc={kyc} setKyc={setKyc} t={t} />;
      case "status":
        return <StatusScreen t={t} />;
      case "security":
        return <SecurityPrivacy t={t} />;
      case "about":
        return <AboutScreen t={t} />;
      case "founder":
        return <FounderScreen t={t} />;
      default:
        return null;
    }
  }, [tab, role, kyc, payments, utm, t]);

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
      <style>{"@keyframes rb-gradient-move {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}"}</style>

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
          <BrandLogo /> {t.appName}
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{ border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface, borderRadius: 10, padding: 8 }}
        >
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
        {[
          { key: "home", label: t.navHome },
          { key: "pay", label: t.navPay },
          { key: "rewards", label: t.navRewards },
          { key: "support", label: t.navSupport },
          { key: "profile", label: t.navProfile },
        ].map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key as any)}
            style={{
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: tab === (it.key as any) ? 700 : 500,
              color: tab === (it.key as any) ? BRAND.primary : "#0f172a",
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
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.35)", display: "flex", justifyContent: "flex-end" }}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>{t.drawerMenu}</div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}>✕</button>
            </div>

            <SectionTitle title={t.drawerExplore} />
            <Row onClick={() => { setTab("status"); setMenuOpen(false); }}>{t.drawerStatus}</Row>
            <Row onClick={() => { setTab("security"); setMenuOpen(false); }}>{t.drawerSecurity}</Row>
            <Row onClick={() => { setTab("rewards"); setMenuOpen(false); }}>{t.navRewards}</Row>
            <Row onClick={() => { setTab("about"); setMenuOpen(false); }}>{t.drawerAbout}</Row>
            <Row onClick={() => { setTab("founder"); setMenuOpen(false); }}>{t.drawerFounder}</Row>
            <Row onClick={() => { window.open("/privacy", "_blank"); }}>{t.drawerPrivacy}</Row>
            <Row onClick={() => { window.open("/terms", "_blank"); }}>{t.drawerTerms}</Row>

            <div style={{ height: 6 }} />
            <SectionTitle title={t.drawerRole} subtitle="Switch experience" />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setRole("tenant")}>{role === "tenant" ? "● " + t.tenant : t.tenant}</Pill>
              <Pill onClick={() => setRole("landlord")}>{role === "landlord" ? "● " + t.landlord : t.landlord}</Pill>
            </div>

            <div style={{ height: 6 }} />
            <SectionTitle title={t.drawerLang} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setLang("en")}>{lang === "en" ? "● EN" : "EN"}</Pill>
              <Pill onClick={() => setLang("ur")}>{lang === "ur" ? "● UR" : "UR"}</Pill>
            </div>
          </div>
        </div>
      ) : null}

      {receiptFor ? <ReceiptModal payment={receiptFor} onClose={() => setReceiptFor(null)} /> : null}
    </div>
  );
}
