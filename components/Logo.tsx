"use client";
import * as React from "react";

export default function Logo({
  size = 22,
  stroke = "#059669",
  label = "RentBack",
  className = "",
}: { size?: number; stroke?: string; label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
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
      <span className="font-bold">{label}</span>
    </div>
  );
}
