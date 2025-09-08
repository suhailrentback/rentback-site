"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Languages, Shield, Gift, Zap } from "lucide-react";
import Script from "next/script";

/**
 * RentBack Landing Page — follows system theme (no toggle)
 * - Theme follows device (prefers-color-scheme) automatically
 * - EN/UR language toggle in footer
 * - Header clean; footer has Privacy/Terms/Rewards/Founder/Cookies + Language
 * - Consent-based analytics (Plausible)
 * - Phone normalizer (PK) + inline validation
 * - Waitlist form posts to window.RB_WAITLIST_ENDPOINT (optional SECRET)
 */

// Optional globals injected via a <script> tag in app/layout.tsx
// window.RB_WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec'
// window.RB_WAITLIST_SECRET = 'your-shared-secret'

// Fallback endpoint (used if runtime script not present)
const FALLBACK_WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwCqHgI_5wkWTTorP_803gULbkVDuhLLs_lQnKN9k5dl1NPJx7XKEHj8IOcIyIENZgm/exec" as const;

export default function RentBackLanding() {
  const _WAITLIST_ENDPOINT =
    (typeof window !== "undefined" && (window as any).RB_WAITLIST_ENDPOINT) ||
    FALLBACK_WAITLIST_ENDPOINT;

  const _WAITLIST_SECRET =
    (typeof window !== "undefined" && (window as any).RB_WAITLIST_SECRET) || "";

  // Expose the resolved endpoint back to window for quick manual checks
  useEffect(() => {
    try {
      (window as any).RB_WAITLIST_ENDPOINT = _WAITLIST_ENDPOINT;
    } catch {}
  }, [_WAITLIST_ENDPOINT]);

  const [lang, setLang] = useState<"en" | "ur">("en");

  // Theme: follow OS setting (no manual toggle, no persistence)
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => setDarkMode(mq.matches);
      apply(); // initial
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    } catch {}
  }, []);

  // Reflect darkMode to <html> & <body>
  useEffect(() => {
    try {
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        const body = document.body;
        root.classList.toggle("dark", darkMode);
        if (body) body.classList.toggle("dark", darkMode);
        (root as HTMLElement).style.colorScheme = darkMode ? "dark" : "light";
      }
    } catch {}
  }, [darkMode]);

  // Reflect language and direction on <html>
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("lang", lang === "ur" ? "ur" : "en");
      root.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    } catch {}
  }, [lang]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [city, setCity] = useState("");

  // ---- Form UX niceties: inline validation ----
  type FieldErrors = { email?: string; wa?: string };
  const [touched, setTouched] = useState<{
    email: boolean;
    wa: boolean;
    city: boolean;
  }>({ email: false, wa: false, city: false });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const messages = useMemo(
    () => ({
      en: {
        emailReq: "Please enter a valid email address.",
        waReq: "Please enter your phone number.",
        waInvalid:
          "Enter a Pakistani mobile like 03001234567 or +923001234567.",
      },
      ur: {
        emailReq: "براہِ کرم درست ای میل درج کریں۔",
        waReq: "براہِ کرم اپنا فون نمبر درج کریں۔",
        waInvalid:
          "پاکستانی موبائل نمبر لکھیں: 03001234567 یا +923001234567",
      },
    }),
    []
  );

  const validateNow = (em: string, w: string): FieldErrors => {
    const errs: FieldErrors = {};
    const emailOk = /.+@.+\..+/.test(em.trim());
    if (!emailOk) errs.email = messages[lang].emailReq;

    const wTrim = w.trim();
    if (!wTrim) {
      errs.wa = messages[lang].waReq;
    } else {
      const pk = /^(?:[+]92)?0?3[0-9]{9}$/; // 03XXXXXXXXX or +923XXXXXXXXX
      if (!pk.test(wTrim)) errs.wa = messages[lang].waInvalid;
    }
    return errs;
  };

  // live-validate on input change
  useEffect(() => {
    setFieldErrors(validateNow(email, wa));
  }, [email, wa, lang]);

  const [openLegal, setOpenLegal] = useState<null | "privacy" | "terms" | "rewards">(null);
  const [openFounder, setOpenFounder] = useState(false);
  const [openCookies, setOpenCookies] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState<{ analytics: boolean } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const [bgReady, setBgReady] = useState(false);
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLDivElement | null>(null);
  // Anti-spam helpers
  const hpRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  // --- Phone input helper: normalize Pakistani numbers while typing ---
  const normalizePkPhone = (raw: string): string => {
    let s = (raw || "")
      .split("")
      .filter((ch) => (ch >= "0" && ch <= "9") || ch === "+")
      .join("");
    if (s.startsWith("+"))
      s = "+" + s.slice(1).split("").filter((ch) => ch !== "+").join("");
    else s = s.split("").filter((ch) => ch !== "+").join("");

    if (s.startsWith("00")) s = "+" + s.slice(2);
    if (s.startsWith("92")) s = "+92" + s.slice(2);

    const digits = s.split("").filter((ch) => ch >= "0" && ch <= "9").join("");

    if (s.startsWith("+92")) return ("+92" + digits.slice(2)).slice(0, 13);

    if (digits.length >= 11 && digits[0] === "0" && digits[1] === "3")
      return "+92" + digits.slice(1, 11);
    if (digits.length === 10 && digits[0] === "3") return "+92" + digits.slice(0, 10);

    let ten = digits;
    while (ten.startsWith("0")) ten = ten.slice(1);
    ten = ten.slice(0, 10);
    return "+92" + ten;
  };

  // Paste handler to normalize clipboard text for phone
  useEffect(() => {
    const el = document.getElementById("rb-wa") as HTMLInputElement | null;
    if (!el) return;
    const onPaste = (e: ClipboardEvent) => {
      try {
        e.preventDefault();
        const txt = (e.clipboardData && e.clipboardData.getData("text")) || "";
        setWa(normalizePkPhone(txt));
      } catch {}
    };
    el.addEventListener("paste", onPaste as any);
    return () => el.removeEventListener("paste", onPaste as any);
  }, []);

  const dir: "ltr" | "rtl" = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setBgReady(true), 200);
    return () => clearTimeout(t);
  }, [reduce]);

  // Load cookie preferences
  useEffect(() => {
    try {
      const raw =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("rb-cookies")
          : null;
      if (raw) setCookiePrefs(JSON.parse(raw));
      else setCookiePrefs({ analytics: false });
    } catch {
      setCookiePrefs({ analytics: false });
    }
  }, []);

  // Analytics loader (consent-based)
  useEffect(() => {
    try {
      const head = document.head;
      const hasConsent = Boolean(cookiePrefs?.analytics);
      const preId = "rb-preconnect-plausible";
      const scrId = "rb-plausible";
      if (hasConsent) {
        if (head && !document.getElementById(preId)) {
          const pre = document.createElement("link");
          pre.id = preId;
          pre.rel = "preconnect";
          pre.href = "https://plausible.io";
          pre.crossOrigin = "anonymous";
          head.appendChild(pre);
        }
        if (head && !document.getElementById(scrId)) {
          const s = document.createElement("script");
          s.id = scrId;
          s.defer = true;
          s.setAttribute("data-domain", "rentback.app");
          s.src = "https://plausible.io/js/plausible.js";
          head.appendChild(s);
        }
      } else {
        document.getElementById(preId)?.remove?.();
        document.getElementById(scrId)?.remove?.();
        try {
          delete (window as any).plausible;
        } catch {}
      }
    } catch {}
  }, [cookiePrefs?.analytics]);

  // Modal a11y: focus trap, ESC-to-close, and restore focus
  useEffect(() => {
    const anyOpen = Boolean(openLegal || openFounder || openCookies);
    if (!anyOpen) return;

    const closeAll = () => {
      setOpenLegal(null);
      setOpenFounder(false);
      setOpenCookies(false);
    };

    try {
      prevFocusRef.current = (document.activeElement as HTMLElement) || null;
      const container = modalRef.current;
      const selector =
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const nodeList = container
        ? (container.querySelectorAll(selector) as NodeListOf<HTMLElement>)
        : null;
      const focusables = nodeList
        ? Array.from(nodeList).filter((el) => !el.hasAttribute("disabled"))
        : [];
      (focusables[0] || container)?.focus?.();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          closeAll();
          return;
        }
        if (e.key === "Tab" && container && focusables.length) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement as HTMLElement | null;
          if (e.shiftKey) {
            if (!active || active === first || !container.contains(active)) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (!active || active === last || !container.contains(active)) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        try {
          prevFocusRef.current?.focus?.();
        } catch {}
      };
    } catch {}
  }, [openLegal, openFounder, openCookies]);

  const copy = useMemo(
    () => ({
      en: {
        metaTagline: "Pakistan-wide",
        heroTitle: "Turn your rent into rewards.",
        heroSub:
          "We are building the RentBack app. Pay by our card, your bank, or any digital bank. Earn points and redeem for bills and shopping. Join the app waitlist for early access.",
        cta: "Join the app waitlist",
        howTitle: "How it works",
        how: [
          {
            title: "Pay rent",
            desc:
              "Use your preferred method: our card, your bank, or any digital bank.",
          },
          { title: "Earn points", desc: "Instant points on every verified payment." },
          {
            title: "Redeem rewards",
            desc: "Mobile top-ups, utility bills, shopping vouchers.",
          },
        ],
        whyTitle: "Why RentBack",
        why: [
          {
            title: "Secure",
            desc: "Built with licensed payment partners.",
            icon: Shield,
          },
          {
            title: "Rewarding",
            desc: "Your biggest expense finally gives back.",
            icon: Gift,
          },
          { title: "Simple", desc: "No extra steps or hidden fees.", icon: Zap },
        ],
        footerNote:
          "RentBack is preparing an application to the State Bank of Pakistan Regulatory Sandbox. Rewards subject to terms.",
        emailPh: "Email",
        waPh: "Phone number",
        cityPh: "City",
        consent:
          "I agree to receive occasional updates, including on WhatsApp if I provided a number.",
        submit: "Notify me",
        languageLabel: "EN",
        successTitle: "You are in!",
        successBody:
          "We will email you early app access as we open city by city in Pakistan.",
        policy: {
          privacy: "Privacy",
          terms: "Terms",
          rewards: "Rewards T&Cs",
          trust: "Trust & Security",
        },
        statusOperational: "Waiting approval",
        viewStatus: "View status",
        founderLabel: "Founder",
        cookieLabel: "Cookie preferences",
        cookieTitle: "Cookie preferences",
        cookieDesc:
          "Choose whether to allow anonymous analytics to help improve RentBack.",
        cookieNecessary: "Strictly necessary (always on)",
        cookieAnalytics: "Analytics (anonymous usage)",
        cookieSave: "Save",
        trustTitle: "Trust & Security",
        trustPoints: [
          "Encryption in transit and least-privilege access controls.",
          "Payments handled by licensed PSO/PSP/EMI; we do not store full card details.",
          "Minimal retention; delete on request subject to legal requirements.",
          "Upcoming: 2FA, device binding, audit logging.",
          "Report a vulnerability: help@rentback.app.",
          "Status page & transparent incident reporting.",
        ],
      },
      ur: {
        metaTagline: "پورے پاکستان میں",
        heroTitle: "اپنے کرائے کو انعامات میں بدلیں۔",
        heroSub:
          "ہم RentBack ایپ بنا رہے ہیں۔ ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے ادائیگی کریں۔ پوائنٹس کمائیں اور بلز و شاپنگ پر ریڈیم کریں۔ ایپ ویٹ لسٹ میں شامل ہوں۔",
        cta: "ایپ ویٹ لسٹ میں شامل ہوں",
        howTitle: "طریقہ کار",
        how: [
          {
            title: "کرایہ ادا کریں",
            desc:
              "ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک — جو چاہیں استعمال کریں۔",
          },
          { title: "پوائنٹس کمائیں", desc: "ہر تصدیق شدہ ادائیگی پر فوری پوائنٹس۔" },
          { title: "انعام حاصل کریں", desc: "موبائل ٹاپ اپ، یوٹیلیٹی بلز، واؤچرز۔" },
        ],
        whyTitle: "کیوں رینٹ بیک؟",
        why: [
          {
            title: "محفوظ",
            desc: "لائسنس یافتہ ادائیگی پارٹنرز کے ساتھ بنایا گیا۔",
            icon: Shield,
          },
          {
            title: "فائدہ مند",
            desc: "آپ کا سب سے بڑا خرچہ اب واپس دے۔",
            icon: Gift,
          },
          { title: "آسان", desc: "کوئی اضافی مرحلہ یا چُھپی فیس نہیں۔", icon: Zap },
        ],
        footerNote:
          "رینٹ بیک اسٹیٹ بینک آف پاکستان کے ریگولیٹری سینڈ باکس کے لیے درخواست کی تیاری کر رہا ہے۔ ریوارڈز شرائط کے تابع ہیں۔",
        emailPh: "ای میل",
        waPh: "فون نمبر",
        cityPh: "شہر",
        consent:
          "میں رضامند ہوں کہ وقتاً فوقتاً اپ ڈیٹس موصول کروں — اگر نمبر دیا ہے تو واٹس ایپ پر بھی۔",
        submit: "مجھے اطلاع دیں",
        successTitle: "آپ شامل ہو چکے ہیں!",
        successBody:
          "ہم جیسے جیسے شہروں میں لانچ کریں گے، آپ کو ایپ کا ابتدائی رسائی ای میل کریں گے۔",
        policy: {
          privacy: "پرائیویسی",
          terms: "شرائط",
          rewards: "ریوارڈز کی شرائط",
          trust: "اعتماد اور سکیورٹی",
        },
        statusOperational: "منظوری کا انتظار",
        viewStatus: "اسٹیٹس دیکھیں",
        founderLabel: "بانی",
        cookieLabel: "کوکی ترجیحات",
        cookieTitle: "کوکی ترجیحات",
        cookieDesc:
          "منتخب کریں کہ کیا آپ گمنام اینالیٹکس کی اجازت دیتے ہیں تاکہ RentBack بہتر ہو سکے۔",
        cookieNecessary: "لازمی (ہمیشہ فعال)",
        cookieAnalytics: "تجزیات (گمنام استعمال)",
        cookieSave: "محفوظ کریں",
        trustTitle: "اعتماد اور سکیورٹی",
        trustPoints: [
          "ترسیل کے دوران انکرپشن اور محدود رسائی کنٹرولز۔",
          "ادائیگیاں لائسنس یافتہ PSO/PSP/EMI سنبھالتے ہیں؛ ہم مکمل کارڈ تفصیل محفوظ نہیں کرتے۔",
          "کم سے کم مدت کے لیے ڈیٹا رکھنا؛ قانون کے مطابق حذف کی درخواست ممکن۔",
          "جلد: 2FA، ڈیوائس بائنڈنگ، آڈٹ لاگنگ۔",
          "کمزوری رپورٹ کریں: help@rentback.app.",
          "اسٹیٹس پیج اور شفاف انسیڈنٹ رپورٹنگ۔",
        ],
        languageLabel: "اردو",
      },
    }),
    [lang]
  );

  const t = copy[lang];

  // SEO/OG/Twitter + favicons, and meta theme-color tied to darkMode
  const SEO: React.FC = () => {
    useEffect(() => {
      const isUr = lang === "ur";
      const title = isUr
        ? "RentBack — اپنے کرائے کو انعامات میں بدلیں"
        : "RentBack — Turn your rent into rewards";
      const description = isUr
        ? "ہم RentBack ایپ بنا رہے ہیں: ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے ادائیگی کریں، پوائنٹس کمائیں، بلز/شاپنگ پر ریڈیم کریں۔ ویٹ لسٹ میں شامل ہوں۔"
        : "We are building the RentBack app: pay by our card, your bank, or any digital bank; earn points, redeem for bills & shopping. Join the app waitlist.";

      // Canonical + OG image
      let canonical = "https://rentback.app/";
      try {
        if (
          typeof window !== "undefined" &&
          window.location &&
          /^https?:/i.test(window.location.href)
        ) {
          canonical = window.location.href.split("#")[0];
        }
      } catch {}

      let ogImage = "https://rentback.app/og.png";
      try {
        if (
          typeof window !== "undefined" &&
          window.location &&
          /^https?:/i.test(window.location.href)
        ) {
          const origin = window.location.origin || "";
          ogImage = origin ? origin + "/og.png" : "https://rentback.app/og.png";
        }
      } catch {}

      const upsert = (selector: string, create: () => HTMLElement) => {
        let el = document.head.querySelector(selector) as HTMLElement | null;
        if (!el) {
          el = create();
          document.head.appendChild(el);
        }
        return el;
      };

      const setMetaName = (name: string, content: string, id?: string) => {
        const el = upsert(id ? `meta#${id}` : `meta[name="${name}"]`, () => {
          const m = document.createElement("meta");
          if (id) m.id = id;
          else m.setAttribute("name", name);
          return m;
        });
        el.setAttribute("content", content);
        if (!id) el.setAttribute("name", name);
      };

      const setMetaProp = (prop: string, content: string, id?: string) => {
        const el = upsert(id ? `meta#${id}` : `meta[property="${prop}"]`, () => {
          const m = document.createElement("meta");
          if (id) m.id = id;
          else m.setAttribute("property", prop);
          return m;
        });
        el.setAttribute("content", content);
        if (!id) el.setAttribute("property", prop);
      };

      const setLink = (
        rel: string,
        href: string,
        id: string,
        type?: string,
        sizes?: string
      ) => {
        const el = upsert(`link#${id}`, () => {
          const l = document.createElement("link");
          l.id = id;
          return l;
        });
        el.setAttribute("rel", rel);
        el.setAttribute("href", href);
        if (type) el.setAttribute("type", type);
        else el.removeAttribute("type");
        if (sizes) el.setAttribute("sizes", sizes);
        else el.removeAttribute("sizes");
      };

      // Title & description
      document.title = title;
      setMetaName("description", description, "rb-desc");

      // Language / locale metas
      setMetaName("content-language", isUr ? "ur-PK" : "en-PK", "rb-lang");
      setMetaProp("og:locale", isUr ? "ur_PK" : "en_PK", "rb-og-locale");

      // Canonical
      setLink("canonical", canonical, "rb-canonical");

      // Open Graph
      setMetaProp("og:title", title, "rb-og-title");
      setMetaProp("og:description", description, "rb-og-desc");
      setMetaProp("og:type", "website", "rb-og-type");
      setMetaProp("og:url", canonical, "rb-og-url");
      setMetaProp("og:image", ogImage, "rb-og-img");

      // Twitter Card
      setMetaName("twitter:card", "summary_large_image", "rb-tw-card");
      setMetaName("twitter:title", title, "rb-tw-title");
      setMetaName("twitter:description", description, "rb-tw-desc");
      setMetaName("twitter:image", ogImage, "rb-tw-img");

      // Favicons
      setLink("icon", "/favicon.svg", "rb-ico-svg", "image/svg+xml");
      setLink("icon", "/favicon-32.png", "rb-ico-32", "image/png", "32x32");
      setLink("icon", "/favicon-16.png", "rb-ico-16", "image/png", "16x16");
      setLink("apple-touch-icon", "/apple-touch-icon.png", "rb-apple");
      setLink("mask-icon", "/safari-pinned-tab.svg", "rb-mask", "image/svg+xml");

      // Theme color (match system)
      setMetaName("theme-color", darkMode ? "#0a0a0a" : "#ffffff", "rb-theme");

      // JSON-LD (Organization + WebSite)
      const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "RentBack",
        url: canonical,
        logo: "/favicon.svg",
      };
      const site = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "RentBack",
        url: canonical,
      };
      const ld = upsert("script#rb-ldjson", () => {
        const s = document.createElement("script");
        s.id = "rb-ldjson";
        s.type = "application/ld+json";
        return s;
      });
      (ld as HTMLScriptElement).textContent = JSON.stringify([org, site]);
    }, [lang, darkMode]);
    return null;
  };

  // Open printable legal page in new tab (simple HTML)
  const openStandalone = (kind: "privacy" | "terms" | "rewards") => {
    try {
      track("legal_open_full", { doc: kind });
      const title =
        lang === "ur"
          ? kind === "privacy"
            ? "پرائیویسی پالیسی"
            : kind === "terms"
            ? "شرائطِ استعمال"
            : "ریوارڈز کی شرائط"
          : kind === "privacy"
          ? "Privacy Policy"
          : kind === "terms"
          ? "Terms of Service"
          : "Rewards Terms & Conditions";
      const d = new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const bodyEn =
        kind === "privacy"
          ? "We handle your information under Pakistani law and relevant SBP directives."
          : kind === "terms"
          ? "These terms govern your use of the app and website in Pakistan."
          : "Points are not cash and redeem only for listed rewards.";
      const bodyUr =
        kind === "privacy"
          ? "ہم آپ کی معلومات کو پاکستانی قوانین اور SBP ہدایات کے مطابق سنبھالتے ہیں۔"
          : kind === "terms"
          ? "یہ شرائط پاکستان میں ایپ اور ویب کے استعمال پر لاگو ہیں۔"
          : "پوائنٹس نقد نہیں ہوتے اور صرف درج شدہ انعامات پر ریڈیم ہوتے ہیں۔";
      const content =
        "<!doctype html>" +
        '<html lang="' +
        (lang === "ur" ? "ur" : "en") +
        '"><head>' +
        '<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>' +
        "<title>" +
        title +
        " — RentBack</title>" +
        '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Noto Nastaliq Urdu",sans-serif;line-height:1.6;margin:2rem;max-width:840px}h1{font-size:1.4rem;margin-bottom:.25rem}.muted{color:#555}</style>' +
        "</head><body><h1>" +
        title +
        '</h1><div class="muted">Last updated: ' +
        d +
        "</div><p>" +
        (lang === "ur" ? bodyUr : bodyEn) +
        "</p></body></html>";
      const w = window.open("", "_blank", "noopener,noreferrer");
      if (!w) return;
      w.document.open();
      w.document.write(content);
      w.document.close();
    } catch (e) {
      console.error(e);
    }
  };

  // Analytics helper (safe no-op)
  const track = (event: string, props?: Record<string, any>) => {
    try {
      if (
        cookiePrefs?.analytics &&
        typeof window !== "undefined" &&
        (window as any).plausible
      ) {
        (window as any).plausible(event, { props });
      }
      console.log("[analytics]", event, props);
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    // Trim inputs
    const em = email.trim();
    const wv = wa.trim();
    const cc = city.trim();
    if (em !== email) setEmail(em);
    if (wv !== wa) setWa(wv);
    if (cc !== city) setCity(cc);

    // Simple rate-limit (3s)
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) {
      setError(
        lang === "ur"
          ? "براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں۔"
          : "Please wait a moment before submitting again."
      );
      setLoading(false);
      return;
    }
    lastSubmitRef.current = now;

    // Honeypot + time-to-fill heuristic
    const hpVal = hpRef.current?.value || "";
    const timeSinceOpen = now - startRef.current;
    const looksLikeBot = hpVal.length > 0 || timeSinceOpen < 1000;

    // Validate
    const errs = validateNow(em, wv);
    setTouched({ email: true, wa: true, city: true });
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      track("form_validation_error", { fields: Object.keys(errs) });
      const firstId = errs.email ? "rb-email" : errs.wa ? "rb-wa" : undefined;
      if (firstId) document.getElementById(firstId)?.focus();
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        (typeof window !== "undefined" && (window as any).RB_WAITLIST_ENDPOINT) ||
        _WAITLIST_ENDPOINT;
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      let utmSource = "",
        utmMedium = "",
        utmCampaign = "";
      try {
        const params =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search)
            : null;
        if (params) {
          utmSource = params.get("utm_source") || "";
          utmMedium = params.get("utm_medium") || "";
          utmCampaign = params.get("utm_campaign") || "";
        }
      } catch {}

      if (endpoint) {
        const payload = {
          table: "waitlist", // ensure unified Apps Script routes to Waitlist tab
          email: em,
          phone: wv,
          city: cc,
          lang,
          theme: darkMode ? "dark" : "light",
          utmSource,
          utmMedium,
          utmCampaign,
          analytics: Boolean(cookiePrefs?.analytics),
          bot: looksLikeBot,
          ua,
          ts: new Date().toISOString(),
          key: _WAITLIST_SECRET || undefined,
        } as const;
        try {
          await fetch(endpoint, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch {}
      } else {
        await new Promise((r) => setTimeout(r, looksLikeBot ? 200 : 500));
      }
      setSubmitted(true);
      track("signup_submitted", {
        lang,
        hasWa: Boolean(wv),
        city: cc,
        source: "landing",
        bot: looksLikeBot,
      });
    } catch (err) {
      console.error(err);
      setError(
        lang === "ur"
          ? "عارضی مسئلہ۔ براہ کرم دوبارہ کوشش کریں۔"
          : "Temporary issue. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: "easeOut" },
  } as const;
  const floatIn = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.55, ease: "easeOut" },
  } as const;

  // Tiny runtime checks
  useEffect(() => {
    try {
      console.assert(!!document.getElementById("rb-email"), "TEST: email field exists");
      console.assert(!!document.getElementById("rb-wa"), "TEST: phone field exists");
      console.assert(!!document.querySelector('a[href="#privacy"]'), "TEST: privacy link exists");
      console.assert(/^(?:[+]92)?0?3[0-9]{9}$/.test("+923001234567"), "TEST: pk phone regex works (+92...)");
      console.assert(/^(?:[+]92)?0?3[0-9]{9}$/.test("03001234567"), "TEST: pk phone regex works (03...)");
      console.assert(!!document.getElementById("rb-join-form"), "TEST: join form exists");
    } catch {}
  }, []);

  return (
    <>
      {/* Ensure the endpoint is available before hydration */}
      <Script id="rb-waitlist" strategy="beforeInteractive">
        {`window.RB_WAITLIST_ENDPOINT="${FALLBACK_WAITLIST_ENDPOINT}";window.RB_WAITLIST_SECRET="";`}
      </Script>

      <div className={darkMode ? "dark" : ""} dir={dir}>
        <SEO />
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded-xl px-3 py-2 bg-emerald-600 text-white shadow focus:outline-none"
        >
          {lang === "ur" ? "مواد پر جائیں" : "Skip to content"}
        </a>
        {/* Global focus-visible ring for accessibility */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #10b981;outline-offset:2px}",
          }}
        />
        <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
          {/* Header (CLEAN) */}
          <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 border-b border-black/5 dark:border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-6 text-emerald-600 dark:text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 11.5L12 4l9 7.5" />
                  <path d="M5 10v9h14v-9" />
                </svg>
                <span className="font-semibold">RentBack</span>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-300/20 dark:text-amber-300">
                  {t.statusOperational}
                </span>
              </div>
              <div />
            </div>
          </header>

          {/* Hero */}
          <main id="main">
            {/* … the rest of your component JSX remains identical … */}
            {/* I’ve intentionally left all content below unchanged to avoid regressions. */}
            {/* ======= COPY EVERYTHING FROM YOUR ORIGINAL RETURN AFTER <main id="main"> DOWN TO THE CLOSING TAGS ======= */}
          </main>

          {/* Footer / Modals — unchanged */}
        </div>
      </div>
    </>
  );
}
