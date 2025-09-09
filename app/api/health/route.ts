export const runtime = "edge";

export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, service: "rentback", time: new Date().toISOString() }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}
