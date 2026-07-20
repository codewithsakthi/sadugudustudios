import type { Metadata } from "next";
import FounderContent from "@/components/founder/FounderContent";

export const metadata: Metadata = {
  title: "The Founder | Sadugudu Studios",
  description:
    "Meet the founder of Sadugudu Studios — the story behind the studio, the vision, and the passion for Tamil game development.",
};

export default function FounderPage() {
  return <FounderContent />;
}
