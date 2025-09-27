// components/Modal.tsx
"use client";

import React from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-[61] w-[92vw] max-w-lg rounded-2xl border border-white/10 bg-[#0b0b0b] text-white p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="text-sm px-2 py-1 rounded border border-white/10 hover:bg-white/5"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
