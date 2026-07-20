"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface ChapterProps {
  number: string;
  title: string;
  subtitle?: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
  bgClass?: string;
  accentColor?: string;
}

export default function Chapter({
  number,
  title,
  subtitle,
  body,
  visual,
  reverse = false,
  bgClass = "",
  accentColor = "#f5c242",
}: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden ${bgClass}`}
    >
      {/* Ambient glow */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5"
          style={{
            background: accentColor,
            left: reverse ? "auto" : "-10%",
            right: reverse ? "-10%" : "auto",
          }}
        />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 grid-lines opacity-10" />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
          style={{ direction: reverse ? "rtl" : "ltr" }}
        >
          {/* Text side */}
          <div style={{ direction: "ltr" }}>
            {/* Chapter number */}
            <motion.div
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div
                className="text-xs font-bold tracking-[0.4em] uppercase"
                style={{ color: accentColor, fontFamily: "Space Grotesk, sans-serif" }}
              >
                Chapter {number}
              </div>
              <div className="flex-1 h-px" style={{ background: `${accentColor}30` }} />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg mb-6"
                style={{ color: accentColor }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-white/55 text-base md:text-lg leading-relaxed"
            >
              {body}
            </motion.p>
          </div>

          {/* Visual side */}
          <motion.div
            style={{ y, direction: "ltr" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            {visual}
          </motion.div>
        </div>
      </div>

      {/* Horizontal divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
