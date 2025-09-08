"use client";
import React, { useEffect, useMemo, useState } from "react";

/**
 * RentBack — Unified App Prototype (single Preview)
 * - Brand palette
 * - EN/UR i18n with toggle (and RTL for UR)
 * - Bottom nav: Home, Pay, Rewards, Support, Profile
 * - Right drawer: Status, Security & Privacy, Rewards, About, Founder, Privacy, Terms
 * - Role switch: Tenant / Landlord
 * - KYC banner → Profile
 * - Demo Payments: create / mark sent / refund + receipt modal + CSV + Sheet logging
 * - Rewards: PK catalog → redeem modal → local list + receipt modal + Sheet logging
 * - LocalStorage persistence for payments and redemptions
 */

// ---------- Brand ----------
const BRAND = {
  primary: "#059669", // emerald-600
  primarySoft: "#10b981",
  primaryLite: "#34d399",
  teal: "#14b8a6",
  bg: "#f6faf8",
  surface: "#ffffff",
  text: "#0b0b0b",
  ring: "rgba(5,150,105,0.20)",
} as const;

// ---------- Types ----------
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

type Utm = { source: string; medium: string; campaign: string };

// Structural i18n type so both EN and UR fit (no literal union errors)
type I18n = { [key: string]: any };

// ---------- Utils ----------
const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

