// app/app/admin/kyc/page.tsx
import React from "react";
import { getUserOrNull } from "@/lib/session";
import { approveKyc, rejectKyc } from "./actions";

export const dynamic = "force-dynamic";

const MOCK = [
  { id: "kyc_1001", name: "Ayesha Khan", role: "tenant", doc: "CNIC • ****-1234" },
  { id: "kyc_1002", name: "Hassan Ali", role: "landlord", doc: "CNIC • ****-5678" },
  { id: "kyc_1003", name: "Sara M.", role: "tenant", doc: "Passport • ****-9988" },
];

export default async function AdminKycQueue() {
  const user = await getUserOrNull();
  const lang = user?.lang ?? "en";

  const t =
    lang === "ur"
      ? {
          title: "KYC قطار",
          applicant: "درخواست دہندہ",
          role: "کردار",
          docs: "دستاویزات",
          approve: "منظور کریں",
          reject: "مسترد کریں",
          empty: "کوئی زیرِ التواء درخواست نہیں۔",
        }
      : {
          title: "KYC Queue",
          applicant: "Applicant",
          role: "Role",
          docs: "Documents",
          approve: "Approve",
          reject: "Reject",
          empty: "No pending applications.",
        };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">{t.title}</h1>

      {MOCK.length === 0 ? (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 opacity-80">
          {t.empty}
        </div>
      ) : (
        <div className="grid gap-3">
          {MOCK.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0b0b0b] p-4 flex items-center justify-between"
            >
              <div className="min-w-0">
                <div className="font-medium">
                  {t.applicant}: {row.name}
                </div>
                <div className="text-xs opacity-70">
                  {t.role}: {row.role} • {t.docs}: {row.doc}
                </div>
              </div>

              <div className="flex gap-2">
                <form action={approveKyc}>
                  <input type="hidden" name="id" value={row.id} />
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {t.approve}
                  </button>
                </form>

                <form action={rejectKyc}>
                  <input type="hidden" name="id" value={row.id} />
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-1.5 text-sm border border-black/10 dark:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  >
                    {t.reject}
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
