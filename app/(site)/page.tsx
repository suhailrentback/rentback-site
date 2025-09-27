import React from "react";
import dynamic from "next/dynamic";

export const dynamic = "force-static"; // allow static export
// Do NOT set runtime = 'edge' here

const LandingClient = dynamic(() => import("@/components/LandingClient"), {
  ssr: false, // render only on client to avoid window access during SSG
});

export default function SitePage() {
  return <LandingClient />;
}