const getUtm = (): Utm => {
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

const getUA = () => {
  try {
    return navigator.userAgent || "";
  } catch {
    return "";
  }
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

// Animated card visual
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
          "linear-gradient( to bottom right, rgba(255,255,255,0.14), rgba(255,255,255,0) )",
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

// ---------- Rewards Catalog ----------
const rewardsCatalog = [
  { id: "jazz", brand: "Jazz", title: "Jazz Load", note: "Mobile top-up", save: "Save 5%", denom: [200, 500, 1000] },
  { id: "telenor", brand: "Telenor", title: "Telenor Load", note: "Mobile top-up", save: "Save 5%", denom: [200, 500, 1000] },
  { id: "zong", brand: "Zong", title: "Zong Load", note: "Mobile top-up", save: "Save 5%", denom: [200, 500, 1000] },
  { id: "ufone", brand: "Ufone", title: "Ufone Load", note: "Mobile top-up", save: "Save 5%", denom: [200, 500, 1000] },
  { id: "easyp", brand: "Easypaisa", title: "Easypaisa Wallet", note: "Wallet credit", save: "2%", denom: [500, 1000, 2000] },
  { id: "jazzc", brand: "JazzCash", title: "JazzCash Wallet", note: "Wallet credit", save: "2%", denom: [500, 1000, 2000] },
  { id: "daraz", brand: "Daraz", title: "Daraz Voucher", note: "Shopping", save: "Up to 8%", denom: [500, 1000, 2000] },
  { id: "careem", brand: "Careem", title: "Careem Credit", note: "Rides & food", save: "5%", denom: [300, 500, 1000] },
  { id: "foodp", brand: "Foodpanda", title: "Foodpanda", note: "Food delivery", save: "5%", denom: [300, 500, 1000] },
  { id: "kesc", brand: "K-Electric", title: "KE Bill Credit", note: "Utilities", save: "2%", denom: [500, 1000, 2000] },
  { id: "lesco", brand: "LESCO", title: "LESCO Credit", note: "Utilities", save: "2%", denom: [500, 1000, 2000] },
  { id: "ptcl", brand: "PTCL", title: "PTCL Bill", note: "Broadband", save: "2%", denom: [500, 1000, 2000] },
] as const;

// ---------- i18n ----------
const copy = {
  en: {
    appName: "RentBack",
    menu: "Menu",
    nav: { home: "Home", pay: "Pay", rewards: "Rewards", support: "Support", profile: "Profile" },
    drawer: {
      explore: "Explore",
      status: "Status",
      security: "Security & Privacy",
      rewards: "Rewards",
      about: "About",
      founder: "Founder",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      role: "Role",
      roleHint: "Switch experience",
      tenant: "Tenant",
      landlord: "Landlord",
      lang: "Language",
    },
    home: {
      headlineTenant: "Your rent, organized",
      subTenant: "Track dues, pay faster, and earn rewards.",
      headlineLandlord: "Your rentals, at a glance",
      subLandlord: "See incoming rents and tenant activity.",
      kycTitle: "Verify your identity",
      kycSub: "Finish KYC to unlock higher limits and faster payouts.",
      kycCta: "Continue KYC",
      tenantRows: { pending: "Pending Balance", upcoming: "Upcoming Rent", rewards: "New Rewards" },
      landlordRows: { listings: "Active Listings", expected: "Expected This Month", followups: "Follow-ups" },
    },
    pay: {
      title: "Pay rent",
      subtitle: "Demo Mode — no real charges",
      amount: "Amount (PKR)",
      landlord: "Landlord / Property",
      method: "Method",
      create: "Create Payment (Demo)",
      csv: "Download CSV",
      recent: "Recent",
      instructions: "Instructions",
      succeeded: "Succeeded",
      sent: "Sent",
      refunded: "Refunded",
      markSent: "Mark as Sent",
      receipt: "View Receipt",
      refund: "Refund (Demo)",
      invalid: "Enter amount and landlord name.",
      transferTo: "Send to",
      iban: "IBAN",
      memo: "Memo",
      collections: "RentBack Collections",
      ibanValue: "PK00-RENT-0000-0000-0007",
      demoNote: "Demo receipt — no real funds moved.",
      print: "Print / Save PDF",
      close: "Close",
      status: "Status",
    },
    rewards: {
      title: "Rewards",
      subtitle: "Pakistan-focused perks",
      redeem: "Redeem",
      choose: "Choose denomination",
      confirm: "Confirm Redemption",
      cancel: "Cancel",
      recent: "Recent Redemptions",
      none: "No redemptions yet.",
      viewReceipt: "View Redeem Receipt",
      markFulfilled: "Mark Fulfilled",
      markCancelled: "Cancel",
      receiptTitle: "Redemption Receipt",
      points: "Points",
      status: "Status",
    },
    support: {
      title: "Support",
      subtitle: "We usually reply within 24h",
      email: "Email support",
      twitter: "Twitter/X",
    },
    profile: {
      title: "Profile",
      kyc: "KYC",
      verified: "Verified",
      inprogress: "In progress",
      notStarted: "Not started",
      start: "Start KYC",
      complete: "Complete KYC",
      thanks: "KYC complete. Thanks!",
    },
    status: {
      title: "Regulatory Status",
      subtitle: "SBP Sandbox — preparation & updates",
      items: [
        "Preparation complete (materials & partner outreach)",
        "Draft application ready",
        "Awaiting sandbox submission window",
      ],
    },
    security: {
      title: "Security & Privacy",
      subtitle: "How we protect your data",
      items: [
        "Encryption in transit; least-privilege access",
        "Payments via licensed partners; no full PAN stored",
        "Minimal retention; deletion on request (legal bounds)",
        "Planned: 2FA, device binding, audit logs",
        "Report issues: help@rentback.app",
      ],
    },
    about: {
      title: "About RentBack",
      sub: "Turning rent into rewards",
      body:
        "RentBack helps tenants pay rent conveniently while earning rewards, and gives landlords clearer visibility on incoming payments.",
    },
    founder: { title: "Founder", contact: "Contact" },
    langNames: { en: "English", ur: "اردو" },
  },
  ur: {
    appName: "RentBack",
    menu: "می뉴",
    nav: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", support: "مدد", profile: "پروفائل" },
    drawer: {
      explore: "ایکسپلور",
      status: "اسٹیٹس",
      security: "سیکورٹی اور پرائیویسی",
      rewards: "انعامات",
      about: "متعلق",
      founder: "بانی",
      privacy: "پرائیویسی پالیسی",
      terms: "شرائطِ استعمال",
      role: "کردار",
      roleHint: "تجربہ تبدیل کریں",
      tenant: "کرایہ دار",
      landlord: "مالک مکان",
      lang: "زبان",
    },
    home: {
      headlineTenant: "آپ کا کرایہ، منظم",
      subTenant: "ادائیگیاں ٹریک کریں، تیزی سے ادا کریں، اور انعامات پائیں۔",
      headlineLandlord: "آپ کی رینٹل ایک نظر میں",
      subLandlord: "آنے والی ادائیگیاں اور کرایہ داروں کی سرگرمی دیکھیں۔",
      kycTitle: "شناخت کی تصدیق کریں",
      kycSub: "زیادہ حدیں اور تیز ادائیگیوں کے لیے KYC مکمل کریں۔",
      kycCta: "KYC جاری رکھیں",
      tenantRows: { pending: "بقیہ رقم", upcoming: "آئندہ کرایہ", rewards: "نئے انعامات" },
      landlordRows: { listings: "فعال لسٹنگز", expected: "اس ماہ متوقع", followups: "فالو اپس" },
    },
    pay: {
      title: "کرایہ ادا کریں",
      subtitle: "ڈیمو موڈ — کوئی حقیقی چارج نہیں",
      amount: "رقم (PKR)",
      landlord: "مالک / پراپرٹی",
      method: "طریقہ",
      create: "ادائیگی بنائیں (ڈیمو)",
      csv: "CSV ڈاؤن لوڈ",
      recent: "حالیہ",
      instructions: "ہدایات",
      succeeded: "کامیاب",
      sent: "بھیج دیا",
      refunded: "ریفنڈ",
      markSent: "بھیجا گیا نشان لگائیں",
      receipt: "رسید دیکھیں",
      refund: "ریفنڈ (ڈیمو)",
      invalid: "رقم اور مالک/پراپرٹی لکھیں۔",
      transferTo: "موصول کنندہ",
      iban: "IBAN",
      memo: "میمو",
      collections: "RentBack Collections",
      ibanValue: "PK00-RENT-0000-0000-0007",
      demoNote: "ڈیمو رسید — کوئی حقیقی رقم منتقل نہیں ہوئی۔",
      print: "پرنٹ / PDF محفوظ کریں",
      close: "بند کریں",
      status: "اسٹیٹس",
    },
    rewards: {
      title: "انعامات",
      subtitle: "پاکستان کے لیے منتخب سہولتیں",
      redeem: "ریڈیم",
      choose: "ڈینامینیشن منتخب کریں",
      confirm: "ریڈیم کی تصدیق",
      cancel: "منسوخ",
      recent: "حالیہ ریڈیمپشنز",
      none: "ابھی تک کوئی ریڈیمپشن نہیں۔",
      viewReceipt: "ریڈیم رسید",
      markFulfilled: "فلفلڈ",
      markCancelled: "منسوخ",
      receiptTitle: "ریڈیمپشن رسید",
      points: "پوائنٹس",
      status: "اسٹیٹس",
    },
    support: {
      title: "مدد",
      subtitle: "عام طور پر 24 گھنٹوں میں جواب",
      email: "ای میل سپورٹ",
      twitter: "ٹوئٹر/X",
    },
    profile: {
      title: "پروفائل",
      kyc: "KYC",
      verified: "تصدیق شدہ",
      inprogress: "جاری",
      notStarted: "شروع نہیں",
      start: "KYC شروع کریں",
      complete: "KYC مکمل کریں",
      thanks: "KYC مکمل۔ شکریہ!",
    },
    status: {
      title: "ریگولیٹری اسٹیٹس",
      subtitle: "SBP سینڈ باکس — تیاری اور اپ ڈیٹس",
      items: [
        "تیاری مکمل (مواد اور پارٹنر آؤٹ ریچ)",
        "ڈرافٹ درخواست تیار",
        "سینڈ باکس جمع کرانے کی ونڈو کا انتظار",
      ],
    },
    security: {
      title: "سیکورٹی اور پرائیویسی",
      subtitle: "ہم آپ کے ڈیٹا کی حفاظت کیسے کرتے ہیں",
      items: [
        "ترسیل کے دوران انکرپشن؛ محدود رسائی",
        "ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے؛ مکمل کارڈ محفوظ نہیں",
        "کم از کم ریکارڈ رکھنا؛ قانونی حدود میں حذف",
        "منصوبہ: 2FA، ڈیوائس بائنڈنگ، آڈٹ لاگز",
        "رابطہ: help@rentback.app",
      ],
    },
    about: {
      title: "RentBack کے بارے میں",
      sub: "کرائے کو انعامات میں بدلنا",
      body:
        "RentBack کرایہ داروں کو سہولت سے ادائیگی اور انعامات دیتا ہے اور مالکان کو آمدنی پر واضح نظر فراہم کرتا ہے۔",
    },
    founder: { title: "بانی", contact: "رابطہ" },
    langNames: { en: "English", ur: "اردو" },
  },
} as const;

// ---------- Sheet logging ----------
async function postToSheet(payload: Record<string, any>) {
  try {
    const endpoint = (window as any).RB_PAYMENTS_ENDPOINT as string | undefined;
    if (!endpoint) return;
    const key = (window as any).RB_PAYMENTS_SECRET as string | undefined;
    const body = key ? { ...payload, key } : payload;
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {}
}

// ---------- Modals ----------
const PaymentReceiptModal: React.FC<{
  t: I18n;
  payment: Payment;
  onClose: () => void;
}> = ({ t, payment, onClose }) => {
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
            <BrandLogo /> {t.pay.receipt}
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ opacity: 0.7 }}>Ref</div>
            <div style={{ fontWeight: 700 }}>{payment.ref}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Date</div>
            <div>{date}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.pay.landlord}</div>
            <div>{payment.landlord}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.pay.method}</div>
            <div>{payment.method}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.pay.status}</div>
            <div style={{ fontWeight: 600 }}>{payment.status}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Amount</div>
            <div style={{ fontWeight: 700 }}>{formatPKR(payment.amount)}</div>
          </div>
          <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>{t.pay.demoNote}</div>
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
              {t.pay.print}
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
              {t.pay.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RedeemModal: React.FC<{
  t: I18n;
  reward: (typeof rewardsCatalog)[number] | null;
  onClose: () => void;
  onConfirm: (denom: number) => void;
}> = ({ t, reward, onClose, onConfirm }) => {
  const [denom, setDenom] = useState<number | null>(null);
  if (!reward) return null;
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
          maxWidth: 520,
          background: BRAND.surface,
          borderRadius: 16,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          padding: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 10 }}>
          {t.rewards.choose}: {reward.title}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {reward.denom.map((d) => (
            <button
              key={d}
              onClick={() => setDenom(d)}
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: `1px solid ${denom === d ? BRAND.primary : BRAND.ring}`,
                background: denom === d ? "#ecfdf5" : BRAND.surface,
                fontWeight: 600,
              }}
            >
              {formatPKR(d)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: `1px solid ${BRAND.ring}`,
              background: BRAND.surface,
              fontWeight: 600,
            }}
          >
            {t.rewards.cancel}
          </button>
          <button
            onClick={() => denom && onConfirm(denom)}
            disabled={!denom}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: `1px solid ${BRAND.ring}`,
              background: !denom ? "#f3f4f6" : BRAND.primary,
              color: !denom ? "#6b7280" : "#fff",
              fontWeight: 700,
              opacity: !denom ? 0.6 : 1,
            }}
          >
            {t.rewards.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

const RedeemReceiptModal: React.FC<{
  t: I18n;
  item: Redemption;
  onClose: () => void;
}> = ({ t, item, onClose }) => {
  const date = new Date(item.ts).toLocaleString("en-PK");
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
            <BrandLogo /> {t.rewards.receiptTitle}
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ opacity: 0.7 }}>Ref</div>
            <div style={{ fontWeight: 700 }}>{item.ref}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Date</div>
            <div>{date}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>Reward</div>
            <div>
              {item.brand} — {item.title} ({formatPKR(item.denomination)})
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.rewards.points}</div>
            <div>{item.points}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.rewards.status}</div>
            <div style={{ fontWeight: 600 }}>{item.status}</div>
          </div>

          <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
            Demo receipt — no real fulfillment performed.
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
              {t.pay.print}
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
              {t.pay.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Pages ----------
const HomeTab: React.FC<{
  t: I18n;
  role: Role;
  kyc: KycState;
  goProfile: () => void;
}> = ({ t, role, kyc, goProfile }) => {
  const headline =
    role === "tenant" ? t.home.headlineTenant : t.home.headlineLandlord;
  const sub = role === "tenant" ? t.home.subTenant : t.home.subLandlord;

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
            <div style={{ fontWeight: 700 }}>{t.home.kycTitle}</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              {t.home.kycSub}
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
            {t.home.kycCta}
          </button>
        </div>
      ) : null}

      <div style={{ height: 16 }} />
      <CardVisual />
      <div style={{ height: 16 }} />

      {role === "tenant" ? (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="PKR 120,000">{t.home.tenantRows.pending}</Row>
          <Row right="Due 1 Oct">{t.home.tenantRows.upcoming}</Row>
          <Row right="2 rewards">{t.home.tenantRows.rewards}</Row>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="3 units">{t.home.landlordRows.listings}</Row>
          <Row right="PKR 360,000">{t.home.landlordRows.expected}</Row>
          <Row right="1 overdue">{t.home.landlordRows.followups}</Row>
        </div>
      )}
    </div>
  );
};

