// Pure server page — remains static
export const dynamic = "force-static";

export const metadata = {
  title: "Terms of Service — RentBack",
  description: "Terms for using RentBack in Pakistan.",
};

import LegalText from "../_components/LegalText";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose prose-zinc dark:prose-invert">
      <LegalText kind="terms" />
    </main>
  );
}
