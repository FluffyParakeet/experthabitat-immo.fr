import type { Metadata } from "next";
import { ComingSoonView } from "@/components/coming-soon/coming-soon-view";

export const metadata: Metadata = {
  title: "Bientôt en ligne | Expert Habitat",
  description: "Le site Expert Habitat est en préparation. Retrouvez-nous très bientôt.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return <ComingSoonView />;
}