type PayTabProps = {
  t: I18n;
  payments: Payment[];
  addPayment: (p: Payment) => void;
  updatePayment: (id: string, patch: Partial<Payment>) => void;
  role: Role;
  utm: Utm;
  onOpenReceipt: (p: Payment) => void;
};

const PayTab: React.FC<PayTabProps> = ({
  t,
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

  const logPayment = async (p: Payment) => {
    await postToSheet({
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
      ua: getUA(),
    });
  };

  const handleCreate = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0 || !landlord.trim()) {
      setMessage(t.pay.invalid);
      return;
    }
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    const status: PaymentStatus = method === "Bank Transfer" ? "initiated" : "succeeded";
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
    await logPayment(base);
  };

  const markSent = async (id: string) => {
    const p = payments.find((x) => x.id === id);
    if (!p) return;
    const patch: Partial<Payment> = { status: "sent" };
    updatePayment(id, patch);
    await logPayment({ ...p, ...patch } as Payment);
  };

  const refund = async (id: string) => {
    const p = payments.find((x) => x.id === id);
    if (!p) return;
    if (p.status === "refunded") return;
    const patch: Partial<Payment> = { status: "refunded" };
    updatePayment(id, patch);
    await logPayment({ ...p, ...patch } as Payment);
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
      <SectionTitle title={t.pay.title} subtitle={t.pay.subtitle} />

      <div style={{ display: "grid", gap: 10, marginBottom: 10 }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={t.pay.amount}
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
          placeholder={t.pay.landlord}
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
            {t.pay.create}
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
            {t.pay.csv}
          </button>
        </div>
        {message ? (
          <div style={{ fontSize: 12, color: BRAND.primary }}>{message}</div>
        ) : null}
      </div>

      {/* Active / recent payments */}
      <SectionTitle title={t.pay.recent} />
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
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
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
                      ? t.pay.succeeded
                      : p.status === "sent"
                      ? t.pay.sent
                      : p.status === "refunded"
                      ? t.pay.refunded
                      : t.pay.instructions}
                  </span>
                </div>
                {p.method === "Bank Transfer" && p.status === "initiated" ? (
                  <div style={{ marginTop: 10, fontSize: 12 }}>
                    <div>
                      {t.pay.transferTo}: <b>{t.pay.collections}</b>
                    </div>
                    <div>
                      {t.pay.iban}: <b>{t.pay.ibanValue}</b>
                    </div>
                    <div>
                      {t.pay.memo}: <b>{p.ref}</b>
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
                      {t.pay.markSent}
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
                    {t.pay.receipt}
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
                      opacity: p.status === "refunded" || p.status === "initiated" ? 0.6 : 1,
                    }}
                  >
                    {p.status === "refunded" ? t.pay.refunded : t.pay.refund}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

const RewardsGrid: React.FC<{
  t: I18n;
  onRedeem: (reward: (typeof rewardsCatalog)[number]) => void;
}> = ({ t, onRedeem }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 12,
    }}
  >
    {rewardsCatalog.map((r) => (
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
          onClick={() => onRedeem(r)}
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
          {t.rewards.redeem}
        </button>
      </div>
    ))}
  </div>
);

