"use client";

import dynamic from "next/dynamic";

// Render the landing purely on the client (no SSR) to avoid hydration mismatches
const RentBackLanding = dynamic(() => import("../components/RentBackLanding"), {
  ssr: false,
});

export default function Page() {
  return <RentBackLanding />;
}
