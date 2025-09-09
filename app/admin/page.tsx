"use client";

import React from "react";
import { flags, isProd } from "../../lib/flags";
import { BRAND } from "../../lib/tokens";

export default function AdminPage() {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, color: BRAND.text, padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Admin</h1>
      <div style={{
        background: BRAND.surface, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, padding: 12,
      }}>
        <div style={{ marginBottom: 8 }}><b>Environment:</b> {isProd ? "production" : "non-production"}</div>
        <div><b>Flags:</b></div>
        <ul style={{ paddingInlineStart: 18, lineHeight: 1.7 }}>
          <li>logging: {String(flags.logging)}</li>
          <li>demoMode: {String(flags.demoMode)}</li>
        </ul>
      </div>
    </div>
  );
}
