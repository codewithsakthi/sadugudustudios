import type { Metadata } from "next";
import GamesContent from "@/components/games/GamesContent";

export const metadata: Metadata = {
  title: "Games & Services | Sadugudu Studios",
  description:
    "Discover what Sadugudu Studios builds — Roblox games, Steam games, Epic Games titles, UI/UX design, Tamil voice-over, and more.",
};

export default function GamesPage() {
  return <GamesContent />;
}
