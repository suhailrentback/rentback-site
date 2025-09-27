// app/(site)/layout.tsx
import React from "react";
import Logo from "@/components/Logo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-4 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Logo label="RentBack" />
        </div>
        {/* No theme/lang toggles here on purpose */}
      </header>
      <main>{children}</main>
    </div>
  );
}
