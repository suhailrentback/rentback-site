// app/app/page.tsx
import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppHomeRedirect() {
  const user = await getUser();
  if (!user) redirect("/sign-in?next=/app");

  // land on active role dashboard
  switch (user.activeRole) {
    case "tenant":
      redirect("/app/tenant");
    case "landlord":
      redirect("/app/landlord");
    case "admin":
      redirect("/app/admin");
    default:
      redirect("/sign-in?next=/app");
  }
}
