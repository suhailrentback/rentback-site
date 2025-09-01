use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Languages, Moon, Sun, Shield, Gift, Zap } from "lucide-react";

// RentBack Landing Page — stable & wired to Google Sheets (Apps Script)
//  - Dark/Light mode + EN/UR toggle
//  - Header + Footer legal links, Founder & Cookie modals
//  - Consent-based analytics (Plausible)
//  - Phone normalizer (PK) + inline validation
//  - Waitlist form posts to window.RB_WAITLIST_ENDPOINT (optional SECRET)

export default function RentBackLanding() {
  // Optional globals injected via a <script> tag
  // window.RB_WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/XXXXX/exec'
  // window.RB_WAITLIST_SECRET = 'your-shared-secret'
  const FALLBACK_WAITLIST_ENDPOINT = 'https://script.google.com/a/macros/hearthyfoods.com/s/AKfycbw7CbAIzQZZSLP37YEmRQA5ySu-Z-J9Obizt8HEDWvP0gbN_FHPyqe1wrW8ejihVy6lQg/exec' as const;
  const _WAITLIST_ENDPOINT = (typeof window !== 'undefined' && (window as any).RB_WAITLIST_ENDPOINT) || FALLBACK_WAITLIST_ENDPOINT;
  const _WAITLIST_SECRET = (typeof window !== 'undefined' && (window as any).RB_WAITLIST_SECRET) || '';

  // Expose the resolved endpoint back to window for quick manual checks
  useEffect(() => { try { (window as any).RB_WAITLIST_ENDPOINT = _WAITLIST_ENDPOINT; } catch {} }, []);

  const [lang, setLang] = useState<'en' | 'ur'>('en');
  const [darkMode, setDarkMode] = useState(false);

  // Ensure dark mode works regardless of where the `.dark` class is expected
  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('rb-theme') : null;
      const initial = saved ? saved === 'dark' : false; // manual toggle only
      setDarkMode(initial);
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        const body = document.body;
        root.classList.toggle('dark', initial);
        if (body) body.classList.toggle('dark', initial);
        (root as HTMLElement).style.colorScheme = initial ? 'dark' : 'light';
      }
    } catch {}
  }, []);

  // Reflect darkMode to <html> & <body> and persist
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        const body = document.body;
        root.classList.toggle('dark', darkMode);
        if (body) body.classList.toggle('dark', darkMode);
        (root as HTMLElement).style.colorScheme = darkMode ? 'dark' : 'light';
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('rb-theme', darkMode ? 'dark' : 'light');
      }
    } catch {}
  }, [darkMode]);

  // Reflect language and direction on <html>
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
      root.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    } catch {}
  }, [lang]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [wa, setWa] = useState('');
  const [city, setCity] = useState("");

  // ---- Form UX niceties: inline validation ----
  type FieldErrors = { email?: string; wa?: string };
  const [touched, setTouched] = useState<{ email: boolean; wa: boolean; city: boolean }>({ email: false, wa: false, city: false });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const messages = useMemo(() => ({
    en: {
      emailReq: "Please enter a valid email address.",
      waReq: "Please enter your phone number.",
      waInvalid: "Enter a Pakistani mobile like 03001234567 or +923001234567.",
    },
    ur: {
      emailReq: "براہِ کرم درست ای میل درج کریں۔",
      waReq: "براہِ کرم اپنا فون نمبر درج کریں۔",
      waInvalid: "پاکستانی موبائل نمبر لکھیں: 03001234567 یا +923001234567",
    },
  }), []);

  const validateNow = (em: string, w: string): FieldErrors => {
    const errs: FieldErrors = {};
    const emailOk = /.+@.+\\..+/.test(em.trim());
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

  const [openLegal, setOpenLegal] = useState<null | 'privacy' | 'terms' | 'rewards'>(null);
  const [openFounder, setOpenFounder] = useState(false);
  const [openCookies, setOpenCookies] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState<{ analytics: boolean } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const [bgReady, setBgReady] = useState(false);
  const [footerLegalOpen, setFooterLegalOpen] = useState(false);
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLDivElement | null>(null);
  // Anti-spam helpers
  const hpRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<number>(Date.now());
  const lastSubmitRef = useRef<number>(0);

  // --- Phone input helper: normalize Pakistani numbers while typing ---
  const normalizePkPhone = (raw: string): string => {
    // Force international format: +923XXXXXXXXX (PK mobile)
    let s = (raw || '')
      .split('')
      .filter(ch => (ch >= '0' && ch <= '9') || ch === '+')
      .join('');
    // Collapse multiple '+' to a single leading plus
    if (s.startsWith('+')) s = '+' + s.slice(1).split('').filter(ch => ch !== '+').join('');
    else s = s.split('').filter(ch => ch !== '+').join('');

    // Normalize common prefixes
    if (s.startsWith('00')) s = '+' + s.slice(2); // 0092.. -> +92..
    if (s.startsWith('92')) s = '+92' + s.slice(2); // 92.. -> +92..

    // Extract digits only
    const digits = s.split('').filter(ch => ch >= '0' && ch <= '9').join('');

    // Already international
    if (s.startsWith('+92')) return ('+92' + digits.slice(2)).slice(0, 13);

    // Local -> international
    if (digits.length >= 11 && digits[0] === '0' && digits[1] === '3') return '+92' + digits.slice(1, 11);
    if (digits.length === 10 && digits[0] === '3') return '+92' + digits.slice(0, 10);

    // Fallback: build +92 + 10 digits (strip leading zeros)
    let ten = digits;
    while (ten.startsWith('0')) ten = ten.slice(1);
    ten = ten.slice(0, 10);
    return '+92' + ten;
  };

  // Paste handler to normalize clipboard text for phone
  useEffect(() => {
    const el = document.getElementById('rb-wa') as HTMLInputElement | null;
    if (!el) return;
    const onPaste = (e: ClipboardEvent) => {
      try {
        e.preventDefault();
        const txt = (e.clipboardData && e.clipboardData.getData('text')) || '';
        setWa(normalizePkPhone(txt));
      } catch {}
    };
    el.addEventListener('paste', onPaste as any);
    return () => el.removeEventListener('paste', onPaste as any);
  }, []);

  const dir: 'ltr' | 'rtl' = lang === 'ur' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setBgReady(true), 200);
    return () => clearTimeout(t);
  }, [reduce]);

  // Load cookie preferences
  useEffect(() => {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('rb-cookies') : null;
      if (raw) setCookiePrefs(JSON.parse(raw)); else setCookiePrefs({ analytics: false });
    } catch { setCookiePrefs({ analytics: false }); }
  }, []);

  // Analytics loader (consent-based)
  useEffect(() => {
    try {
      const head = document.head;
      const hasConsent = Boolean(cookiePrefs?.analytics);
      const preId = 'rb-preconnect-plausible';
      const scrId = 'rb-plausible';
      if (hasConsent) {
        if (head && !document.getElementById(preId)) {
          const pre = document.createElement('link');
          pre.id = preId;
          pre.rel = 'preconnect';
          pre.href = 'https://plausible.io';
          pre.crossOrigin = 'anonymous';
          head.appendChild(pre);
        }
        if (head && !document.getElementById(scrId)) {
          const s = document.createElement('script');
          s.id = scrId;
          s.defer = true;
          s.setAttribute('data-domain', 'rentback.app');
          s.src = 'https://plausible.io/js/plausible.js';
          head.appendChild(s);
        }
      } else {
        document.getElementById(preId)?.remove?.();
        document.getElementById(scrId)?.remove?.();
        try { delete (window as any).plausible; } catch {}
      }
    } catch {}
  }, [cookiePrefs?.analytics]);

  // Modal a11y: focus trap, ESC-to-close, and restore focus
  useEffect(() => {
    const anyOpen = Boolean(openLegal || openFounder || openCookies);
    if (!anyOpen) return;

    const closeAll = () => { setOpenLegal(null); setOpenFounder(false); setOpenCookies(false); };

    try {
      prevFocusRef.current = (document.activeElement as HTMLElement) || null;
      const container = modalRef.current;
      const selector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const nodeList = container ? (container.querySelectorAll(selector) as NodeListOf<HTMLElement>) : null;
      const focusables = nodeList ? Array.from(nodeList).filter(el => !el.hasAttribute('disabled')) : [];
      (focusables[0] || container)?.focus?.();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') { e.preventDefault(); closeAll(); return; }
        if (e.key === 'Tab' && container && focusables.length) {
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement as HTMLElement | null;
          if (e.shiftKey) {
            if (!active || active === first || !container.contains(active)) { e.preventDefault(); last.focus(); }
          } else {
            if (!active || active === last || !container.contains(active)) { e.preventDefault(); first.focus(); }
          }
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        try { prevFocusRef.current?.focus?.(); } catch {}
      };
    } catch {}
  }, [openLegal, openFounder, openCookies]);

  const copy = useMemo(() => ({
    en: {
      metaTagline: 'Pakistan-wide',
      heroTitle: 'Turn your rent into rewards.',
      heroSub: 'We are building the RentBack app. Pay by our card, your bank, or any digital bank. Earn points and redeem for bills and shopping. Join the app waitlist for early access.',
      cta: 'Join the app waitlist',
      howTitle: 'How it works',
      how: [
        { title: 'Pay rent', desc: 'Use your preferred method: our card, your bank, or any digital bank.' },
        { title: 'Earn points', desc: 'Instant points on every verified payment.' },
        { title: 'Redeem rewards', desc: 'Mobile top-ups, utility bills, shopping vouchers.' },
      ],
      whyTitle: 'Why RentBack',
      why: [
        { title: 'Secure', desc: 'Built with licensed payment partners.', icon: Shield },
        { title: 'Rewarding', desc: 'Your biggest expense finally gives back.', icon: Gift },
        { title: 'Simple', desc: 'No extra steps or hidden fees.', icon: Zap },
      ],
      footerNote: 'RentBack is preparing an application to the State Bank of Pakistan Regulatory Sandbox. Rewards subject to terms.',
      emailPh: 'Email',
      waPh: 'Phone number',
      cityPh: 'City',
      consent: 'I agree to receive occasional updates, including on WhatsApp if I provided a number.',
      submit: 'Notify me',
      languageLabel: 'EN',
      successTitle: 'You are in!',
      successBody: 'We will email you early app access as we open city by city in Pakistan.',
      policy: { privacy: 'Privacy', terms: 'Terms', rewards: 'Rewards T&Cs', trust: 'Trust & Security' },
      statusOperational: 'Waiting approval',
      viewStatus: 'View status',
      founderLabel: 'Founder',
      cookieLabel: 'Cookie preferences',
      cookieTitle: 'Cookie preferences',
      cookieDesc: 'Choose whether to allow anonymous analytics to help improve RentBack.',
      cookieNecessary: 'Strictly necessary (always on)',
      cookieAnalytics: 'Analytics (anonymous usage)',
      cookieSave: 'Save',
      trustTitle: 'Trust & Security',
      trustPoints: [
        'Encryption in transit and least-privilege access controls.',
        'Payments handled by licensed PSO/PSP/EMI; we do not store full card details.',
        'Minimal retention; delete on request subject to legal requirements.',
        'Upcoming: 2FA, device binding, audit logging.',
        'Report a vulnerability: help@rentback.app.',
        'Status page & transparent incident reporting.',
      ],
    },
    ur: {
      metaTagline: 'پورے پاکستان میں',
      heroTitle: 'اپنے کرائے کو انعامات میں بدلیں۔',
      heroSub: 'ہم RentBack ایپ بنا رہے ہیں۔ ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے ادائیگی کریں۔ پوائنٹس کمائیں اور بلز و شاپنگ پر ریڈیم کریں۔ ایپ ویٹ لسٹ میں شامل ہوں۔',
      cta: 'ایپ ویٹ لسٹ میں شامل ہوں',
      howTitle: 'طریقہ کار',
      how: [
        { title: 'کرایہ ادا کریں', desc: 'ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک — جو چاہیں استعمال کریں۔' },
        { title: 'پوائنٹس کمائیں', desc: 'ہر تصدیق شدہ ادائیگی پر فوری پوائنٹس۔' },
        { title: 'انعام حاصل کریں', desc: 'موبائل ٹاپ اپ، یوٹیلیٹی بلز، واؤچرز۔' },
      ],
      whyTitle: 'کیوں رینٹ بیک؟',
      why: [
        { title: 'محفوظ', desc: 'لائسنس یافتہ ادائیگی پارٹنرز کے ساتھ بنایا گیا۔', icon: Shield },
        { title: 'فائدہ مند', desc: 'آپ کا سب سے بڑا خرچہ اب واپس دے۔', icon: Gift },
        { title: 'آسان', desc: 'کوئی اضافی مرحلہ یا چُھپی فیس نہیں۔', icon: Zap },
      ],
      footerNote: 'رینٹ بیک اسٹیٹ بینک آف پاکستان کے ریگولیٹری سینڈ باکس کے لیے درخواست کی تیاری کر رہا ہے۔ ریوارڈز شرائط کے تابع ہیں۔',
      emailPh: 'ای میل',
      waPh: 'فون نمبر',
      cityPh: 'شہر',
      consent: 'میں رضامند ہوں کہ وقتاً فوقتاً اپ ڈیٹس موصول کروں — اگر نمبر دیا ہے تو واٹس ایپ پر بھی۔',
      submit: 'مجھے اطلاع دیں',
      languageLabel: 'اردو',
      successTitle: 'آپ شامل ہو چکے ہیں!',
      successBody: 'ہم جیسے جیسے شہروں میں لانچ کریں گے، آپ کو ایپ کا ابتدائی رسائی ای میل کریں گے۔',
      policy: { privacy: 'پرائیویسی', terms: 'شرائط', rewards: 'ریوارڈز کی شرائط', trust: 'اعتماد اور سکیورٹی' },
      statusOperational: 'منظوری کا انتظار',
      viewStatus: 'اسٹیٹس دیکھیں',
      founderLabel: 'بانی',
      cookieLabel: 'کوکی ترجیحات',
      cookieTitle: 'کوکی ترجیحات',
      cookieDesc: 'منتخب کریں کہ کیا آپ گمنام اینالیٹکس کی اجازت دیتے ہیں تاکہ RentBack بہتر ہو سکے۔',
      cookieNecessary: 'لازمی (ہمیشہ فعال)',
      cookieAnalytics: 'تجزیات (گمنام استعمال)',
      cookieSave: 'محفوظ کریں',
      trustTitle: 'اعتماد اور سکیورٹی',
      trustPoints: [
        'ترسیل کے دوران انکرپشن اور محدود رسائی کنٹرولز۔',
        'ادائیگیاں لائسنس یافتہ PSO/PSP/EMI سنبھالتے ہیں؛ ہم مکمل کارڈ تفصیل محفوظ نہیں کرتے۔',
        'کم سے کم مدت کے لیے ڈیٹا رکھنا؛ قانون کے مطابق حذف کی درخواست ممکن۔',
        'جلد: 2FA، ڈیوائس بائنڈنگ، آڈٹ لاگنگ۔',
        'کمزوری رپورٹ کریں: help@rentback.app.',
        'اسٹیٹس پیج اور شفاف انسیڈنٹ رپورٹنگ۔',
      ],
    },
  }), [lang]);

  const t = copy[lang];

  // SEO/OG/Twitter tags + favicons
  const SEO: React.FC = () => {
    useEffect(() => {
      const isUr = lang === 'ur';
      const title = isUr ? 'RentBack — اپنے کرائے کو انعامات میں بدلیں' : 'RentBack — Turn your rent into rewards';
      const description = isUr
        ? 'ہم RentBack ایپ بنا رہے ہیں: ہمارے کارڈ، آپ کے بینک یا کسی بھی ڈیجیٹل بینک سے ادائیگی کریں، پوائنٹس کمائیں، بلز/شاپنگ پر ریڈیم کریں۔ ویٹ لسٹ میں شامل ہوں۔'
        : 'We are building the RentBack app: pay by our card, your bank, or any digital bank; earn points, redeem for bills & shopping. Join the app waitlist.';

      // Canonical + OG image
      let canonical = 'https://rentback.app/';
      try {
        if (typeof window !== 'undefined' && window.location && /^https?:/i.test(window.location.href)) {
          canonical = window.location.href.split('#')[0];
        }
      } catch {}

      let ogImage = 'https://rentback.app/og.png';
      try {
        if (typeof window !== 'undefined' && window.location && /^https?:/i.test(window.location.href)) {
          const origin = window.location.origin || '';
          ogImage = origin ? origin + '/og.png' : 'https://rentback.app/og.png';
        }
      } catch {}

      const upsert = (selector: string, create: () => HTMLElement) => {
        let el = document.head.querySelector(selector) as HTMLElement | null;
        if (!el) { el = create(); document.head.appendChild(el); }
        return el;
      };

      const setMetaName = (name: string, content: string, id?: string) => {
        const el = upsert(id ? `meta#${id}` : `meta[name="${name}"]`, () => {
          const m = document.createElement('meta');
          if (id) m.id = id; else m.setAttribute('name', name);
          return m;
        });
        el.setAttribute('content', content);
        if (!id) el.setAttribute('name', name);
      };

      const setMetaProp = (prop: string, content: string, id?: string) => {
        const el = upsert(id ? `meta#${id}` : `meta[property="${prop}"]`, () => {
          const m = document.createElement('meta');
          if (id) m.id = id; else m.setAttribute('property', prop);
          return m;
        });
        el.setAttribute('content', content);
        if (!id) el.setAttribute('property', prop);
      };

      const setLink = (rel: string, href: string, id: string, type?: string, sizes?: string) => {
        const el = upsert(`link#${id}`, () => { const l = document.createElement('link'); l.id = id; return l; });
        el.setAttribute('rel', rel);
        el.setAttribute('href', href);
        if (type) el.setAttribute('type', type); else el.removeAttribute('type');
        if (sizes) el.setAttribute('sizes', sizes); else el.removeAttribute('sizes');
      };

      // Title & description
      document.title = title;
      setMetaName('description', description, 'rb-desc');

      // Language / locale metas
      setMetaName('content-language', isUr ? 'ur-PK' : 'en-PK', 'rb-lang');
      setMetaProp('og:locale', isUr ? 'ur_PK' : 'en_PK', 'rb-og-locale');

      // Canonical
      setLink('canonical', canonical, 'rb-canonical');

      // Open Graph
      setMetaProp('og:title', title, 'rb-og-title');
      setMetaProp('og:description', description, 'rb-og-desc');
      setMetaProp('og:type', 'website', 'rb-og-type');
      setMetaProp('og:url', canonical, 'rb-og-url');
      setMetaProp('og:image', ogImage, 'rb-og-img');

      // Twitter Card
      setMetaName('twitter:card', 'summary_large_image', 'rb-tw-card');
      setMetaName('twitter:title', title, 'rb-tw-title');
      setMetaName('twitter:description', description, 'rb-tw-desc');
      setMetaName('twitter:image', ogImage, 'rb-tw-img');

      // Favicons
      setLink('icon', '/favicon.svg', 'rb-ico-svg', 'image/svg+xml');
      setLink('icon', '/favicon-32.png', 'rb-ico-32', 'image/png', '32x32');
      setLink('icon', '/favicon-16.png', 'rb-ico-16', 'image/png', '16x16');
      setLink('apple-touch-icon', '/apple-touch-icon.png', 'rb-apple');
      setLink('mask-icon', '/safari-pinned-tab.svg', 'rb-mask', 'image/svg+xml');

      // Theme color (match light/dark)
      setMetaName('theme-color', darkMode ? '#0a0a0a' : '#ffffff', 'rb-theme');

      // JSON-LD (Organization + WebSite)
      const org = {
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'RentBack', url: canonical, logo: '/favicon.svg'
      };
      const site = {
        '@context': 'https://schema.org', '@type': 'WebSite',
        name: 'RentBack', url: canonical,
      };
      const ld = upsert('script#rb-ldjson', () => { const s = document.createElement('script'); s.id = 'rb-ldjson'; s.type = 'application/ld+json'; return s; });
      (ld as HTMLScriptElement).textContent = JSON.stringify([org, site]);
    }, [lang, darkMode]);
    return null;
  };

  // Open printable legal page in new tab (simple HTML)
  const openStandalone = (kind: 'privacy'|'terms'|'rewards') => {
    try {
      track('legal_open_full', { doc: kind });
      const title = lang === 'ur'
        ? (kind === 'privacy' ? 'پرائیویسی پالیسی' : kind === 'terms' ? 'شرائطِ استعمال' : 'ریوارڈز کی شرائط')
        : (kind === 'privacy' ? 'Privacy Policy' : kind === 'terms' ? 'Terms of Service' : 'Rewards Terms & Conditions');
      const d = new Date().toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
      const bodyEn =
        kind === 'privacy' ?
          'We handle your information under Pakistani law and relevant SBP directives.' :
        kind === 'terms' ?
          'These terms govern your use of the app and website in Pakistan.' :
          'Points are not cash and redeem only for listed rewards.';
      const bodyUr =
        kind === 'privacy' ?
          'ہم آپ کی معلومات کو پاکستانی قوانین اور SBP ہدایات کے مطابق سنبھالتے ہیں۔' :
        kind === 'terms' ?
          'یہ شرائط پاکستان میں ایپ اور ویب کے استعمال پر لاگو ہیں۔' :
          'پوائنٹس نقد نہیں ہوتے اور صرف درج شدہ انعامات پر ریڈیم ہوتے ہیں۔';
      const content = '<!doctype html>' +
        '<html lang="' + (lang === 'ur' ? 'ur' : 'en') + '"><head>' +
        '<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>' +
        '<title>' + title + ' — RentBack</title>' +
        '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,"Noto Nastaliq Urdu",sans-serif;line-height:1.6;margin:2rem;max-width:840px}h1{font-size:1.4rem;margin-bottom:.25rem}.muted{color:#555}</style>' +
        '</head><body><h1>' + title + '</h1><div class="muted">Last updated: ' + d + '</div><p>' + (lang === 'ur' ? bodyUr : bodyEn) + '</p></body></html>';
      const w = window.open('', '_blank', 'noopener,noreferrer');
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
      if (cookiePrefs?.analytics && typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible(event, { props });
      }
      // eslint-disable-next-line no-console
      console.log('[analytics]', event, props);
    } catch {}
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // guard double-clicks

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
      setError(lang === 'ur' ? 'براہِ کرم کچھ دیر بعد دوبارہ کوشش کریں۔' : 'Please wait a moment before submitting again.');
      setLoading(false);
      return;
    }
    lastSubmitRef.current = now;

    // Honeypot + time-to-fill heuristic
    const hpVal = hpRef.current?.value || '';
    const timeSinceOpen = now - startRef.current;
    const looksLikeBot = hpVal.length > 0 || timeSinceOpen < 1000;

    // Validate
    const errs = validateNow(em, wv);
    setTouched({ email: true, wa: true, city: true });
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      track('form_validation_error', { fields: Object.keys(errs) });
      const firstId = errs.email ? 'rb-email' : errs.wa ? 'rb-wa' : undefined;
      if (firstId) document.getElementById(firstId)?.focus();
      setLoading(false);
      return;
    }

    try {
      const endpoint = _WAITLIST_ENDPOINT;
      const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      let utmSource = '', utmMedium = '', utmCampaign = '';
      try {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        if (params) {
          utmSource = params.get('utm_source') || '';
          utmMedium = params.get('utm_medium') || '';
          utmCampaign = params.get('utm_campaign') || '';
        }
      } catch {}

      if (endpoint) {
        // Fire-and-forget to Google Apps Script (no-cors so we don't need custom headers)
        const payload = {
          email: em,
          phone: wv,
          city: cc,
          lang,
          theme: darkMode ? 'dark' : 'light',
          utmSource, utmMedium, utmCampaign,
          analytics: Boolean(cookiePrefs?.analytics),
          bot: looksLikeBot,
          ua,
          ts: new Date().toISOString(),
          key: _WAITLIST_SECRET || undefined,
        } as const;
        try {
          await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch {}
      } else {
        // Simulate success; for bots, respond faster to avoid signal
        await new Promise((r) => setTimeout(r, looksLikeBot ? 200 : 500));
      }
      setSubmitted(true);
      track('signup_submitted', { lang, hasWa: Boolean(wv), city: cc, source: 'landing', bot: looksLikeBot });
    } catch (err) {
      console.error(err);
      setError(lang === 'ur' ? 'عارضی مسئلہ۔ براہ کرم دوبارہ کوشش کریں۔' : 'Temporary issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.5, ease: 'easeOut' } } as const;
  const floatIn = { initial: { opacity: 0, y: 16, scale: 0.98 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, amount: 0.4 }, transition: { duration: 0.55, ease: 'easeOut' } } as const;

  // Tiny runtime checks (acts like smoke tests)
  useEffect(() => {
    try {
      console.assert(!!document.getElementById('rb-email'), 'TEST: email field exists');
      console.assert(!!document.getElementById('rb-wa'), 'TEST: phone field exists');
      console.assert(!!document.querySelector('a[href="#privacy"]'), 'TEST: privacy link exists');
      // Extra form tests
      console.assert(/^(?:[+]92)?0?3[0-9]{9}$/.test('+923001234567'), 'TEST: pk phone regex works (+92...)');
      console.assert(/^(?:[+]92)?0?3[0-9]{9}$/.test('03001234567'), 'TEST: pk phone regex works (03...)');
      console.assert(!!document.getElementById('rb-join-form'), 'TEST: join form exists');
    } catch {}
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''} dir={dir}>
      <SEO />
      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 z-50 rounded-xl px-3 py-2 bg-emerald-600 text-white shadow focus:outline-none">
        {lang === 'ur' ? 'مواد پر جائیں' : 'Skip to content'}
      </a>
      {/* Global focus-visible ring for accessibility */}
      <style dangerouslySetInnerHTML={{ __html: 'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #10b981;outline-offset:2px}' }} />
      <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 border-b border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg aria-hidden viewBox="0 0 24 24" className="size-6 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5L12 4l9 7.5" />
                <path d="M5 10v9h14v-9" />
              </svg>
              <span className="font-semibold">RentBack</span>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-300/20 dark:text-amber-300">{t.statusOperational}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Secondary legal links in header (desktop) */}
              <nav className="hidden md:flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                <a href="#privacy" onClick={(e)=>{e.preventDefault(); setOpenLegal('privacy'); track('legal_open', { doc: 'privacy', loc: 'header' }); }} className="hover:underline">{t.policy.privacy}</a>
                <a href="#terms" onClick={(e)=>{e.preventDefault(); setOpenLegal('terms'); track('legal_open', { doc: 'terms', loc: 'header' }); }} className="hover:underline">{t.policy.terms}</a>
                <a href="#rewards" onClick={(e)=>{e.preventDefault(); setOpenLegal('rewards'); track('legal_open', { doc: 'rewards', loc: 'header' }); }} className="hover:underline">{t.policy.rewards}</a>
                <button type="button" onClick={()=>{ setOpenFounder(true); track('founder_open'); }} className="hover:underline">{t.founderLabel}</button>
              </nav>
              {/* Founder link for mobile too */}
              <button type="button" onClick={()=>{ setOpenFounder(true); track('founder_open'); }} className="md:hidden underline text-sm text-gray-700 dark:text-gray-300">{t.founderLabel}</button>

              {/* Language toggle EN/UR only */}
              <button
                onClick={() => { const next = lang === 'en' ? 'ur' : 'en'; setLang(next as 'en'|'ur'); track('lang_toggle', { to: next }); }}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                aria-label={lang === 'en' ? 'Switch to Urdu' : 'Switch to English'}
              >
                <Languages className="size-4" />
                <span className="font-medium">{t.languageLabel}</span>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={() => { const next = !darkMode; setDarkMode(next); track('theme_toggle', { to: next ? 'dark' : 'light' }); }}
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}
              >
                {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                <span className="font-medium hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main id="main">
          <section className="relative pt-12 sm:pt-16">
            {!reduce && bgReady && (
              <>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 left-[-8%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                />
              </>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-2">{t.metaTagline}</div>
                <motion.h1 {...floatIn} className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.heroTitle}</motion.h1>
                <motion.p {...floatIn} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }} className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{t.heroSub}</motion.p>
                <div className="mt-6">
                  <motion.a id="rb-join-btn" href="#join" onClick={() => track('cta_click', { loc: 'hero' })}
                    whileTap={{ scale: 0.98 }}
                    {...(!reduce ? { whileHover: { y: -1 } } : {})}
                    className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 transition"
                  >
                    {t.cta}
                  </motion.a>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">{t.howTitle}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {t.how.map((step: any, i: number) => (
                  <motion.div key={i} {...fadeUp} {...(!reduce ? { whileHover: { y: -4 } } : {})} className="rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10 transition-transform will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:ring-emerald-500/20 shadow-black/5 dark:shadow-white/5">
                    <div className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">{i + 1}</div>
                    <div className="font-semibold">{step.title}</div>
                    <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">{step.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why RentBack */}
          <section className="py-4 pb-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">{t.whyTitle}</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {t.why.map((f: any, i: number) => (
                  <motion.div key={i} {...fadeUp} {...(!reduce ? { whileHover: { y: -4 } } : {})} className="rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10 transition-transform will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:ring-emerald-500/20 shadow-black/5 dark:shadow-white/5">
                    <f.icon className="size-6" />
                    <div className="font-semibold mt-3">{f.title}</div>
                    <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">{f.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust & Security */}
          <section id="trustcenter" className="relative py-20 bg-gray-50 dark:bg-neutral-950/40 overflow-hidden">
            {!reduce && (
              <>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-[-10%] h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 right-[-8%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.05 }}
                />
              </>
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-center">{t.trustTitle}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.trustPoints.map((p: string, i: number) => (
                  <motion.div key={i} {...fadeUp} {...(!reduce ? { whileHover: { y: -4 } } : {})} className="group rounded-2xl p-6 bg-white/80 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur transition hover:ring-emerald-500/30 hover:shadow-lg shadow-black/5 dark:shadow-white/5">
                    <Shield className="size-5 text-emerald-700 dark:text-emerald-300" />
                    <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">{p}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Join Waitlist */}
          <section ref={formRef} id="join" className="py-16">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">{t.cta}</h2>

              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }} className="rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10 text-center">
                  <div className="text-lg font-semibold">{t.successTitle}</div>
                  <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{t.successBody}</p>
                </motion.div>
              ) : (
                <form id="rb-join-form" onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4" noValidate>
                  {/* Honeypot field (hidden from users) */}
                  <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" ref={hpRef} />

                  {/* Email */}
                  <label htmlFor="rb-email" className="sr-only">{lang === 'ur' ? 'ای میل' : 'Email'}</label>
                  <input
                    id="rb-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                    aria-invalid={Boolean(touched.email && fieldErrors.email)}
                    aria-describedby={touched.email && fieldErrors.email ? 'rb-email-err' : undefined}
                    placeholder={t.emailPh}
                    className="sm:col-span-4 rounded-2xl px-4 py-3.5 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-950"
                  />
                  {touched.email && fieldErrors.email && (
                    <p id="rb-email-err" role="alert" className="sm:col-span-4 -mt-2 text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</p>
                  )}

                  {/* Phone */}
                  <label htmlFor="rb-wa" className="sr-only">{lang === 'ur' ? 'فون نمبر' : 'Phone number'}</label>
                  <input
                    id="rb-wa"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={wa}
                    onChange={(e) => setWa(normalizePkPhone(e.target.value))}
                    onBlur={() => setTouched((p) => ({ ...p, wa: true }))}
                    aria-invalid={Boolean(touched.wa && fieldErrors.wa)}
                    aria-describedby={touched.wa && fieldErrors.wa ? 'rb-wa-err' : undefined}
                    placeholder={t.waPh}
                    title={lang === 'ur' ? 'پاکستانی موبائل نمبر (03001234567 یا +923001234567)' : 'Pakistani mobile number (e.g., 03001234567 or +923001234567)'}
                    pattern="^(?:[+]92)?0?3[0-9]{9}$"
                    className="sm:col-span-4 rounded-2xl px-4 py-3.5 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-950"
                  />
                  {touched.wa && fieldErrors.wa && (
                    <p id="rb-wa-err" role="alert" className="sm:col-span-4 -mt-2 text-xs text-red-600 dark:text-red-400">{fieldErrors.wa}</p>
                  )}

                  {/* City */}
                  <label htmlFor="rb-city" className="sr-only">{lang === 'ur' ? 'شہر' : 'City'}</label>
                  <input
                    id="rb-city"
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.cityPh}
                    className="sm:col-span-4 rounded-2xl px-4 py-3.5 ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-neutral-950"
                  />

                  <div className="sm:col-span-12 text-xs text-gray-600 dark:text-gray-400">{t.consent}</div>
                  {error && (
                    <p role="alert" aria-live="assertive" className="sm:col-span-12 mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
                  )}
                  <div className="sm:col-span-12">
                    <button
                      type="submit"
                      disabled={loading || Boolean(fieldErrors.email) || Boolean(fieldErrors.wa)}
                      className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <circle cx="12" cy="12" r="10" className="opacity-25" />
                            <path d="M22 12a10 10 0 0 1-10 10" className="opacity-75" />
                          </svg>
                          <span>{lang === 'ur' ? 'ارسال ہورہا ہے…' : 'Submitting…'}</span>
                        </span>
                      ) : (
                        t.submit
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-black/5 dark:border-white/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">RentBack</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <a href="https://status.rentback.app" target="_blank" rel="noopener noreferrer" onClick={() => track('status_view')} className="underline">{t.viewStatus}</a>
              <span> · </span>
              <a href="mailto:help@rentback.app" className="underline">help@rentback.app</a>
              <span> · </span>
              <a href="#privacy" onClick={(e)=>{e.preventDefault(); setOpenLegal('privacy'); track('legal_open', { doc: 'privacy', loc: 'footer' }); }} className="underline">{t.policy.privacy}</a>
              <span> · </span>
              <a href="#terms" onClick={(e)=>{e.preventDefault(); setOpenLegal('terms'); track('legal_open', { doc: 'terms', loc: 'footer' }); }} className="underline">{t.policy.terms}</a>
              <span> · </span>
              <a href="#rewards" onClick={(e)=>{e.preventDefault(); setOpenLegal('rewards'); track('legal_open', { doc: 'rewards', loc: 'footer' }); }} className="underline">{t.policy.rewards}</a>
              <span> · </span>
              <button type="button" onClick={()=>{ setOpenFounder(true); track('founder_open'); }} className="underline">{t.founderLabel}</button>
              <span> · </span>
              <button type="button" onClick={()=>{ setOpenCookies(true); track('cookies_open'); }} className="underline">{t.cookieLabel}</button>
            </div>
          </div>
        </footer>

        {/* Legal Modal */}
        {openLegal && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4" onClick={() => setOpenLegal(null)}>
            <div ref={modalRef} tabIndex={-1} className="w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-2xl ring-1 ring-black/10 dark:ring-white/10 shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-5">
                <h3 className="text-base font-semibold mb-2">{openLegal === 'privacy' ? (lang === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy') : openLegal === 'terms' ? (lang === 'ur' ? 'شرائطِ استعمال' : 'Terms of Service') : (lang === 'ur' ? 'ریوارڈز کی شرائط' : 'Rewards T&Cs')}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {openLegal === 'privacy' && (lang === 'ur' ? 'ہم آپ کی معلومات کو پاکستانی قوانین اور SBP ہدایات کے مطابق سنبھالتے ہیں۔' : 'We handle your information under Pakistani law and relevant SBP directives.')}
                  {openLegal === 'terms' && (lang === 'ur' ? 'یہ شرائط پاکستان میں ایپ اور ویب کے استعمال پر لاگو ہیں۔' : 'These terms govern your use of the app and website in Pakistan.')}
                  {openLegal === 'rewards' && (lang === 'ur' ? 'پوائنٹس نقد نہیں ہوتے اور صرف درج شدہ انعامات پر ریڈیم ہوتے ہیں۔' : 'Points are not cash and redeem only for listed rewards.')}
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => setOpenLegal(null)} className="rounded-lg px-3 py-1 text-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">{lang === 'ur' ? 'بند کریں' : 'Close'}</button>
                  <button onClick={() => openStandalone(openLegal)} className="rounded-lg px-3 py-1 text-sm bg-emerald-600 text-white hover:bg-emerald-700">{lang === 'ur' ? 'پرنٹ ایبل صفحہ' : 'Open printable page'}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Founder Modal */}
        {openFounder && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4" onClick={() => setOpenFounder(false)}>
            <div ref={modalRef} tabIndex={-1} className="w-full max-w-sm bg-white dark:bg-neutral-950 rounded-2xl ring-1 ring-black/10 dark:ring-white/10 shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-5">
                <h3 className="text-base font-semibold mb-2">{t.founderLabel}</h3>
                <p className="text-sm">Suhail Ahmed</p>
                <p className="text-sm mt-1"><a href="mailto:help@rentback.app" className="underline">help@rentback.app</a></p>
                <div className="mt-4 text-right">
                  <button onClick={() => setOpenFounder(false)} className="rounded-lg px-3 py-1 text-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">{lang === 'ur' ? 'بند کریں' : 'Close'}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cookie Preferences Modal */}
        {openCookies && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4" onClick={() => setOpenCookies(false)}>
            <div ref={modalRef} tabIndex={-1} className="w-full max-w-lg bg-white dark:bg-neutral-950 rounded-2xl ring-1 ring-black/10 dark:ring-white/10 shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-5">
                <h3 className="text-base font-semibold mb-2">{t.cookieTitle}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{t.cookieDesc}</p>
                <div className="mt-4 space-y-3 text-sm">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked readOnly aria-readonly className="size-4 rounded" />
                    <span>{t.cookieNecessary}</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(cookiePrefs?.analytics)}
                      onChange={(e) => setCookiePrefs({ analytics: e.target.checked })}
                      className="size-4 rounded"
                    />
                    <span>{t.cookieAnalytics}</span>
                  </label>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button onClick={() => setOpenCookies(false)} className="rounded-lg px-3 py-1 text-sm ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">{lang === 'ur' ? 'بند کریں' : 'Close'}</button>
                  <button
                    onClick={() => {
                      try {
                        const next = { analytics: Boolean(cookiePrefs?.analytics) };
                        if (typeof localStorage !== 'undefined') localStorage.setItem('rb-cookies', JSON.stringify(next));
                        setCookiePrefs(next);
                        setOpenCookies(false);
                        track('cookies_saved', { analytics: next.analytics });
                      } catch {}
                    }}
                    className="rounded-lg px-3 py-1 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
                  >{t.cookieSave}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
