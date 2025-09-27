"use client";

import React from "react";

export default function LandlordPropertiesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Properties</h1>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="font-medium">No properties yet</div>
        <div className="text-sm opacity-75">Add your first property to start receiving rent.</div>
        <div className="mt-3">
          <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
}