const RewardsTab: React.FC<{
  t: I18n;
  redemptions: Redemption[];
  setRedemptions: React.Dispatch<React.SetStateAction<Redemption[]>>;
  role: Role;
  utm: Utm;
  onOpenRedeemReceipt: (r: Redemption) => void;
  onOpenModal: (reward: (typeof rewardsCatalog)[number]) => void;
}> = ({ t, redemptions, setRedemptions, role, utm, onOpenRedeemReceipt, onOpenModal }) => {
  const mark = async (id: string, status: RedemptionStatus) => {
    setRedemptions((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status } : x))
    );
    const item = redemptions.find((r) => r.id === id);
    if (!item) return;
    await postToSheet({
      table: "redemptions",
      ts: new Date(item.ts).toISOString(),
      ref: item.ref,
      user: "", // optional
      role,
      rewardId: item.rewardId,
      brand: item.brand,
      title: item.title,
      denomination: item.denomination,
      points: item.points,
      status,
      ua: getUA(),
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
    });
  };

  return (
    <div>
      <SectionTitle title={t.rewards.title} subtitle={t.rewards.subtitle} />
      <RewardsGrid t={t} onRedeem={onOpenModal} />

      <div style={{ height: 16 }} />
      <SectionTitle title={t.rewards.recent} />
      {redemptions.length === 0 ? (
        <div style={{ fontSize: 13, opacity: 0.7 }}>{t.rewards.none}</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {redemptions
            .slice()
            .sort((a, b) => b.ts - a.ts)
            .map((r) => (
              <div
                key={r.id}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: BRAND.surface,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                  <span>
                    {r.brand} — {r.title} ({formatPKR(r.denomination)})
                  </span>
                  <span
                    style={{
                      color:
                        r.status === "fulfilled"
                          ? BRAND.primary
                          : r.status === "cancelled"
                          ? "#6b7280"
                          : "#1f2937",
                    }}
                  >
                    {r.status}
                  </span>
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
                    Ref {r.ref} • {t.rewards.points}: {r.points}
                  </span>
                  <span>{new Date(r.ts).toLocaleString("en-PK")}</span>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => onOpenRedeemReceipt(r)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background: BRAND.surface,
                      color: BRAND.primary,
                      fontWeight: 600,
                    }}
                  >
                    {t.rewards.viewReceipt}
                  </button>
                  <button
                    onClick={() => mark(r.id, "fulfilled")}
                    disabled={r.status === "fulfilled"}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background: r.status === "fulfilled" ? "#f3f4f6" : "#ecfdf5",
                      color: BRAND.primary,
                      fontWeight: 600,
                      opacity: r.status === "fulfilled" ? 0.6 : 1,
                    }}
                  >
                    {t.rewards.markFulfilled}
                  </button>
                  <button
                    onClick={() => mark(r.id, "cancelled")}
                    disabled={r.status === "cancelled"}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background: r.status === "cancelled" ? "#f3f4f6" : "#fff7ed",
                      color: "#92400e",
                      fontWeight: 600,
                      opacity: r.status === "cancelled" ? 0.6 : 1,
                    }}
                  >
                    {t.rewards.markCancelled}
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const SupportTab: React.FC<{ t: I18n }> = ({ t }) => (
  <div>
    <SectionTitle title={t.support.title} subtitle={t.support.subtitle} />
    <Row right="help@rentback.app">{t.support.email}</Row>
    <div style={{ height: 8 }} />
    <Row right="@rentback">{t.support.twitter}</Row>
  </div>
);

