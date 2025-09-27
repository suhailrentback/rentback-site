// lib/adminStore.ts
export type Role = "tenant" | "landlord" | "admin";

export type KycApplication = {
  id: string;
  fullName: string;
  role: Role;
  submittedAt: string; // ISO date
  status: "pending" | "approved" | "rejected";
  notes?: string;
};

export type Payment = {
  id: string;
  tenantName: string;
  amount: number; // PKR
  date: string; // ISO date
  method: "Bank Transfer" | "Card" | "Wallet";
  status: "pending" | "settled" | "failed";
  reference: string;
};

type AdminStore = {
  kyc: KycApplication[];
  payments: Payment[];
};

const g = globalThis as unknown as { __adminStore?: AdminStore };

if (!g.__adminStore) {
  g.__adminStore = {
    kyc: [
      {
        id: "kyc_1001",
        fullName: "Ayesha Khan",
        role: "tenant",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        status: "pending",
      },
      {
        id: "kyc_1002",
        fullName: "Ali Raza",
        role: "landlord",
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        status: "pending",
      },
    ],
    payments: [
      {
        id: "pay_2001",
        tenantName: "Ayesha Khan",
        amount: 120000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        method: "Bank Transfer",
        status: "pending",
        reference: "RB-2024-0007",
      },
      {
        id: "pay_2002",
        tenantName: "Bilal Ahmed",
        amount: 85000,
        date: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        method: "Card",
        status: "settled",
        reference: "RB-2024-0008",
      },
    ],
  };
}

export const adminStore = g.__adminStore!;
