// app/(site)/page.tsx
import React from "react";
import dynamicImport from "next/dynamic";

export const dynamic = "force-static"; // keep this name for Next.js

// render client-only to avoid window access during SSG
const LandingClient = dynamicImport(() => import("@/components/LandingClient"), {
  ssr: false,
});

export default function SitePage() {
  return <LandingClient />;
}
