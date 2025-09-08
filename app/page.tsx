// app/page.tsx  (server component)
import RentBackLanding from "@/components/RentBackLanding";

export const dynamic = "force-static";

export const metadata = {
  title: "RentBack — Pay rent, earn rewards",
  description: "Turn your rent into rewards. Pakistan-focused rent payments + perks.",
};

export default function Page() {
  return <RentBackLanding />; // <- your landing component
}
