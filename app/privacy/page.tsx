// Pure server page — remains static
export const dynamic = "force-static";

export const metadata = {
  title: "Privacy Policy — RentBack",
  description: "How RentBack handles your data in Pakistan.",
};

import LegalText from "../_components/LegalText";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <LegalText kind="privacy" />
    </main>
  );
}
