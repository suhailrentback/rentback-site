// app/(auth)/sign-in/page.tsx
import Logo from "@/components/Logo";
import { signInAndRedirect } from "./actions";

export const dynamic = "force-static";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-[#0b0b0b] dark:text-white">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-center my-6">
          <Logo label="RentBack" />
        </div>

        {/* Direct server action: submit -> set cookie -> redirect */}
        <form action={signInAndRedirect} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm opacity-80">Full name (optional)</label>
            <input
              name="fullName"
              placeholder="Your name"
              className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm opacity-80">Role</label>
            <select
              name="role"
              defaultValue="tenant"
              className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <input type="hidden" name="lang" value="en" />

          <button
            type="submit"
            className="rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
