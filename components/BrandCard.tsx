"use client";
import React from "react";
import Logo from "@/components/Logo";

export default function BrandCard({
  className = "",
  label = "VIRTUAL • Debit",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={
        "relative w-full max-w-[520px] h-[240px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(5,150,105,0.25)] border border-black/5 dark:border-white/10 " +
        className
      }
    >
      {/* Animated brand gradient */}
      <div className="absolute inset-0 rb-animated-bg" />

      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Logo />
            <span className="text-slate-900">RentBack</span>
          </div>
          <span className="text-[12px] text-slate-800/90">{label}</span>
        </div>

        <div className="mt-auto font-mono tracking-wider">
          <div className="text-[22px] font-semibold text-slate-900">**** **** **** 0007</div>
          <div className="flex gap-5 mt-1 text-[12px] text-slate-800">
            <span>Exp 12/27</span>
            <span>PKR</span>
          </div>
        </div>
      </div>

      {/* Local styles for animation */}
      <style jsx>{`
        @keyframes rb-grad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rb-animated-bg {
          /* Brand sweep: emerald → teal → green */
          background: linear-gradient(120deg, #059669, #14b8a6, #34d399);
          background-size: 200% 200%;
          animation: rb-grad 12s ease infinite;
        }
      `}</style>
    </div>
  );
}
