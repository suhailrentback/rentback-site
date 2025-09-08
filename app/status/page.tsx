// Server-only status page
export const dynamic = "force-static";

export const metadata = {
  title: "Status — RentBack",
  description: "Sandbox preparation & updates.",
};

export default function StatusPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <h1>Status</h1>
      <p><em>SBP Sandbox — preparation & updates</em></p>
      <ul>
        <li>Preparation complete (materials & partner outreach)</li>
        <li>Draft application ready</li>
        <li>Awaiting sandbox submission window</li>
      </ul>
    </main>
  );
}
