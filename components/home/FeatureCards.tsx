"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, IndianRupee, Languages, Globe } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Story First",
    description:
      "Every mechanic, every level, every pixel — designed to serve the story. We build worlds that make you feel, not just play.",
    color: "#f5c242",
    glow: "rgba(245, 194, 66, 0.2)",
  },
  {
    icon: IndianRupee,
    title: "Affordable Gaming",
    description:
      "Great games shouldn't cost a fortune. We build premium experiences accessible to every Tamil player, regardless of wallet size.",
    color: "#ff7a18",
    glow: "rgba(255, 122, 24, 0.2)",
  },
  {
    icon: Languages,
    title: "Tamil Experience",
    description:
      "Dialogue in Tamil. Characters from Tamil culture. Stories rooted in our land. A gaming experience that truly feels like home.",
    color: "#d62828",
    glow: "rgba(214, 40, 40, 0.2)",
  },
  {
    icon: Globe,
    title: "Immersive Worlds",
    description:
      "From ancient Tamil kingdoms to futuristic sci-fi realms — we craft universes so vivid you'll forget you're playing a game.",
    color: "#f5c242",
    glow: "rgba(245, 194, 66, 0.2)",
  },
];

export default function FeatureCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-[#f5c242]/3 blur-[120px] sm:blur-[150px]" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3">
            Our Pillars
          </span>
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            What Makes Us{" "}
            <span className="gradient-text">Different</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.15, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative"
            >
              {/* Glow behind card */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ background: feature.glow }}
              />

              {/* Card */}
              <div className="relative glass rounded-2xl p-6 sm:p-8 h-full border border-white/5 group-hover:border-white/10 transition-all duration-300 card-3d overflow-hidden">
                {/* Top corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-full pointer-events-none"
                  style={{ background: feature.color }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    border: `1px solid ${feature.color}30`,
                    boxShadow: `0 0 15px ${feature.glow}`,
                  }}
                >
                  <feature.icon
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-bold text-white mb-2.5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
