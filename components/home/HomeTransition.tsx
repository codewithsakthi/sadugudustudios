"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowButton from "@/components/ui/GlowButton";

export default function HomeTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 md:py-32 overflow-hidden">
      {/* Gradient background transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0d0505] to-[#080205]" />
      
      {/* Ambient orbs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[#d62828]/5 blur-[100px] sm:blur-[120px]" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[#f5c242]/4 blur-[100px] sm:blur-[120px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Tamil text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-tamil text-2xl sm:text-4xl md:text-5xl font-black text-[#f5c242] tamil-glow mb-4 sm:mb-6"
          >
            சடுகுடு தொடங்கட்டும்!
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            We didn&apos;t just build a studio.
            <br />
            <span className="gradient-text">We started a movement.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            Born from a childhood in Madurai, fueled by JAR games on old Nokia phones,
            and driven by the dream of seeing Tamil stories on every screen in the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <GlowButton href="/about" variant="primary" size="md" className="w-full sm:w-auto">
              Read Our Full Story
            </GlowButton>
            <GlowButton href="/games" variant="outline" size="md" className="w-full sm:w-auto">
              See What We Build
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
