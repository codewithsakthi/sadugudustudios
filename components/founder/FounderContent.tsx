"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Gamepad2, BookOpen, Heart, Globe, Rocket, Lightbulb, Users, Music, Star } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const timelineItems = [
  {
    era: "Childhood",
    title: "Born in the City of Temples",
    desc: "Grew up in Madurai, Tamil Nadu — a city steeped in ancient culture and modern ambition. Surrounded by stories, temples, and a community that valued imagination.",
    icon: "🏛️",
    color: "#ff7a18",
  },
  {
    era: "Discovery",
    title: "First Touch of Technology",
    desc: "The day a phone arrived at home changed everything. The internet, even on GPRS, felt like a portal to another universe. Curiosity became an obsession.",
    icon: "📱",
    color: "#f5c242",
  },
  {
    era: "Gaming",
    title: "JAR Games & The First Adventure",
    desc: "Discovered interactive storytelling through Nokia keypad games. Vampires Dawn showed that games could tell stories that books couldn't — and changed the course of a life.",
    icon: "🎮",
    color: "#d62828",
  },
  {
    era: "Learning",
    title: "The Self-Taught Journey",
    desc: "No formal game dev school. Just YouTube tutorials, documentation, and relentless building. Learned programming, game design, and digital art through sheer determination.",
    icon: "💻",
    color: "#f5c242",
  },
  {
    era: "Programming",
    title: "Building Real Things",
    desc: "Started making real projects — small games, tools, experiments. Every failure was a lesson. Every small success was proof that the dream was possible.",
    icon: "⚡",
    color: "#ff7a18",
  },
  {
    era: "Founding",
    title: "Sadugudu Studios Is Born",
    desc: "The decision was made. Not just to make a game — but to build a studio. A studio that would become the home of Tamil gaming for generations to come.",
    icon: "🚀",
    color: "#d62828",
  },
  {
    era: "Future",
    title: "Building for the World",
    desc: "The journey continues. Every line of code, every story written, every Tamil player who finds our games — this is the mission. It's only the beginning.",
    icon: "🌍",
    color: "#f5c242",
  },
];

const achievements = [
  { icon: Code2, label: "Programming", desc: "Self-taught developer across multiple languages and engines", color: "#f5c242" },
  { icon: Gamepad2, label: "Game Development", desc: "End-to-end game development from concept to shipping", color: "#ff7a18" },
  { icon: BookOpen, label: "Storytelling", desc: "Narrative design and world-building for story-driven games", color: "#d62828" },
  { icon: Heart, label: "Tamil Gaming Passion", desc: "Dedicated to bringing Tamil culture to global gaming", color: "#d62828" },
];

const values = [
  { icon: Lightbulb, label: "Innovation", color: "#f5c242" },
  { icon: Star, label: "Creativity", color: "#ff7a18" },
  { icon: Users, label: "Community", color: "#27ae60" },
  { icon: Music, label: "Culture", color: "#9b59b6" },
  { icon: Rocket, label: "Determination", color: "#d62828" },
  { icon: Globe, label: "Global Vision", color: "#66c0f4" },
];

function AvatarPlaceholder() {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-[#f5c242]/20 animate-spin-slow" />
      {/* Middle ring */}
      <div className="absolute inset-3 rounded-full border border-[#ff7a18]/15" />
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#f5c242]/5 blur-xl" />
      {/* Avatar */}
      <div className="absolute inset-5 rounded-full bg-gradient-to-br from-[#1a0a00] to-[#0a0505] border border-[#f5c242]/30 flex items-center justify-center overflow-hidden shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
          <circle cx="50" cy="35" r="18" fill="#f5c242" />
          <ellipse cx="50" cy="85" rx="28" ry="22" fill="#f5c242" />
        </svg>
      </div>
    </div>
  );
}

export default function FounderContent() {
  const achievementsRef = useRef<HTMLDivElement>(null);
  const isAchievementsVisible = useInView(achievementsRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-24 sm:pt-28 md:pt-32">
      {/* Hero */}
      <section className="relative min-h-fit py-12 sm:py-16 md:py-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0503] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-[#f5c242]/4 blur-[100px] sm:blur-[140px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-7">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3 sm:mb-4"
              >
                The Founder
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                The Person Behind the{" "}
                <span className="gradient-text">Studio</span>
              </motion.h1>
              <motion.blockquote
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-lg sm:text-xl md:text-2xl text-[#f5c242]/90 font-medium italic mb-4 sm:mb-6 border-l-2 border-[#f5c242]/40 pl-4 sm:pl-5"
              >
                &ldquo;I believe stories are more powerful than graphics.&rdquo;
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8"
              >
                Founder of Sadugudu Studios. Tamil. Self-taught. Passionate about making games that 
                tell stories nobody else is telling — in a language nobody else is using — for a community 
                nobody else is building for.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex flex-wrap gap-3 sm:gap-4 items-center"
              >
                <GlowButton href="/contact" variant="primary" size="md">Get in Touch</GlowButton>
                <GlowButton href="/about" variant="outline" size="md">Our Story</GlowButton>
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="lg:col-span-5 flex flex-col items-center justify-center animate-float mt-4 lg:mt-0"
            >
              <AvatarPlaceholder />
              <div className="text-center mt-5">
                <div className="text-white/40 text-[11px] sm:text-xs tracking-widest uppercase mb-1 font-semibold">
                  Madurai, Tamil Nadu
                </div>
                <div className="font-tamil text-[#f5c242]/80 text-xs sm:text-sm tamil-glow">
                  சடுகுடு தொடங்கட்டும்!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3">
              The Journey
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              From <span className="gradient-text">Madurai</span> to the World
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#f5c242]/30 via-[#ff7a18]/20 to-transparent" />

            {timelineItems.map((item, i) => (
              <motion.div
                key={item.era}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative flex gap-4 sm:gap-6 mb-8 sm:mb-10 last:mb-0 group"
              >
                {/* Dot */}
                <div
                  className="absolute left-4 sm:left-6 -translate-x-1/2 mt-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 z-10 group-hover:scale-125 transition-transform"
                  style={{ borderColor: item.color, background: `${item.color}30`, boxShadow: `0 0 10px ${item.color}50` }}
                />
                {/* Content */}
                <div className="ml-10 sm:ml-16 glass rounded-2xl p-4 sm:p-6 border border-white/5 group-hover:border-white/10 transition-all duration-300 w-full">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-lg sm:text-xl">{item.icon}</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest" style={{ color: item.color }}>
                      {item.era}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section ref={achievementsRef} className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3">
              Skills & Expertise
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              What I <span className="gradient-text">Bring</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.1 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base sm:text-lg mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {item.label}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Core <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isAchievementsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05 + 0.5 }}
                whileHover={{ scale: 1.04, y: -3 }}
                className="glass rounded-xl p-4 border border-white/5 hover:border-white/10 text-center transition-all duration-300 group cursor-default"
              >
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}
                >
                  <v.icon size={18} style={{ color: v.color }} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white/90">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
