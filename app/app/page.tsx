\
  "use client";
  import React, { useEffect, useMemo, useRef, useState } from "react";

  /**
   * RentBack — Dark Preview (Single-File, Compile-Safe)
   * Fintech style, EN/UR + RTL, Demo Payments + Rewards, Sandbox controls, Receipts
   * NOTE: No external libs (QR is a lightweight placeholder renderer).
   */

  // ---------- Brand Tokens ----------
  const BRAND = {
    primary: "#059669", // emerald-600
    ring: "rgba(5,150,105,0.25)",
    surface: "#ffffff",
    bg: "#0b0b0b",
    text: "#e5e7eb",
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

  type I18n = { [key: string]: any };

  type ToastKind = "default" | "success" | "error" | "info";

  // ---------- Utils ----------
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const formatPKR = (n: number) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(n);

  const formatPKRInput = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return { view: "", value: 0 };
    const value = Number(digits);
    const view = new Intl.NumberFormat("en-PK").format(value);
    return { view, value };
  };

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

  // ---------- Simple QR Placeholder (no external deps) ----------
  const RaastQR: React.FC<{ value: string; size?: number }> = ({ value, size = 112 }) => {
    // Not a real QR encoder; renders a deterministic block pattern from value hash
    const hash = Array.from(value).reduce((acc, ch) => (acc * 33 + ch.charCodeAt(0)) >>> 0, 5381);
    const cells = 21; // 21x21
    const bits: number[] = [];
    let x = hash;
    for (let i = 0; i < cells * cells; i++) {
      x ^= x << 13; x ^= x >>> 17; x ^= x << 5; // xorshift
      bits.push(x & 1);
    }
    const cell = size / cells;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="QR demo">
        <rect width={size} height={size} fill="#fff" />
        {bits.map((b, i) => {
          if (!b) return null;
          const r = Math.floor(i / cells);
          const c = i % cells;
          return <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill="#000" />;
        })}
      </svg>
    );
  };

  // Minimal banner
  const SandboxBanner: React.FC<{ lang: "en" | "ur" }> = ({ lang }) => (
    <div style={{
      borderRadius: 12,
      border: "1px solid rgba(16,185,129,0.2)",
      background: "rgba(16,185,129,0.12)",
      padding: 12,
      fontSize: 12,
      color: "#a7f3d0",
    }}>
      {lang === "en"
        ? "Demo preview — no real payments are processed."
        : "ڈیمو پریویو — کوئی حقیقی ادائیگیاں پروسیس نہیں ہوتیں۔"}
    </div>
  );

  // ---------- Logo ----------
  const BrandLogo: React.FC<{ size?: number; stroke?: string }> = ({ size = 22, stroke = BRAND.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5 10v9h14v-9" />
    </svg>
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
    { id: "careem", brand: "Careem Credit", note: "Rides & food", save: "5%", denom: [300, 500, 1000], title: "Careem Credit" },
    { id: "foodp", brand: "Foodpanda", note: "Food delivery", save: "5%", denom: [300, 500, 1000], title: "Foodpanda" },
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
        complaints: "Complaints",
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
        ibanValue: "PK00-RENT-0000-0007",
        demoNote: "Demo receipt — no real funds moved.",
        print: "Print / Save PDF",
        close: "Close",
        status: "Status",
        copy: "Copy",
        copied: "Copied",
        raastQR: "Raast QR (demo)",
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
      support: { title: "Support", subtitle: "We usually reply within 24h", email: "Email support", twitter: "Twitter/X" },
      profile: { title: "Profile", kyc: "KYC", verified: "Verified", inprogress: "In progress", notStarted: "Not started", start: "Start KYC", complete: "Complete KYC", thanks: "KYC complete. Thanks!" },
      status: { title: "Regulatory Status", subtitle: "SBP Sandbox — preparation & updates", items: ["Preparation complete (materials & partner outreach)", "Draft application ready", "Awaiting sandbox submission window"] },
      security: { title: "Security & Privacy", subtitle: "How we protect your data", items: ["Encryption in transit; least-privilege access", "Payments via licensed partners; no full PAN stored", "Minimal retention; deletion on request (legal bounds)", "Planned: 2FA, device binding, audit logs", "Report issues: help@rentback.app"] },
      about: { title: "About RentBack", sub: "Turning rent into rewards", body: "RentBack helps tenants pay rent conveniently while earning rewards, and gives landlords clearer visibility on incoming payments." },
      founder: { title: "Founder", contact: "Contact" },
      langNames: { en: "English", ur: "اردو" },
    },
    ur: {
      appName: "RentBack",
      menu: "مینیو",
      nav: { home: "ہوم", pay: "ادائیگی", rewards: "انعامات", support: "مدد", profile: "پروفائل" },
      drawer: { explore: "ایکسپلور", status: "اسٹیٹس", security: "سیکورٹی اور پرائیویسی", rewards: "انعامات", about: "متعلق", founder: "بانی", complaints: "شکایات", privacy: "پرائیویسی پالیسی", terms: "شرائطِ استعمال", role: "کردار", roleHint: "تجربہ تبدیل کریں", tenant: "کرایہ دار", landlord: "مالک مکان", lang: "زبان" },
      home: { headlineTenant: "آپ کا کرایہ، منظم", subTenant: "ادائیگیاں ٹریک کریں، تیزی سے ادا کریں، اور انعامات پائیں۔", headlineLandlord: "آپ کی رینٹل ایک نظر میں", subLandlord: "آنے والی ادائیگیاں اور کرایہ داروں کی سرگرمی دیکھیں۔", kycTitle: "شناخت کی تصدیق کریں", kycSub: "زیادہ حدیں اور تیز ادائیگیوں کے لیے KYC مکمل کریں۔", kycCta: "KYC جاری رکھیں", tenantRows: { pending: "بقیہ رقم", upcoming: "آئندہ کرایہ", rewards: "نئے انعامات" }, landlordRows: { listings: "فعال لسٹنگز", expected: "اس ماہ متوقع", followups: "فالو اپس" } },
      pay: { title: "کرایہ ادا کریں", subtitle: "ڈیمو موڈ — کوئی حقیقی چارج نہیں", amount: "رقم (PKR)", landlord: "مالک / پراپرٹی", method: "طریقہ", create: "ادائیگی بنائیں (ڈیمو)", csv: "CSV ڈاؤن لوڈ", recent: "حالیہ", instructions: "ہدایات", succeeded: "کامیاب", sent: "بھیج دیا", refunded: "ریفنڈ", markSent: "بھیجا گیا نشان لگائیں", receipt: "رسید دیکھیں", refund: "ریفنڈ (ڈیمو)", invalid: "رقم اور مالک/پراپرٹی لکھیں۔", transferTo: "موصول کنندہ", iban: "IBAN", memo: "میمو", collections: "RentBack Collections", ibanValue: "PK00-RENT-0000-0007", demoNote: "ڈیمو رسید — کوئی حقیقی رقم منتقل نہیں ہوئی۔", print: "پرنٹ / PDF محفوظ کریں", close: "بند کریں", status: "اسٹیٹس", copy: "کاپی", copied: "کاپی ہو گیا", raastQR: "راست کیو آر (ڈیمو)" },
      rewards: { title: "انعامات", subtitle: "پاکستان کے لیے منتخب سہولتیں", redeem: "ریڈیم", choose: "ڈینامینیشن منتخب کریں", confirm: "ریڈیم کی تصدیق", cancel: "منسوخ", recent: "حالیہ ریڈیمپشنز", none: "ابھی تک کوئی ریڈیمپشن نہیں۔", viewReceipt: "ریڈیم رسید", markFulfilled: "فلفلڈ", markCancelled: "منسوخ", receiptTitle: "ریڈیمپشن رسید", points: "پوائنٹس", status: "اسٹیٹس" },
      support: { title: "مدد", subtitle: "عام طور پر 24 گھنٹوں میں جواب", email: "ای میل سپورٹ", twitter: "ٹوئٹر/X" },
      profile: { title: "پروفائل", kyc: "KYC", verified: "تصدیق شدہ", inprogress: "جاری", notStarted: "شروع نہیں", start: "KYC شروع کریں", complete: "KYC مکمل کریں", thanks: "KYC مکمل۔ شکریہ!" },
      status: { title: "ریگولیٹری اسٹیٹس", subtitle: "SBP سینڈ باکس — تیاری اور اپ ڈیٹس", items: ["تیاری مکمل (مواد اور پارٹنر آؤٹ ریچ)", "ڈرافٹ درخواست تیار", "سینڈ باکس جمع کرانے کی ونڈو کا انتظار"] },
      security: { title: "سیکورٹی اور پرائیویسی", subtitle: "ہم آپ کے ڈیٹا کی حفاظت کیسے کرتے ہیں", items: ["ترسیل کے دوران انکرپشن؛ محدود رسائی", "ادائیگیاں لائسنس یافتہ پارٹنرز کے ذریعے؛ مکمل کارڈ محفوظ نہیں", "کم از کم ریکارڈ رکھنا؛ قانونی حدود میں حذف", "منصوبہ: 2FA، ڈیوائس بائنڈنگ، آڈٹ لاگز", "رابطہ: help@rentback.app"] },
      about: { title: "RentBack کے بارے میں", sub: "کرائے کو انعامات میں بدلنا", body: "RentBack کرایہ داروں کو سہولت سے ادائیگی اور انعامات دیتا ہے اور مالکان کو آمدنی پر واضح نظر فراہم کرتا ہے۔" },
      founder: { title: "بانی", contact: "رابطہ" },
      langNames: { en: "English", ur: "اردو" },
    },
  } as const;

  // ---------- Sheet logging (mock-friendly) ----------
  async function postToSheet(payload: Record<string, any>) {
    try {
      const endpoint = (window as any).RB_PAYMENTS_ENDPOINT as string | undefined;
      if (!endpoint) return;
      const key = (window as any).RB_PAYMENTS_SECRET as string | undefined;
      const body = key ? { ...payload, key } : payload;
      await fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } catch {}
  }

  // ---------- shadcn-like primitives ----------
  function cn(...classes: Array<string | undefined | false>) {
    return classes.filter(Boolean).join(" ");
  }

  type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "destructive"; size?: "sm" | "md" | "lg" };

  function Button({ variant = "default", size = "md", className, ...props }: ButtonProps) {
    const base = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
    const variants = {
      default: "bg-emerald-600 text-white hover:bg-emerald-700",
      outline: "border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50",
      ghost: "text-emerald-700 hover:bg-emerald-50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    } as const;
    const sizes = { sm: "px-2 py-1 text-sm", md: "px-3 py-2", lg: "px-4 py-3 text-base" } as const;
    return <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  }

  const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-3">
      <div className="font-bold text-[15px] leading-tight">{title}</div>
      {subtitle ? <div className="text-[13px] opacity-75 mt-1">{subtitle}</div> : null}
    </div>
  );

  const Row: React.FC<{ children: React.ReactNode; right?: React.ReactNode; onClick?: () => void }> = ({ children, right, onClick }) => (
    <button type="button" onClick={onClick} className={cn("w-full text-left flex items-center justify-between px-3 py-3 rounded-xl border bg-white/5 border-white/10 shadow-sm", onClick ? "cursor-pointer hover:shadow" : "cursor-default") }>
      <span>{children}</span>
      {right ? <span className="text-[12px] opacity-70">{right}</span> : null}
    </button>
  );

  // Animated card visual
  const CardVisual: React.FC = () => (
    <div className="relative w-full max-w-[420px] h-[200px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_30px_rgba(5,150,105,0.18)] text-slate-900 rb-animated-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="absolute inset-0 p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <BrandLogo /> <span>RentBack</span>
          </div>
          <span className="text-[12px] text-slate-800/90">VIRTUAL • Debit</span>
        </div>
        <div className="mt-auto font-mono tracking-wider">
          <div className="text-[18px] font-semibold text-slate-800">**** **** **** 0007</div>
          <div className="flex gap-5 mt-1 text-[12px] text-slate-800"><span>Exp 12/27</span><span>PKR</span></div>
        </div>
      </div>
      <style>{`@keyframes rb-grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}} .rb-animated-bg{background:linear-gradient(120deg,#059669,#14b8a6,#34d399);background-size:200% 200%;animation:rb-grad 12s ease infinite}`}</style>
    </div>
  );

  // ---------- Toasts ----------
  function useToasts() {
    const [toasts, setToasts] = useState<Array<{ id: number; msg: string; kind: ToastKind }>>([]);
    const notify = (msg: string, kind: ToastKind = "default") => {
      const id = Date.now() + Math.random();
      setToasts((p) => [...p, { id, msg, kind }]);
      setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2800);
    };
    const ToastStack = () => (
      <div className="fixed z-[60] top-3 right-3 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={cn("px-3 py-2 rounded-lg shadow border text-sm", t.kind === "success" ? "bg-emerald-600 text-white" : t.kind === "error" ? "bg-red-600 text-white" : t.kind === "info" ? "bg-slate-800 text-white" : "bg-white/10 border-white/20 text-white")}>{t.msg}</div>
        ))}
      </div>
    );
    return { notify, ToastStack };
  }

  // ---------- Event Inspector ----------
  function useEventBus() {
    const [events, setEvents] = useState<Array<{ ts: number; type: string; payload: any }>>([]);
    const emit = (type: string, payload: any) => setEvents((prev) => [{ ts: Date.now(), type, payload }, ...prev].slice(0, 200));
    const clear = () => setEvents([]);
    return { events, emit, clear };
  }

  const EventInspector: React.FC<{ events: Array<{ ts: number; type: string; payload: any }>; onClear: () => void; open: boolean; setOpen: (b: boolean) => void; }> = ({ events, onClear, open, setOpen }) => (
    <div className={cn("fixed z-[45] top-20 right-3 w-[360px] max-w-[92vw] rounded-xl border bg-white/5 border-white/10 shadow-2xl overflow-hidden transition-all", open ? "opacity-100" : "opacity-90") }>
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div className="font-semibold">Event Inspector</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClear}>Clear</Button>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Hide</Button>
        </div>
      </div>
      <div className="max-h-[50vh] overflow-auto text-xs">
        {events.length === 0 ? (
          <div className="p-3 opacity-70">No events yet.</div>
        ) : (
          <ul className="divide-y divide-white/10">
            {events.map((e, i) => (
              <li key={i} className="p-3">
                <div className="flex items-center justify-between"><b>{e.type}</b><span className="opacity-70">{new Date(e.ts).toLocaleTimeString()}</span></div>
                <pre className="mt-1 whitespace-pre-wrap break-words opacity-90">{JSON.stringify(e.payload, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  // ---------- Sandbox Panel ----------
   type Sandbox = { latencyMs: number; forceCardOutcome: "auto" | "succeed" | "fail"; autoMarkSent: boolean; pointsMultiplier: number; showInspector: boolean; };

  const SandboxPanel: React.FC<{ t: I18n; sandbox: Sandbox; setSandbox: React.Dispatch<React.SetStateAction<Sandbox>>; onClearData: () => void; onSeedTenant: () => void; onSeedLandlord: () => void; onScenarioRaastAuto: () => void; onScenarioDeclineThenWallet: () => void; onSimulateRaastCredit?: () => void; onKycNone: () => void; onKycInProgress: () => void; onKycVerified: () => void; onSeedHistory?: () => void; }> = ({ t, sandbox, setSandbox, onClearData, onSeedTenant, onSeedLandlord, onScenarioRaastAuto, onScenarioDeclineThenWallet, onSimulateRaastCredit, onKycNone, onKycInProgress, onKycVerified, onSeedHistory }) => (
    <div className="rounded-2xl border bg-white/5 border-white/10 p-3">
      <div className="flex items-center justify-between mb-2"><div className="font-semibold">Sandbox Controls</div><div className="text-[11px] opacity-70">Demo only</div></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <div className="text-xs opacity-70 mb-1">Artificial latency (ms)</div>
          <input type="range" min={0} max={2000} step={100} value={sandbox.latencyMs} onChange={(e) => setSandbox((s) => ({ ...s, latencyMs: Number(e.target.value) }))} className="w-full" />
          <div className="text-xs mt-1">{sandbox.latencyMs}ms</div>
        </div>
        <div>
          <div className="text-xs opacity-70 mb-1">Card/Wallet outcome</div>
          <select className="px-2 py-2 rounded-md border bg-transparent border-white/10" value={sandbox.forceCardOutcome} onChange={(e) => setSandbox((s) => ({ ...s, forceCardOutcome: e.target.value as Sandbox["forceCardOutcome"] }))}>
            <option value="auto">Auto</option>
            <option value="succeed">Force Succeed</option>
            <option value="fail">Force Fail</option>
          </select>
        </div>
        <div>
          <div className="text-xs opacity-70 mb-1">Points multiplier</div>
          <select className="px-2 py-2 rounded-md border bg-transparent border-white/10" value={sandbox.pointsMultiplier} onChange={(e) => setSandbox((s) => ({ ...s, pointsMultiplier: Number(e.target.value) }))}>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>
        <div className="flex items-center gap-2"><input id="autoSent" type="checkbox" checked={sandbox.autoMarkSent} onChange={(e) => setSandbox((s) => ({ ...s, autoMarkSent: e.target.checked }))} /><label htmlFor="autoSent" className="text-sm">Auto-mark bank transfer as sent</label></div>
        <div className="flex items-center gap-2"><input id="inspector" type="checkbox" checked={sandbox.showInspector} onChange={(e) => setSandbox((s) => ({ ...s, showInspector: e.target.checked }))} /><label htmlFor="inspector" className="text-sm">Show Event Inspector</label></div>
        <div className="flex items-center gap-2"><Button variant="destructive" onClick={onClearData}>Clear demo data</Button></div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2"><div className="font-semibold">KYC Simulation</div><div className="text-[11px] opacity-70">Toggle demo KYC state</div></div>
        <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={onKycNone}>Not started</Button><Button variant="outline" onClick={onKycInProgress}>In progress</Button><Button onClick={onKycVerified}>Verified</Button></div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2"><div className="font-semibold">Quick seeds & scenarios</div><div className="text-[11px] opacity-70">One-click demo</div></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <Button variant="outline" onClick={onSeedTenant}>Seed Tenant (basic)</Button>
          <Button variant="outline" onClick={onSeedLandlord}>Seed Landlord (3 units)</Button>
          <Button variant="outline" onClick={onScenarioRaastAuto}>Scenario: Raast auto-sent</Button>
          <Button variant="outline" onClick={onScenarioDeclineThenWallet}>Scenario: Card decline → Wallet success</Button>
          {onSimulateRaastCredit ? <Button variant="outline" onClick={onSimulateRaastCredit}>Simulate Raast credit detection</Button> : null}
          {onSeedHistory ? <Button variant="outline" onClick={onSeedHistory}>Seed: 6-month history</Button> : null}
        </div>
      </div>
    </div>
  );

  // ---------- Modals ----------
  const Backdrop: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const prevFocus = useRef<HTMLElement | null>(null);
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Tab" && panelRef.current) {
          const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement as HTMLElement | null;
          if (e.shiftKey && active === first) { last.focus(); e.preventDefault(); }
          else if (!e.shiftKey && active === last) { first.focus(); e.preventDefault(); }
        }
      };
      window.addEventListener("keydown", onKey);
      prevFocus.current = document.activeElement as HTMLElement | null;
      setTimeout(() => { const el = panelRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); el?.focus(); }, 0);
      return () => { window.removeEventListener("keydown", onKey); prevFocus.current?.focus?.(); };
    }, [onClose]);
    return (
      <div role="dialog" aria-modal="true" onClick={onClose} className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4">
        <div ref={panelRef} onClick={(e) => e.stopPropagation()} className="w-full max-w-[720px] rounded-2xl border border-white/10 bg-[#0b0b0b] text-white shadow-2xl">{children}</div>
      </div>
    );
  };

  const RowKV: React.FC<{ label: React.ReactNode; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex items-center justify-between"><div className="opacity-70">{label}</div><div className="font-medium">{value}</div></div>
  );

  const PaymentReceiptModal: React.FC<{ t: I18n; payment: Payment; onClose: () => void; lang?: 'en' | 'ur' }> = ({ t, payment, onClose, lang = 'en' }) => {
    const date = new Date(payment.ts).toLocaleString('en-PK');
    const openPrintWindow = () => {
      const profileName = (() => { try { return localStorage.getItem('rb-profile-name') || ''; } catch { return ''; } })();
      const profileCnic = (() => { try { return localStorage.getItem('rb-profile-cnic') || ''; } catch { return ''; } })();
      const profileProperty = (() => { try { return localStorage.getItem('rb-profile-property') || ''; } catch { return ''; } })();
      const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Receipt</title><style>body{font-family:Arial, Helvetica, sans-serif;padding:24px;color:#0b0b0b} .card{max-width:720px;margin:0 auto;border-radius:12px;padding:18px;border:1px solid rgba(0,0,0,0.08)} .watermark{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:64px;color:rgba(0,0,0,0.04);pointer-events:none}</style></head><body><div class="watermark">DEMO</div><div class="card"><h2>${t.pay.receipt}</h2><p><strong>Ref:</strong> ${payment.ref}</p><p><strong>Date:</strong> ${date}</p>${profileName ? `<p><strong>Name:</strong> ${profileName}</p>` : ''}${profileCnic ? `<p><strong>CNIC:</strong> ${profileCnic}</p>` : ''}${profileProperty ? `<p><strong>Property:</strong> ${profileProperty}</p>` : ''}<p><strong>${t.pay.landlord}:</strong> ${payment.landlord}</p><p><strong>${t.pay.method}:</strong> ${payment.method}</p><p><strong>Amount:</strong> ${formatPKR(payment.amount)}</p><p style="opacity:0.8;font-size:12px">${t.pay.demoNote}</p></div></body></html>`;
      const w = window.open('', '_blank', 'width=800,height=900'); if (!w) return; w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400);
    };
    return (
      <Backdrop onClose={onClose}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10"><div className="flex items-center gap-2 font-bold text-emerald-300"><BrandLogo /> {t.pay.receipt}</div><Button variant="outline" size="sm" onClick={onClose} aria-label="Close">✕</Button></div>
        <div className="p-4 space-y-2 text-sm">
          <RowKV label="Ref" value={payment.ref} />
          <RowKV label="Date" value={date} />
          <RowKV label={t.pay.landlord} value={payment.landlord} />
          <RowKV label={t.pay.method} value={payment.method} />
          <RowKV label={t.pay.status} value={payment.status} />
          <RowKV label="Amount" value={<b>{formatPKR(payment.amount)}</b>} />
          <div className="text-xs opacity-70 mt-3">{t.pay.demoNote}</div>
          <div className="flex gap-2 justify-end mt-4"><Button variant="outline" onClick={openPrintWindow}>{t.pay.print}</Button><Button onClick={onClose}>{t.pay.close}</Button></div>
        </div>
      </Backdrop>
    );
  };

  const RedeemModal: React.FC<{ t: I18n; reward: (typeof rewardsCatalog)[number] | null; onClose: () => void; onConfirm: (denom: number) => void }> = ({ t, reward, onClose, onConfirm }) => {
    const [denom, setDenom] = useState<number | null>(null);
    if (!reward) return null;
    return (
      <Backdrop onClose={onClose}>
        <div className="p-4">
          <div className="font-bold mb-3">{t.rewards.choose}: {reward.title}</div>
          <div className="flex flex-wrap gap-2">
            {reward.denom.map((d) => (
              <button key={d} type="button" onClick={() => setDenom(d)} className={cn("px-3 py-2 rounded-lg border font-semibold", denom === d ? "border-emerald-600 bg-emerald-900/20" : "border-white/10 bg-white/5 hover:bg-white/10")}>{formatPKR(d)}</button>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>{t.rewards.cancel}</Button>
            <Button onClick={() => denom && onConfirm(denom)} disabled={!denom}>{t.rewards.confirm}</Button>
          </div>
        </div>
      </Backdrop>
    );
  };

  const RedeemReceiptModal: React.FC<{ t: I18n; item: Redemption; onClose: () => void; lang?: 'en' | 'ur' }> = ({ t, item, onClose, lang = 'en' }) => {
    const date = new Date(item.ts).toLocaleString('en-PK');
    const openPrintWindow = () => {
      const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Redemption Receipt</title><style>body{font-family:Arial, Helvetica, sans-serif;padding:24px;color:#0b0b0b} .card{max-width:720px;margin:0 auto;border-radius:12px;padding:18px;border:1px solid rgba(0,0,0,0.08)} .watermark{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:64px;color:rgba(0,0,0,0.04);pointer-events:none}</style></head><body><div class="watermark">DEMO</div><div class="card"><h2>${t.rewards.receiptTitle}</h2><p><strong>Ref:</strong> ${item.ref}</p><p><strong>Date:</strong> ${date}</p><p><strong>Reward:</strong> ${item.brand} — ${item.title} (${formatPKR(item.denomination)})</p><p><strong>${t.rewards.points}:</strong> ${item.points}</p><p style="opacity:0.8;font-size:12px">Demo receipt — no real fulfillment performed.</p></div></body></html>`;
      const w = window.open('', '_blank', 'width=800,height=900'); if (!w) return; w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400);
    };
    return (
      <Backdrop onClose={onClose}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10"><div className="flex items-center gap-2 font-bold text-emerald-300"><BrandLogo /> {t.rewards.receiptTitle}</div><Button variant="outline" size="sm" onClick={onClose} aria-label="Close">✕</Button></div>
        <div className="p-4 space-y-2 text-sm">
          <RowKV label="Ref" value={item.ref} />
          <RowKV label="Date" value={date} />
          <RowKV label="Reward" value={`${item.brand} — ${item.title} (${formatPKR(item.denomination)})`} />
          <RowKV label={t.rewards.points} value={String(item.points)} />
          <RowKV label={t.rewards.status} value={item.status} />
          <div className="text-xs opacity-70 mt-3">Demo receipt — no real fulfillment performed.</div>
          <div className="flex gap-2 justify-end mt-4"><Button variant="outline" onClick={openPrintWindow}>{t.pay.print}</Button><Button onClick={onClose}>{t.pay.close}</Button></div>
        </div>
      </Backdrop>
    );
  };

  // ---------- Pages ----------
  const HomeTab: React.FC<{ t: I18n; role: Role; kyc: KycState; goProfile: () => void }> = ({ t, role, kyc, goProfile }) => {
    const headline = role === "tenant" ? t.home.headlineTenant : t.home.headlineLandlord;
    const sub = role === "tenant" ? t.home.subTenant : t.home.subLandlord;
    return (
      <div>
        <SectionTitle title={headline} subtitle={sub} />
        {kyc !== "verified" ? (
          <div className="p-3 rounded-2xl border bg-white/5 border-white/10 flex items-center justify-between gap-2">
            <div>
              <div className="font-bold">{t.home.kycTitle}</div>
              <div className="text-[12px] opacity-75 mt-1">{t.home.kycSub}</div>
            </div>
            <Button onClick={goProfile}>{t.home.kycCta}</Button>
          </div>
        ) : null}
        <div className="h-4" />
        <CardVisual />
        <div className="h-4" />
        {role === "tenant" ? (
          <div className="grid gap-2">
            <Row right="PKR 120,000">{t.home.tenantRows.pending}</Row>
            <Row right="Due 1 Oct">{t.home.tenantRows.upcoming}</Row>
            <Row right="2 rewards">{t.home.tenantRows.rewards}</Row>
          </div>
        ) : (
          <div className="grid gap-2">
            <Row right="3 units">{t.home.landlordRows.listings}</Row>
            <Row right="PKR 360,000">{t.home.landlordRows.expected}</Row>
            <Row right="1 overdue">{t.home.landlordRows.followups}</Row>
          </div>
        )}
      </div>
    );
  };

  // Helpers for PayTab
  const toCSV = (rows: string[][]) => [rows[0].join(","),
...rows.slice(1).map((r) => r.join(","))].join("\n");

  const PayTab: React.FC<{ t: I18n; payments: Payment[]; addPayment: (p: Payment) => void; updatePayment: (id: string, patch: Partial<Payment>) => void; role: Role; utm: Utm; onOpenReceipt: (p: Payment) => void; demoIban?: string; }> = ({ t, payments, addPayment, updatePayment, role, utm, onOpenReceipt, demoIban }) => {
    const [amountView, setAmountView] = useState<string>("");
    const [amountVal, setAmountVal] = useState<number>(0);
    const [landlord, setLandlord] = useState<string>("");
    const [method, setMethod] = useState<Payment["method"]>("Bank Transfer");
    const [message, setMessage] = useState<string>("");

    const logPayment = async (p: Payment) => {
      await postToSheet({ table: "payments", ref: p.ref, amount: p.amount, landlord: p.landlord, method: p.method, status: p.status, ts: new Date(p.ts).toISOString(), role, utmSource: utm.source, utmMedium: utm.medium, utmCampaign: utm.campaign, ua: getUA() });
    };

    const handleCreate = async () => {
      if (!amountVal || amountVal <= 0 || !landlord.trim()) { setMessage(t.pay.invalid); return; }
      const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
      const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
      const status: PaymentStatus = method === "Bank Transfer" ? "initiated" : "succeeded";
      const base: Payment = { id, amount: amountVal, landlord: landlord.trim(), method, status, ts: Date.now(), ref };
      addPayment(base);
      setMessage(status === "succeeded" ? "Payment succeeded (demo). View receipt below." : "Transfer instructions generated below. Mark as sent when done.");
      setAmountView(""); setAmountVal(0); setLandlord(""); await logPayment(base);
    };

    const markSent = async (id: string) => {
      const p = payments.find((x) => x.id === id); if (!p) return;
      const patch: Partial<Payment> = { status: "sent" };
      updatePayment(id, patch); await logPayment({ ...p, ...patch } as Payment);
    };

    const refund = async (id: string) => {
      const p = payments.find((x) => x.id === id); if (!p || p.status === "refunded") return;
      const patch: Partial<Payment> = { status: "refunded" };
      updatePayment(id, patch); await logPayment({ ...p, ...patch } as Payment);
    };

    const downloadCSV = () => {
      const headers = ["ref","amount","landlord","method","status","ts","role"];
      const rows = payments.map((p) => [p.ref, String(p.amount), p.landlord, p.method, p.status, new Date(p.ts).toISOString(), role]);
      const csv = toCSV([headers, ...rows]);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "rentback-demo-payments.csv"; a.click(); URL.revokeObjectURL(url);
    };

    return (
      <div>
        <SectionTitle title={t.pay.title} subtitle={t.pay.subtitle} />
        <div className="grid gap-2 mb-3">
          <input value={amountView} onChange={(e) => { const { view, value } = formatPKRInput(e.target.value); setAmountView(view); setAmountVal(value); }} placeholder={t.pay.amount} inputMode="numeric" className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none" />
          <input value={landlord} onChange={(e) => setLandlord(e.target.value)} placeholder={t.pay.landlord} className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none" />
          <select value={method} onChange={(e) => setMethod(e.target.value as Payment["method"]) } className="px-3 py-3 rounded-xl border border-white/10 bg-white/5 outline-none"><option>Bank Transfer</option><option>Card</option><option>Wallet</option></select>
          <div className="flex flex-wrap gap-2"><Button onClick={handleCreate}>{t.pay.create}</Button><Button variant="outline" onClick={downloadCSV}>{t.pay.csv}</Button></div>
          {message ? <div className="text-[12px] text-emerald-300">{message}</div> : null}
        </div>

        <SectionTitle title={t.pay.recent} />
        <div className="grid gap-2">
          {payments.length === 0 ? (
            <div className="text-[13px] opacity-70">No demo payments yet.</div>
          ) : (
            payments.slice().sort((a,b) => b.ts - a.ts).map((p) => (
              <div key={p.id} className="p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between font-semibold"><span>{p.landlord}</span><span>{formatPKR(p.amount)}</span></div>
                <div className="flex items-center justify-between mt-1 text-[12px] opacity-80"><span>{p.method} • Ref {p.ref}</span><span className={cn(p.status === "succeeded" ? "text-emerald-300" : p.status === "sent" ? "text-amber-300" : p.status === "refunded" ? "text-slate-400" : "text-slate-200")}>{p.status === "succeeded" ? t.pay.succeeded : p.status === "sent" ? t.pay.sent : p.status === "refunded" ? t.pay.refunded : t.pay.instructions}</span></div>
                {p.method === "Bank Transfer" && p.status === "initiated" ? (
                  <div className="mt-2 text-[12px] space-y-1">
                    <div>{t.pay.transferTo}: <b>{t.pay.collections}</b></div>
                    <div>{t.pay.iban}: <b>{demoIban || t.pay.ibanValue}</b></div>
                    <div>{t.pay.memo}: <b>{p.ref}</b></div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="rounded-xl border border-white/10 p-2">
                        <div className="text-[11px] opacity-70">{t.pay.raastQR}</div>
                        <div className="bg-white p-2 rounded-lg inline-block">
                          <RaastQR value={`RB|${demoIban || t.pay.ibanValue}|${p.ref}|${p.amount}`} size={112} />
                        </div>
                      </div>
                      <Button onClick={() => markSent(p.id)}>{t.pay.markSent}</Button>
                    </div>
                  </div>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-2"><Button variant="outline" onClick={() => onOpenReceipt(p)}>{t.pay.receipt}</Button><Button variant="outline" onClick={() => refund(p.id)} disabled={p.status === "refunded" || p.status === "initiated"}>{p.status === "refunded" ? t.pay.refunded : t.pay.refund}</Button></div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Rewards Tab
  const RewardsTab: React.FC<{ t: I18n; redemptions: Redemption[]; setRedemptions: React.Dispatch<React.SetStateAction<Redemption[]>>; role: Role; utm: Utm; onOpenRedeemReceipt: (r: Redemption) => void; }> = ({ t, redemptions, setRedemptions }) => {
    const redeem = (r: typeof rewardsCatalog[number], denom: number) => {
      const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
      const ref = `RB-REDEEM-${Math.floor(100000 + Math.random() * 900000)}`;
      const item: Redemption = { id, ref, rewardId: r.id, brand: r.brand, title: r.title, denomination: denom, points: Math.round(denom/10), status: "requested", ts: Date.now() };
      setRedemptions((prev) => [item, ...prev]);
    };
    return (
      <div>
        <SectionTitle title={t.rewards.title} subtitle={t.rewards.subtitle} />
        <div className="grid grid-cols-2 gap-2">
          {rewardsCatalog.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="font-semibold">{r.title}</div>
              <div className="text-[12px] opacity-70">{r.note}</div>
              <div className="mt-1 text-[11px] inline-block px-2 py-1 rounded bg-emerald-900/30 text-emerald-300">{r.save}</div>
              <div className="mt-2 flex flex-wrap gap-2">{r.denom.map((d) => <Button key={d} size="sm" onClick={() => redeem(r, d)}>{d}</Button>)}</div>
            </div>
          ))}
        </div>
        <div className="h-4" />
        <SectionTitle title={t.rewards.recent} />
        {redemptions.length === 0 ? (
          <div className="text-[13px] opacity-70">{t.rewards.none}</div>
        ) : (
          <div className="grid gap-2">
            {redemptions.slice().sort((a,b)=>b.ts-a.ts).map((r) => (
              <div key={r.id} className="p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between font-semibold"><span>{r.brand} — {r.title}</span><span className={cn(r.status === "fulfilled" ? "text-emerald-300" : r.status === "cancelled" ? "text-slate-400" : "text-slate-200")}>{r.status}</span></div>
                <div className="flex items-center justify-between mt-1 text-[12px] opacity-80"><span>Ref {r.ref} • {t.rewards.points}: {r.points}</span><span>{new Date(r.ts).toLocaleString("en-PK")}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Support/Profile/Status/Security/About/Founder
  const SupportTab: React.FC<{ t: I18n }> = ({ t }) => (<div><SectionTitle title={t.support.title} subtitle={t.support.subtitle} /><Row right="help@rentback.app">{t.support.email}</Row><div className="h-2" /><Row right="@rentback">{t.support.twitter}</Row></div>);
  const ProfileTab: React.FC<{ t: I18n; kyc: KycState; setKyc: (k: KycState) => void }> = ({ t, kyc, setKyc }) => (
    <div><SectionTitle title={t.profile.title} /><Row right={kyc === 'verified' ? t.profile.verified : kyc === 'in-progress' ? t.profile.inprogress : t.profile.notStarted}>{t.profile.kyc}</Row><div className="h-2" />{kyc !== 'verified' ? (<Button onClick={() => setKyc(kyc === 'none' ? 'in-progress' : 'verified')}>{kyc === 'none' ? t.profile.start : t.profile.complete}</Button>) : (<div className="text-[12px] opacity-75">{t.profile.thanks}</div>)}</div>
  );
  const StatusScreen: React.FC<{ t: I18n }> = ({ t }) => (<div><SectionTitle title={t.status.title} subtitle={t.status.subtitle} /><ul className="pl-5 leading-7 list-disc">{t.status.items.map((it: string, i: number) => (<li key={i}>{it}</li>))}</ul></div>);
  const SecurityPrivacy: React.FC<{ t: I18n }> = ({ t }) => (<div><SectionTitle title={t.security.title} subtitle={t.security.subtitle} /><ul className="pl-5 leading-7 list-disc">{t.security.items.map((it: string, i: number) => (<li key={i}>{it}</li>))}</ul></div>);
  const AboutScreen: React.FC<{ t: I18n }> = ({ t }) => (<div><SectionTitle title={t.about.title} subtitle={t.about.sub} /><p className="leading-6">{t.about.body}</p></div>);
  const FounderScreen: React.FC<{ t: I18n }> = ({ t }) => (<div><SectionTitle title={t.founder.title} /><div className="grid gap-2"><Row right="CEO">Suhail Ahmed</Row><Row right="help@rentback.app">{t.founder.contact}</Row></div></div>);

  // ---------- App ----------
  export default function App() {
    const [tab, setTab] = useState<Tab>('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [role, setRole] = useState<Role>('tenant');
    const [kyc, setKyc] = useState<KycState>('none');
    const [payments, setPayments] = useState<Payment[]>([]);
    const [redemptions, setRedemptions] = useState<Redemption[]>([]);
    const [receiptFor, setReceiptFor] = useState<Payment | null>(null);
    const [redeemReceipt, setRedeemReceipt] = useState<Redemption | null>(null);
    const [demoIban, setDemoIban] = useState<string>(copy.en.pay.ibanValue);
    const [lang, setLang] = useState<'en' | 'ur'>('en');
    const dir: 'ltr' | 'rtl' = lang === 'ur' ? 'rtl' : 'ltr';
    const t: I18n = (copy as any)[lang] as I18n;
    const utm = useMemo(() => getUtm(), []);
    const { notify, ToastStack } = useToasts();
    const bus = useEventBus();

    useEffect(() => { try { const root = document.documentElement; root.setAttribute('lang', lang); root.setAttribute('dir', dir); } catch {} }, [lang, dir]);
    useEffect(() => { try { const raw = localStorage.getItem('rb-demo-payments'); if (raw) setPayments(JSON.parse(raw)); } catch {} }, []);
    useEffect(() => { try { localStorage.setItem('rb-demo-payments', JSON.stringify(payments)); } catch {} }, [payments]);
    useEffect(() => { try { const raw = localStorage.getItem('rb-demo-redemptions'); if (raw) setRedemptions(JSON.parse(raw)); } catch {} }, []);
    useEffect(() => { try { localStorage.setItem('rb-demo-redemptions', JSON.stringify(redemptions)); } catch {} }, [redemptions]);
    useEffect(() => { try { const saved = localStorage.getItem('rb-lang'); if (saved === 'en' || saved === 'ur') setLang(saved as any); } catch {} }, []);
    useEffect(() => { try { localStorage.setItem('rb-lang', lang); } catch {} }, [lang]);

    const content = useMemo(() => {
      switch (tab) {
        case 'home': return <HomeTab t={t} role={role} kyc={kyc} goProfile={() => setTab('profile')} />;
        case 'pay': return <PayTab t={t} payments={payments} addPayment={(p) => { setPayments((prev) => [p, ...prev]); bus.emit('payment:create', p); }} updatePayment={(id, patch) => setPayments((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))} role={role} utm={utm} onOpenReceipt={(p) => setReceiptFor(p)} demoIban={demoIban} />;
        case 'rewards': return <RewardsTab t={t} redemptions={redemptions} setRedemptions={setRedemptions} role={role} utm={utm} onOpenRedeemReceipt={(r) => setRedeemReceipt(r)} />;
        case 'support': return <>{<SectionTitle title={t.support.title} subtitle={t.support.subtitle} />}<Row right="help@rentback.app">{t.support.email}</Row><div className="h-2" /><Row right="@rentback">{t.support.twitter}</Row></>;
        case 'profile': return <ProfileTab t={t} kyc={kyc} setKyc={setKyc} />;
        case 'status': return <StatusScreen t={t} />;
        case 'security': return <SecurityPrivacy t={t} />;
        case 'about': return <AboutScreen t={t} />;
        case 'founder': return <FounderScreen t={t} />;
        default: return null;
      }
    }, [tab, role, kyc, payments, redemptions, utm, t, demoIban]);

    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white" dir={dir}>
        <ToastStack />
        <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 bg-[#0b0b0bcc] backdrop-saturate-150 backdrop-blur border-b border-white/10">
          <div className="flex items-center gap-2 font-bold text-emerald-400"><BrandLogo /> RentBack</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setLang((p) => (p === 'en' ? 'ur' : 'en'))}>{t.langNames[lang === 'en' ? 'ur' : 'en']}</Button>
            <Button variant="outline" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</Button>
          </div>
        </header>

        <main className="p-3 pb-24 max-w-xl mx-auto">
          <div className="mb-2"><SandboxBanner lang={lang} /></div>
          {content}
        </main>

        <nav className="fixed left-0 right-0 bottom-0 z-[30] bg-white/5 border-t border-white/10 h-16 grid grid-cols-5 place-items-center">
          {[{ key: 'home', label: t.nav.home },{ key: 'pay', label: t.nav.pay },{ key: 'rewards', label: t.nav.rewards },{ key: 'support', label: t.nav.support },{ key: 'profile', label: t.nav.profile }].map((it) => (
            <button key={it.key} onClick={() => setTab(it.key as Tab)} className={cn('h-full w-full flex flex-col items-center justify-center gap-1 font-medium', tab === it.key ? 'text-emerald-400' : 'text-slate-200')}>
              <span className="text-xs">{it.label}</span>
            </button>
          ))}
        </nav>

        {menuOpen ? (
          <div role="dialog" aria-modal="true" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[50] bg-black/35 flex justify-end">
            <div onClick={(e) => e.stopPropagation()} className="w-[320px] max-w-[90%] h-full bg-[#0b0b0b] p-3 flex flex-col gap-2 shadow-2xl border-l border-white/10">
              <div className="flex items-center justify-between"><div className="font-bold">{t.menu}</div><Button variant="outline" size="sm" onClick={() => setMenuOpen(false)} aria-label="Close">✕</Button></div>
              <SectionTitle title={t.drawer.explore} />
              <Row onClick={() => { setTab('status'); setMenuOpen(false); }}>{t.drawer.status}</Row>
              <Row onClick={() => { setTab('security'); setMenuOpen(false); }}>{t.drawer.security}</Row>
              <Row onClick={() => { setTab('rewards'); setMenuOpen(false); }}>{t.drawer.rewards}</Row>
              <Row onClick={() => { setTab('about'); setMenuOpen(false); }}>{t.drawer.about}</Row>
              <Row onClick={() => { setTab('founder'); setMenuOpen(false); }}>{t.drawer.founder}</Row>
              <div className="h-1" />
              <SectionTitle title={t.drawer.role} subtitle={t.drawer.roleHint} />
              <div className="flex flex-wrap gap-2"><Button variant={role==='tenant'?'default':'outline'} onClick={() => setRole('tenant')}>{t.drawer.tenant}</Button><Button variant={role==='landlord'?'default':'outline'} onClick={() => setRole('landlord')}>{t.drawer.landlord}</Button></div>
              <div className="h-1" />
              <SectionTitle title={t.drawer.lang} />
              <div className="flex gap-2"><Button variant={lang==='en'?'default':'outline'} onClick={() => setLang('en')}>{t.langNames.en}</Button><Button variant={lang==='ur'?'default':'outline'} onClick={() => setLang('ur')}>{t.langNames.ur}</Button></div>
            </div>
          </div>
        ) : null}

        {receiptFor ? <PaymentReceiptModal t={t} payment={receiptFor} onClose={() => setReceiptFor(null)} /> : null}
        {redeemReceipt ? <RedeemReceiptModal t={t} item={redeemReceipt} onClose={() => setRedeemReceipt(null)} /> : null}
      </div>
    );
  }