const ProfileTab: React.FC<{ t: I18n; kyc: KycState; setKyc: (k: KycState) => void }> = ({
  t,
  kyc,
  setKyc,
}) => (
  <div>
    <SectionTitle title={t.profile.title} />
    <Row right={kyc === "verified" ? t.profile.verified : kyc === "in-progress" ? t.profile.inprogress : t.profile.notStarted}>
      {t.profile.kyc}
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
        {kyc === "none" ? t.profile.start : t.profile.complete}
      </button>
    ) : (
      <div style={{ fontSize: 12, opacity: 0.75 }}>{t.profile.thanks}</div>
    )}
  </div>
);

const StatusScreen: React.FC<{ t: I18n }> = ({ t }) => (
  <div>
    <SectionTitle title={t.status.title} subtitle={t.status.subtitle} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      {t.status.items.map((it: string, i: number) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  </div>
);

const SecurityPrivacy: React.FC<{ t: I18n }> = ({ t }) => (
  <div>
    <SectionTitle title={t.security.title} subtitle={t.security.subtitle} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      {t.security.items.map((it: string, i: number) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  </div>
);

const AboutScreen: React.FC<{ t: I18n }> = ({ t }) => (
  <div>
    <SectionTitle title={t.about.title} subtitle={t.about.sub} />
    <p style={{ lineHeight: 1.6 }}>{t.about.body}</p>
  </div>
);

const FounderScreen: React.FC<{ t: I18n }> = ({ t }) => (
  <div>
    <SectionTitle title={t.founder.title} />
    <div style={{ display: "grid", gap: 8 }}>
      <Row right="CEO">Suhail Ahmed</Row>
      <Row right="help@rentback.app">{t.founder.contact}</Row>
    </div>
  </div>
);

// ---------- App ----------
const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<Role>("tenant");
  const [kyc, setKyc] = useState<KycState>("none");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [receiptFor, setReceiptFor] = useState<Payment | null>(null);
  const [redeemPick, setRedeemPick] = useState<(typeof rewardsCatalog)[number] | null>(null);
  const [redeemReceipt, setRedeemReceipt] = useState<Redemption | null>(null);

  const [lang, setLang] = useState<"en" | "ur">("en");
  const t: I18n = (copy as any)[lang] as I18n;
  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  const utm = useMemo(() => getUtm(), []);

  // language → reflect on <html>
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("lang", lang);
      root.setAttribute("dir", dir);
    } catch {}
  }, [lang, dir]);

  // Load/save demo payments to localStorage
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

  // Load/save redemptions
  useEffect(() => {
    try {
      const raw = localStorage.getItem("rb-demo-redemptions");
      if (raw) setRedemptions(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("rb-demo-redemptions", JSON.stringify(redemptions));
    } catch {}
  }, [redemptions]);

  const onConfirmRedeem = async (denom: number) => {
    if (!redeemPick) return;
    // simple demo points calc: 1 point per 10 PKR
    const pts = Math.round(denom / 10);
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-REDEEM-${Math.floor(100000 + Math.random() * 900000)}`;
    const item: Redemption = {
      id,
      ref,
      rewardId: redeemPick.id,
      brand: redeemPick.brand,
      title: redeemPick.title,
      denomination: denom,
      points: pts,
      status: "requested",
      ts: Date.now(),
    };
    setRedemptions((prev) => [item, ...prev]);
    setRedeemPick(null);
    setRedeemReceipt(item);

    await postToSheet({
      table: "redemptions",
      ts: new Date(item.ts).toISOString(),
      ref: item.ref,
      user: "",
      role,
      rewardId: item.rewardId,
      brand: item.brand,
      title: item.title,
      denomination: item.denomination,
      points: item.points,
      status: item.status,
      ua: getUA(),
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
    });
  };

  const content = useMemo(() => {
    switch (tab) {
      case "home":
        return <HomeTab t={t} role={role} kyc={kyc} goProfile={() => setTab("profile")} />;
      case "pay":
        return (
          <PayTab
            t={t}
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
        return (
          <RewardsTab
            t={t}
            redemptions={redemptions}
            setRedemptions={setRedemptions}
            role={role}
            utm={utm}
            onOpenRedeemReceipt={(r) => setRedeemReceipt(r)}
            onOpenModal={(r) => setRedeemPick(r)}
          />
        );
      case "support":
        return <SupportTab t={t} />;
      case "profile":
        return <ProfileTab t={t} kyc={kyc} setKyc={setKyc} />;
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
  }, [tab, role, kyc, payments, redemptions, utm, t]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        display: "flex",
        flexDirection: "column",
        color: BRAND.text,
      }}
      dir={dir}
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

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Language pill */}
          <Pill onClick={() => setLang((p) => (p === "en" ? "ur" : "en"))}>
            {t.langNames[lang === "en" ? "ur" : "en"]}
          </Pill>

          {/* Menu button */}
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
            <div style={{ width: 18, height: 2, background: "#111", marginBottom: 3 }} />
            <div style={{ width: 18, height: 2, background: "#111", marginBottom: 3 }} />
            <div style={{ width: 18, height: 2, background: "#111" }} />
          </button>
        </div>
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
          { key: "home", label: t.nav.home },
          { key: "pay", label: t.nav.pay },
          { key: "rewards", label: t.nav.rewards },
          { key: "support", label: t.nav.support },
          { key: "profile", label: t.nav.profile },
        ].map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key as Tab)}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>{t.menu}</div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close"
                style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}
              >
                ✕
              </button>
            </div>

            <SectionTitle title={t.drawer.explore} />
            <Row onClick={() => { setTab("status"); setMenuOpen(false); }}>{t.drawer.status}</Row>
            <Row onClick={() => { setTab("security"); setMenuOpen(false); }}>{t.drawer.security}</Row>
            <Row onClick={() => { setTab("rewards"); setMenuOpen(false); }}>{t.drawer.rewards}</Row>
            <Row onClick={() => { setTab("about"); setMenuOpen(false); }}>{t.drawer.about}</Row>
            <Row onClick={() => { setTab("founder"); setMenuOpen(false); }}>{t.drawer.founder}</Row>
            <Row onClick={() => { window.open("/privacy", "_blank"); }}>{t.drawer.privacy}</Row>
            <Row onClick={() => { window.open("/terms", "_blank"); }}>{t.drawer.terms}</Row>

            <div style={{ height: 6 }} />
            <SectionTitle title={t.drawer.role} subtitle={t.drawer.roleHint} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Pill onClick={() => setRole("tenant")}>{role === "tenant" ? `● ${t.drawer.tenant}` : t.drawer.tenant}</Pill>
              <Pill onClick={() => setRole("landlord")}>{role === "landlord" ? `● ${t.drawer.landlord}` : t.drawer.landlord}</Pill>
            </div>

            <div style={{ height: 6 }} />
            <SectionTitle title={t.drawer.lang} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setLang("en")}>{lang === "en" ? `● ${t.langNames.en}` : t.langNames.en}</Pill>
              <Pill onClick={() => setLang("ur")}>{lang === "ur" ? `● ${t.langNames.ur}` : t.langNames.ur}</Pill>
            </div>
          </div>
        </div>
      ) : null}

      {/* Payment Receipt Modal */}
      {receiptFor ? <PaymentReceiptModal t={t} payment={receiptFor} onClose={() => setReceiptFor(null)} /> : null}

      {/* Redeem Modal */}
      {redeemPick ? (
        <RedeemModal
          t={t}
          reward={redeemPick}
          onClose={() => setRedeemPick(null)}
          onConfirm={onConfirmRedeem}
        />
      ) : null}

      {/* Redeem Receipt Modal */}
      {redeemReceipt ? (
        <RedeemReceiptModal t={t} item={redeemReceipt} onClose={() => setRedeemReceipt(null)} />
      ) : null}
    </div>
  );
};

export default App;
