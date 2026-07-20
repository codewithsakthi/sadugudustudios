import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "Our Story | Sadugudu Studios",
  description:
    "The cinematic story of Sadugudu Studios — from a childhood in Madurai to building Tamil games for the world.",
};

export default function AboutPage() {
  return <AboutContent />;
}
