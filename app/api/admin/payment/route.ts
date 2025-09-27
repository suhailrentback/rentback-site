// app/api/admin/payment/route.ts
import { NextResponse } from "next/server";
import { adminStore } from "@/lib/adminStore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  const payment = adminStore.payments.find(p => p.id === id) || null;
  return NextResponse.json({ payment });
}
