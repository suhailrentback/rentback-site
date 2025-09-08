"use client";
import React, { useMemo, useState, useEffect } from "react";

/** ===================== Brand ===================== **/
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

/** ===================== Types ===================== **/
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
type Method = "Bank Transfer" | "Card" | "Wallet";

type Payment = {
  id: string;
  amount: number;
  landlord: string;
  method: Method;
  status: PaymentStatus;
  ts: number;
  ref: string;
};

type Utm = { source: string; medium: string; campaign: string };

/** ===================== Utils ===================== **/
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

/** ===================== i18n ===================== **/
type Lang = "en" | "ur";
type T = (typeof COPY)["en"];

const COPY = {
  en: {
    appName: "RentBack",
    menu: "Menu",
    nav: { home: "Home", pay: "Pay", rewards: "Rewards", support: "Support", profile: "Profile" },

    drawer: {
      explore: "Explore",
      roleTitle: "Role",
      roleSub: "Switch experience",
      language: "Language",
      status: "Status",
      security: "Security & Privacy",
      rewards: "Rewards",
      about: "About",
      founder: "Founder",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      tenant: "Tenant",
      landlord: "Landlord",
    },

    home: {
      tenantTitle: "Your rent, organized",
      tenantSub: "Track dues, pay faster, and earn rewards.",
      landlordTitle: "Your rentals, at a glance",
      landlordSub: "See incoming rents and tenant activity.",
      kycTitle: "Verify your identity",
      kycSub: "Finish KYC to unlock higher limits and faster payouts.",
      kycCta: "Continue KYC",
      rowsTenant: {
        pending: "Pending Balance",
        upcoming: "Upcoming Rent",
        rewards: "New Rewards",
      },
      rowsLandlord: {
        listings: "Active Listings",
        expected: "Expected This Month",
        followups: "Follow-ups",
      },
    },

    pay: {
      title: "Pay rent",
      sub: "Demo Mode — no real charges",
      amountPh: "Amount (PKR)",
      landlordPh: "Landlord / Property",
      method: { bank: "Bank Transfer", card: "Card", wallet: "Wallet" },
      create: "Create Payment (Demo)",
      downloadCsv: "Download CSV",
      needFields: "Enter amount and landlord name.",
      bankMsg: "Transfer instructions generated below. Mark as sent when done.",
      cardMsg: "Payment succeeded (demo). View receipt below.",
      recent: "Recent",
      noPayments: "No demo payments yet.",
      instructions: {
        sendTo: "Send to:",
        iban: "IBAN:",
        memo: "Memo:",
        markSent: "Mark as Sent",
      },
      labels: {
        ref: "Ref",
        succeeded: "Succeeded",
        sent: "Sent",
        refunded: "Refunded",
        initiated: "Instructions",
      },
      actions: { viewReceipt: "View Receipt", refund: "Refund (Demo)", refunded: "Refunded" },
    },

    receipt: {
      title: "Receipt",
      ref: "Ref",
      date: "Date",
      landlord: "Landlord / Property",
      method: "Method",
      status: "Status",
      amount: "Amount",
      footnote: "Demo receipt — no real funds moved.",
      print: "Print / Save PDF",
      close: "Close",
    },

    rewards: { title: "Rewards", sub: "Pakistan-focused perks", redeem: "Redeem" },

    support: { title: "Support", sub: "We usually reply within 24h", email: "Email support", twitter: "Twitter/X" },

    profile: {
      title: "Profile",
      kyc: { verified: "Verified", inProgress: "In progress", notStarted: "Not started" },
      start: "Start KYC",
      complete: "Complete KYC",
      doneNote: "KYC complete. Thanks!",
    },

    status: {
      title: "Regulatory Status",
      sub: "SBP Sandbox — preparation & updates",
      items: [
        "Preparation complete (materials & partner outreach)",
        "Draft application ready",
        "Awaiting sandbox submission window",
      ],
    },

    security: {
      title: "Security & Privacy",
      sub: "How we protect your data",
      bullets: [
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

    founder: { title: "Founder", ceo: "CEO", contact: "Contact" },
    langNames: { en: "English", ur: "اردو" },
  },

  ur: {
    appName: "RentBack",
    menu: "می뉴",
    nav: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", support: "مدد", profile: "پروفائل" },

    drawer: {
      explore: "ایکسپلور",
      roleTitle: "رول",
      roleSub: "تجربہ تبدیل کریں",
      language: "زبان",
      status: "اسٹیٹس",
      security: "سکیورٹی اور پرائیویسی",
      rewards: "انعامات",
      about: "متعلق",
      founder: "بانی",
      privacy: "پرائیویسی پالیسی",
      terms: "شرائطِ استعمال",
      tenant: "Tenant",
      landlord: "Landlord",
    },

    home: {
      tenantTitle: "آپ کا کرایہ، منظم",
      tenantSub: "واجبات دیکھیں، جلدی ادائیگی کریں اور انعامات کمائیں۔",
      landlordTitle: "آپ کی املاک، ایک نظر میں",
      landlordSub: "آنے والی ادائیگیاں اور کرایہ دار سرگرمیاں دیکھیں۔",
      kycTitle: "اپنی شناخت کی تصدیق کریں",
      kycSub: "زیادہ حدود اور تیز ادائیگیوں کے لیے KYC مکمل کریں۔",
      kycCta: "KYC جاری رکھیں",
      rowsTenant: {
        pending: "زیرِ التواء رقم",
        upcoming: "آنے والا کرایہ",
        rewards: "نئے انعامات",
      },
      rowsLandlord: {
        listings: "فعال لسٹنگز",
        expected: "اس ماہ متوقع",
        followups: "فالو اپس",
      },
    },

    pay: {
      title: "کرایہ ادا کریں",
      sub: "ڈیمو موڈ — حقیقی چارجز نہیں",
      amountPh: "رقم (PKR)",
      landlordPh: "مالک مکان / پراپرٹی",
      method: { bank: "بینک ٹرانسفر", card: "کارڈ", wallet: "والیٹ" },
      create: "ادائیگی بنائیں (ڈیمو)",
      downloadCsv: "CSV ڈاؤن لوڈ",
      needFields: "رقم اور مالک مکان کا نام درج کریں۔",
      bankMsg: "ٹرانسفر ہدایات نیچے بن گئیں۔ مکمل ہونے پر 'Sent' مارک کریں۔",
      cardMsg: "ادائیگی کامیاب (ڈیمو)۔ نیچے رسید دیکھیں۔",
      recent: "حالیہ",
      noPayments: "ابھی کوئی ڈیمو ادائیگی نہیں۔",
      instructions: {
        sendTo: "بھیجیں:",
        iban: "IBAN:",
        memo: "میمو:",
        markSent: "Sent مارک کریں",
      },
      labels: {
        ref: "حوالہ",
        succeeded: "کامیاب",
        sent: "بھیج دی",
        refunded: "ریفنڈ",
        initiated: "ہدایات",
      },
      actions: { viewReceipt: "رسید دیکھیں", refund: "ریفنڈ (ڈیمو)", refunded: "ریفنڈڈ" },
    },

    receipt: {
      title: "رسید",
      ref: "حوالہ",
      date: "تاریخ",
      landlord: "مالک مکان / پراپرٹی",
      method: "طریقہ",
      status: "اسٹیٹس",
      amount: "رقم",
      footnote: "ڈیمو رسید — حقیقی رقم منتقل نہیں ہوئی۔",
      print: "پرنٹ / PDF محفوظ کریں",
      close: "بند کریں",
    },

    rewards: { title: "انعامات", sub: "پاکستان کے لیے موزوں فوائد", redeem: "ریڈیم" },

    support: {
      title: "مدد",
      sub: "عموماً 24 گھنٹے میں جواب",
      email: "ای میل سپورٹ",
      twitter: "ٹویٹر/X",
    },

    profile: {
      title: "پروفائل",
      kyc: { verified: "تصدیق شدہ", inProgress: "جاری", notStarted: "شروع نہیں" },
      start: "KYC شروع کریں",
      complete: "KYC مکمل کریں",
      doneNote: "KYC مکمل۔ شکریہ!",
    },

    status: {
      title: "ریگولیٹری اسٹیٹس",
      sub: "SBP سینڈ باکس — تیاری اور اپڈیٹس",
      items: ["تیاری مکمل (مواد اور پارٹنرز)", "ڈرافٹ درخواست تیار", "سینڈ باکس ونڈو کا انتظار"],
    },

    security: {
      title: "سکیورٹی اور پرائیویسی",
      sub: "ہم آپ کے ڈیٹا کی حفاظت کیسے کرتے ہیں",
      bullets: [
        "انکرپشن اِن ٹرانزٹ؛ محدود رسائی",
        "ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے؛ مکمل کارڈ محفوظ نہیں",
        "کم سے کم مدت تک ڈیٹا؛ درخواست پر حذف (قانونی حدود)",
        "منصوبہ: 2FA، ڈیوائس بائنڈنگ، آڈٹ لاگز",
        "مسئلہ رپورٹ کریں: help@rentback.app",
      ],
    },

    about: {
      title: "RentBack کے متعلق",
      sub: "کرایہ انعامات میں",
      body:
        "RentBack کرایہ داروں کو آسان ادائیگی اور انعامات فراہم کرتا ہے، جبکہ مالکان کو آنے والی ادائیگیوں پر بہتر نطر ملتی ہے۔",
    },

    founder: { title: "بانی", ceo: "CEO", contact: "رابطہ" },
    langNames: { en: "English", ur: "اردو" },
  },
} as const;

/** ===================== Small primitives ===================== **/
const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
    {subtitle ? <div style={{ opacity: 0.75, fontSize: 13, marginTop: 4 }}>{subtitle}</div> : null}
  </div>
);

const Row: React.FC<{ children: React.ReactNode; right?: React.ReactNode; onClick?: () => void }> = ({
  children,
  right,
  onClick,
}) => (
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

// Brand mark
const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({ size = 20, stroke = BRAND.primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

/** ===================== Rewards ===================== **/
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

const RewardsGrid: React.FC<{ t: T }> = ({ t }) => (
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
        <button style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.primary, color: "white", fontWeight: 600 }}>
          {t.rewards.redeem}
        </button>
      </div>
    ))}
  </div>
);

