"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1, suffix: "+", label: "Years of Passion", description: "Building from the heart" },
  { value: 3, suffix: "+", label: "Games in Development", description: "Stories being forged" },
  { value: 4, suffix: "", label: "Future Platforms", description: "Roblox → Steam → Epic → Global" },
  { value: 100, suffix: "+", label: "Stories to Tell", description: "Tamil legends await" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
      <div className="absolute inset-0 grid-lines opacity-10" />

      {/* Horizontal glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5c242]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5c242]/20 to-transparent" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold">
            The Journey So Far
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.6 }}
              className="relative group text-center"
            >
              {/* Card */}
              <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full border border-white/5 group-hover:border-[#f5c242]/25 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(245,194,66,0.1)] flex flex-col justify-center">
                {/* Number */}
                <div
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-1 sm:mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-xs sm:text-sm md:text-base font-semibold text-white/90 mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-[10px] sm:text-xs text-white/40 leading-tight">{stat.description}</div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-[#f5c242]/50 to-transparent transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
