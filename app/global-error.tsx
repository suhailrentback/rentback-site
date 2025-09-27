// app/global-error.tsx
"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Global error:", error);
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-semibold mb-2">Unexpected error</h1>
          <p className="opacity-75 mb-6">
            Please reload the page or try again.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-lg px-4 py-2 border border-black/10 hover:bg-black/[0.04]"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
