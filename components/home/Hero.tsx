"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

// Floating ember particles
function Embers() {
  const embers = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 5,
    size: 1.5 + Math.random() * 2.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: "0%",
            width: e.size,
            height: e.size,
            background: e.id % 3 === 0 ? "#f5c242" : e.id % 3 === 1 ? "#ff7a18" : "#d62828",
            boxShadow: `0 0 ${e.size * 3}px ${
              e.id % 3 === 0 ? "#f5c242" : "#ff7a18"
            }`,
          }}
          animate={{
            y: [0, -(300 + Math.random() * 300)],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 0.8, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Background city/temple silhouette SVG
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0505] to-[#050505]" />

      {/* Volumetric light shafts */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#f5c242]/10 via-transparent to-transparent rotate-12 blur-sm" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-[#ff7a18]/8 via-transparent to-transparent -rotate-6 blur-sm" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#f5c242]/8 via-transparent to-transparent rotate-3 blur-sm" />

      {/* Central glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] sm:h-[500px] rounded-full bg-[#ff7a18]/6 blur-[100px] sm:blur-[120px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[200px] sm:h-[300px] rounded-full bg-[#f5c242]/5 blur-[60px] sm:blur-[80px]" />

      {/* Tamil temple silhouette (bottom) */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-20"
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax slice"
        fill="#1a0a00"
      >
        <rect x="0" y="250" width="1440" height="50" fill="#0d0500" />
        <polygon points="680,20 700,120 720,20" fill="#1a0800" />
        <rect x="660" y="120" width="80" height="130" rx="4" fill="#150600" />
        <rect x="640" y="248" width="120" height="8" rx="2" fill="#120500" />
        <rect x="650" y="238" width="100" height="10" rx="2" fill="#130600" />
        <polygon points="300,60 318,140 336,60" fill="#1a0800" />
        <rect x="288" y="140" width="60" height="110" rx="3" fill="#150600" />
        <rect x="278" y="248" width="80" height="8" rx="2" fill="#120500" />
        <polygon points="1104,60 1122,140 1140,60" fill="#1a0800" />
        <rect x="1092" y="140" width="60" height="110" rx="3" fill="#150600" />
        <rect x="1082" y="248" width="80" height="8" rx="2" fill="#120500" />
        <rect x="100" y="200" width="40" height="50" rx="2" fill="#100400" />
        <rect x="1300" y="200" width="40" height="50" rx="2" fill="#100400" />
        <line x1="0" y1="250" x2="1440" y2="250" stroke="#f5c242" strokeWidth="0.5" strokeOpacity="0.3" />
      </svg>

      {/* Fog layer */}
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      {/* Vignette */}
      <div className="absolute inset-0 hero-vignette" />
    </div>
  );
}

export default function Hero() {
  const [muted, setMuted] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section
      ref={scrollRef}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 overflow-hidden"
    >
      <CinematicBackground />
      <Embers />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl lg:max-w-5xl mx-auto my-auto">
        {/* Logo */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="relative mb-4 sm:mb-6"
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto animate-float">
            <Image
              src="/logo.png"
              alt="Sadugudu Studios"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(245,194,66,0.4)]"
              priority
            />
          </div>
        </motion.div>

        {/* Tamil animated tagline */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="font-tamil text-[#f5c242]/80 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wider tamil-glow"
        >
          சடுகுடு தொடங்கட்டும்!
        </motion.p>

        {/* Main headline */}
        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-4 sm:mb-6"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Every Great{" "}
          <span className="gradient-text text-glow-orange inline-block">Adventure</span>
          <br className="hidden sm:inline" />{" "}
          Begins Somewhere.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl leading-relaxed mb-6 sm:mb-8"
        >
          Where every game begins with a story. We are <span className="text-[#f5c242] font-semibold">Sadugudu Studios</span> — 
          a Tamil game development studio building unforgettable story-driven games.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto"
        >
          <GlowButton href="/about" variant="primary" size="md" className="w-full sm:w-auto">
            Explore Our Story
          </GlowButton>
          <GlowButton href="/games" variant="outline" size="md" className="w-full sm:w-auto">
            Our Games
          </GlowButton>
        </motion.div>

        {/* Music toggle */}
        <motion.button
          custom={5}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          onClick={() => setMuted(!muted)}
          className="mt-6 sm:mt-8 flex items-center gap-2 text-[11px] sm:text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-widest"
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          {muted ? "Enable Ambient" : "Disable Ambient"}
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollDown}
        className="mt-6 sm:mt-8 flex flex-col items-center gap-1 text-white/30 hover:text-white/70 transition-colors z-10 group"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
