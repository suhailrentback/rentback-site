import React from "react";

export const dynamic = "force-static"; // safe to prerender
// DO NOT add: export const runtime = "edge";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
