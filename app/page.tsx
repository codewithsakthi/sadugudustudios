import Hero from "@/components/home/Hero";
import StatsCounter from "@/components/home/StatsCounter";
import FeatureCards from "@/components/home/FeatureCards";
import HomeTransition from "@/components/home/HomeTransition";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <FeatureCards />
      <HomeTransition />
    </>
  );
}
