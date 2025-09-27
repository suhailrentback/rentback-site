// components/PayScreen.tsx
"use client";

import React, { useState } from "react";

type PaymentStatus = "initiated" | "sent" | "succeeded" | "refunded";
type Method = "Bank Transfer" | "Card" | "Wallet";

type Payment = {
  id: string;
  ref: string;
  landlord: string;
  amount: number;
  method: Method;
  status: PaymentStatus;
  ts: number;
};

const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(n);

export default function PayScreen() {
  const [amount, setAmount] = useState<string>("");
  const [landlord, setLandlord] = useState<string>("");
  const [method, setMethod] = useState<Method>("Bank Transfer");
  const [msg, setMsg] = useState<string>("");
  const [payments, setPayments] = useState<Payment[]>([]);

  const onCreate = () => {
    const clean = Number((amount || "").replace(/[^0-9]/g, ""));
    if (!clean || !landlord.trim()) {
      setMsg("Enter amount and landlord.");
      return;
    }
    const ref = `RB-${Math.floor(100000 + Math.random() * 900000)}`;
    const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const status: PaymentStatus = method === "Bank Transfer" ? "initiated" : "succeeded";
    const p: Payment = {
      id,
      ref,
      landlord: landlord.trim(),
      amount: clean,
      method,
      status,
      ts: Date.now(),
    };
    setPayments((prev) => [p, ...prev]);
    setAmount("");
    setLandlord("");
    setMsg(
      status === "initiated"
        ? "Transfer instructions below (demo)."
        : "Payment succeeded (demo)."
    );
  };

  const markSent = (id: string) =>
    setPayments((prev) => prev.map((x) => (x.id === id ? { ...x, status: "sent" } : x)));

  const refund = (id: string) =>
    setPayments((prev) => prev.map((x) => (x.id === id ? { ...x, status: "refunded" } : x)));

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border bg-white/5 border-white/10 p-3">
        <div className="font-semibold">Pay rent</div>
        <div className="text-xs opacity-70">Demo mode — no real charges</div>
        <div className="grid gap-2 mt-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (PKR)"
            inputMode="numeric"
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 outline-none"
          />
          <input
            value={landlord}
            onChange={(e) => setLandlord(e.target.value)}
            placeholder="Landlord / Property"
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 outline-none"
          />
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 outline-none"
          >
            <option>Bank Transfer</option>
            <option>Card</option>
            <option>Wallet</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={onCreate}
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
            >
              Create Payment (Demo)
            </button>
          </div>
          {msg ? <div className="text-xs text-emerald-300">{msg}</div> : null}
        </div>
      </div>

      <div className="font-semibold">Recent</div>
      <div className="grid gap-2">
        {payments.length === 0 ? (
          <div className="text-sm opacity-70">No demo payments yet.</div>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-2"
            >
              <div className="flex items-center justify-between font-semibold">
                <span>{p.landlord}</span>
                <span>{formatPKR(p.amount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs opacity-80">
                <span>
                  {p.method} • Ref {p.ref}
                </span>
                <span
                  className={
                    p.status === "succeeded"
                      ? "text-emerald-300"
                      : p.status === "sent"
                      ? "text-amber-300"
                      : p.status === "refunded"
                      ? "text-slate-400"
                      : "text-slate-200"
                  }
                >
                  {p.status}
                </span>
              </div>

              {p.method === "Bank Transfer" && p.status === "initiated" ? (
                <div className="text-xs space-y-1">
                  <div>
                    Send to: <b>RentBack Collections</b>
                  </div>
                  <div>
                    IBAN: <b>PK00-RENT-0000-0007</b>
                  </div>
                  <div>
                    Memo: <b>{p.ref}</b>
                  </div>
                  <button
                    onClick={() => markSent(p.id)}
                    className="mt-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
                  >
                    Mark as Sent
                  </button>
                </div>
              ) : null}

              <div className="flex gap-2">
                <button
                  onClick={() => refund(p.id)}
                  disabled={p.status === "refunded" || p.status === "initiated"}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-60"
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
}