/** ===================== Receipt Modal ===================== **/
const ReceiptModal: React.FC<{ payment: Payment; onClose: () => void; t: T }> = ({ payment, onClose, t }) => {
  const date = new Date(payment.ts).toLocaleString("en-PK");
  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 70, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 720, background: BRAND.surface, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 14, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: BRAND.primary }}>
            <BrandLogo /> {t.receipt.title}
          </div>
          <button onClick={onClose} aria-label={t.receipt.close} style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}>✕</button>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.ref}</div>
            <div style={{ fontWeight: 700 }}>{payment.ref}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.date}</div>
            <div>{date}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.landlord}</div>
            <div>{payment.landlord}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.method}</div>
            <div>{payment.method}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.status}</div>
            <div style={{ fontWeight: 600 }}>{payment.status}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <div style={{ opacity: 0.7 }}>{t.receipt.amount}</div>
            <div style={{ fontWeight: 700 }}>{formatPKR(payment.amount)}</div>
          </div>
          <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>{t.receipt.footnote}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
            <button onClick={() => window.print()} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, fontWeight: 600 }}>
              {t.receipt.print}
            </button>
            <button onClick={onClose} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 700 }}>
              {t.receipt.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** ===================== Apps Script logging (optional) ===================== **/
async function postToSheet(p: Payment, role: Role, utm: Utm) {
  try {
    const endpoint = (window as any).RB_PAYMENTS_ENDPOINT as string | undefined;
    const key = (window as any).RB_SHARED_SECRET as string | undefined; // optional shared secret (future-proof)
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
      ...(key ? { key } : {}),
    };
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {}
}

/** ===================== Pages ===================== **/
const HomeTab: React.FC<{ role: Role; kyc: KycState; goProfile: () => void; t: T }> = ({ role, kyc, goProfile, t }) => {
  const headline = role === "tenant" ? t.home.tenantTitle : t.home.landlordTitle;
  const sub = role === "tenant" ? t.home.tenantSub : t.home.landlordSub;

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
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{t.home.kycSub}</div>
          </div>
          <button onClick={goProfile} style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}>
            {t.home.kycCta}
          </button>
        </div>
      ) : null}

      <div style={{ height: 16 }} />
      <CardVisual />
      <div style={{ height: 16 }} />

      {role === "tenant" ? (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="PKR 120,000">{t.home.rowsTenant.pending}</Row>
          <Row right="Due 1 Oct">{t.home.rowsTenant.upcoming}</Row>
          <Row right="2">{t.home.rowsTenant.rewards}</Row>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <Row right="3">{t.home.rowsLandlord.listings}</Row>
          <Row right="PKR 360,000">{t.home.rowsLandlord.expected}</Row>
          <Row right="1">{t.home.rowsLandlord.followups}</Row>
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
  t: T;
};

const PayTab: React.FC<PayTabProps> = ({ payments, addPayment, updatePayment, role, utm, onOpenReceipt, t }) => {
  const [amount, setAmount] = useState<string>("");
  const [landlord, setLandlord] = useState<string>("");
  const [method, setMethod] = useState<Method>("Bank Transfer");
  const [message, setMessage] = useState<string>("");

  const handleCreate = async () => {
    const amt = Number(amount);
    if (!amt || amt <= 0 || !landlord.trim()) {
      setMessage(t.pay.needFields);
      return;
    }
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    const status: PaymentStatus = method === "Bank Transfer" ? "initiated" : "succeeded";
    const base: Payment = { id, amount: amt, landlord: landlord.trim(), method, status, ts: Date.now(), ref };
    addPayment(base);
    setMessage(method === "Bank Transfer" ? t.pay.bankMsg : t.pay.cardMsg);
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
    if (!p || p.status === "refunded") return;
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

  const statusLabel = (s: PaymentStatus) =>
    s === "succeeded" ? t.pay.labels.succeeded : s === "sent" ? t.pay.labels.sent : s === "refunded" ? t.pay.labels.refunded : t.pay.labels.initiated;

  return (
    <div>
      <SectionTitle title={t.pay.title} subtitle={t.pay.sub} />

      <div style={{ display: "grid", gap: 10, marginBottom: 10 }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={t.pay.amountPh}
          inputMode="numeric"
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        />
        <input
          value={landlord}
          onChange={(e) => setLandlord(e.target.value)}
          placeholder={t.pay.landlordPh}
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as Method)}
          style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", background: BRAND.surface }}
        >
          <option value="Bank Transfer">{t.pay.method.bank}</option>
          <option value="Card">{t.pay.method.card}</option>
          <option value="Wallet">{t.pay.method.wallet}</option>
        </select>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={handleCreate} style={{ padding: "12px 14px", borderRadius: 12, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 700 }}>
            {t.pay.create}
          </button>
          <button onClick={downloadCSV} style={{ padding: "12px 14px", borderRadius: 12, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, color: BRAND.primary, fontWeight: 700 }}>
            {t.pay.downloadCsv}
          </button>
        </div>
        {message ? <div style={{ fontSize: 12, color: BRAND.primary }}>{message}</div> : null}
      </div>

      <SectionTitle title={t.pay.recent} />
      <div style={{ display: "grid", gap: 10 }}>
        {payments.length === 0 ? (
          <div style={{ fontSize: 13, opacity: 0.7 }}>{t.pay.noPayments}</div>
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
                    {p.method} • {t.pay.labels.ref} {p.ref}
                  </span>
                  <span
                    style={{
                      color: p.status === "succeeded" ? BRAND.primary : p.status === "sent" ? "#92400e" : p.status === "refunded" ? "#6b7280" : "#1f2937",
                    }}
                  >
                    {statusLabel(p.status)}
                  </span>
                </div>
                {p.method === "Bank Transfer" && p.status === "initiated" ? (
                  <div style={{ marginTop: 10, fontSize: 12 }}>
                    <div>
                      {t.pay.instructions.sendTo} <b>RentBack Collections</b>
                    </div>
                    <div>
                      {t.pay.instructions.iban} <b>PK00-RENT-0000-0000-0007</b>
                    </div>
                    <div>
                      {t.pay.instructions.memo} <b>{p.ref}</b>
                    </div>
                    <button onClick={() => markSent(p.id)} style={{ marginTop: 8, padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}>
                      {t.pay.instructions.markSent}
                    </button>
                  </div>
                ) : null}
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => onOpenReceipt(p)} style={{ padding: "8px 10px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.surface, color: BRAND.primary, fontWeight: 600 }}>
                    {t.pay.actions.viewReceipt}
                  </button>
                  <button
                    onClick={() => refund(p.id)}
                    disabled={p.status === "refunded" || p.status === "initiated"}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: `1px solid ${BRAND.ring}`,
                      background: p.status === "refunded" || p.status === "initiated" ? "#f9fafb" : "#fff7ed",
                      color: "#92400e",
                      fontWeight: 600,
                      opacity: p.status === "refunded" || p.status === "initiated" ? 0.6 : 1,
                    }}
                  >
                    {p.status === "refunded" ? t.pay.actions.refunded : t.pay.actions.refund}
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

const RewardsTab: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.rewards.title} subtitle={t.rewards.sub} />
    <RewardsGrid t={t} />
  </div>
);

const SupportTab: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.support.title} subtitle={t.support.sub} />
    <Row right="help@rentback.app">{t.support.email}</Row>
    <div style={{ height: 8 }} />
    <Row right="@rentback">{t.support.twitter}</Row>
  </div>
);

const ProfileTab: React.FC<{ kyc: KycState; setKyc: (k: KycState) => void; t: T }> = ({ kyc, setKyc, t }) => (
  <div>
    <SectionTitle title={t.profile.title} />
    <Row right={kyc === "verified" ? t.profile.kyc.verified : kyc === "in-progress" ? t.profile.kyc.inProgress : t.profile.kyc.notStarted}>
      KYC
    </Row>
    <div style={{ height: 8 }} />
    {kyc !== "verified" ? (
      <button
        onClick={() => setKyc(kyc === "none" ? "in-progress" : "verified")}
        style={{ padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.ring}`, background: BRAND.primary, color: "#fff", fontWeight: 600 }}
      >
        {kyc === "none" ? t.profile.start : t.profile.complete}
      </button>
    ) : (
      <div style={{ fontSize: 12, opacity: 0.75 }}>{t.profile.doneNote}</div>
    )}
  </div>
);

const StatusScreen: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.status.title} subtitle={t.status.sub} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      {t.status.items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  </div>
);

const SecurityPrivacy: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.security.title} subtitle={t.security.sub} />
    <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
      {t.security.bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

const AboutScreen: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.about.title} subtitle={t.about.sub} />
    <p style={{ lineHeight: 1.6 }}>{t.about.body}</p>
  </div>
);

const FounderScreen: React.FC<{ t: T }> = ({ t }) => (
  <div>
    <SectionTitle title={t.founder.title} />
    <div style={{ display: "grid", gap: 8 }}>
      <Row right={t.founder.ceo}>Suhail Ahmed</Row>
      <Row right="help@rentback.app">{t.founder.contact}</Row>
    </div>
  </div>
);

/** ===================== App ===================== **/
const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<Role>("tenant");
  const [kyc, setKyc] = useState<KycState>("none");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [receiptFor, setReceiptFor] = useState<Payment | null>(null);

  // Language (persisted)
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rb-lang") as Lang | null;
      if (saved === "en" || saved === "ur") setLang(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("rb-lang", lang);
      const root = document.documentElement;
      root.setAttribute("lang", lang === "ur" ? "ur" : "en");
      root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    } catch {}
  }, [lang]);

  const t = COPY[lang];
  const utm = useMemo(() => getUtm(), []);

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
        return <RewardsTab t={t} />;
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
      dir={lang === "ur" ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: BRAND.bg,
        display: "flex",
        flexDirection: "column",
        color: BRAND.text,
      }}
    >
      <style>{"@keyframes rb-gradient-move{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}"}</style>

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
          {COPY[lang].appName}
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label={t.menu}
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
              <div style={{ fontWeight: 700 }}>{t.menu}</div>
              <button onClick={() => setMenuOpen(false)} aria-label={t.receipt.close} style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, padding: 6 }}>
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
            <SectionTitle title={t.drawer.roleTitle} subtitle={t.drawer.roleSub} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setRole("tenant")}>{role === "tenant" ? "● " : ""}{t.drawer.tenant}</Pill>
              <Pill onClick={() => setRole("landlord")}>{role === "landlord" ? "● " : ""}{t.drawer.landlord}</Pill>
            </div>

            <div style={{ height: 6 }} />
            <SectionTitle title={t.drawer.language} />
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => setLang("en")}>{lang === "en" ? "● " : ""}{COPY.en.langNames.en}</Pill>
              <Pill onClick={() => setLang("ur")}>{lang === "ur" ? "● " : ""}{COPY.en.langNames.ur}</Pill>
            </div>
          </div>
        </div>
      ) : null}

      {/* Receipt Modal */}
      {receiptFor ? <ReceiptModal payment={receiptFor} onClose={() => setReceiptFor(null)} t={t} /> : null}
    </div>
  );
};

export default App;
