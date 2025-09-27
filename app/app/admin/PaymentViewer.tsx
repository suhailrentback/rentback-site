// app/app/admin/PaymentViewer.tsx
"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";

type Payment = {
  id: string;
  tenantName: string;
  amount: number;
  date: string;
  method: string;
  status: "pending" | "settled" | "failed";
  reference: string;
};

export default function PaymentViewer({
  paymentId,
  triggerClassName,
}: {
  paymentId: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/payment?id=${paymentId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!ignore) setPayment(data.payment || null);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [open, paymentId]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={triggerClassName || "px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-sm"}
      >
        View
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Payment">
        {loading && <div className="text-sm opacity-70">Loading…</div>}
        {!loading && !payment && (
          <div className="text-sm opacity-70">Not found.</div>
        )}
        {payment && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Reference</span>
              <span className="font-mono">{payment.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Tenant</span>
              <span>{payment.tenantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Amount</span>
              <span>PKR {payment.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Method</span>
              <span>{payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Status</span>
              <span className="uppercase">{payment.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Date</span>
              <span>{new Date(payment.date).toLocaleString()}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
