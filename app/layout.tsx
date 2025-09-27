import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "RentBack",
  description: "Pay rent, earn rewards — Pakistan-first fintech.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // NOTE: language + theme are set on <html> by AppProviders (client).
  return (
    <html>
      <body className="min-h-screen bg-[#0b0b0b] text-white transition-colors">
        <AppProviders>
          <header className="sticky top-0 z-[40] h-14 flex items-center justify-between px-3 bg-[#0b0b0bcc] backdrop-saturate-150 backdrop-blur border-b border-white/10">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              {/* Replace with your SVG logo component later if desired */}
              <span aria-hidden>🏠</span> RentBack
            </div>
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </header>
          <main className="p-3 max-w-3xl mx-auto">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
