// app/error.tsx
"use client";

import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error("App error boundary:", error);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
      <p className="opacity-75 mb-6">
        Please try again. If it keeps happening, contact help@rentback.app
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg px-4 py-2 border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
      >
        Try again
      </button>
    </div>
  );
}
