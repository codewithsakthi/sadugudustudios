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
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-[#f5c242]/20 animate-spin-slow" />
      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-[#ff7a18]/15" />
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#f5c242]/5 blur-xl" />
      {/* Avatar */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1a0a00] to-[#0a0505] border border-[#f5c242]/20 flex items-center justify-center overflow-hidden">
        {/* Silhouette */}
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
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
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0503] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#f5c242]/4 blur-[150px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-6"
              >
                The Founder
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                The Person Behind the{" "}
                <span className="gradient-text">Studio</span>
              </motion.h1>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-xl md:text-2xl text-[#f5c242]/80 font-medium italic mb-6 border-l-2 border-[#f5c242]/30 pl-5"
              >
                &ldquo;I believe stories are more powerful than graphics.&rdquo;
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-white/50 text-lg leading-relaxed mb-8"
              >
                Founder of Sadugudu Studios. Tamil. Self-taught. Passionate about making games that 
                tell stories nobody else is telling — in a language nobody else is using — for a community 
                nobody else is building for.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="flex gap-4"
              >
                <GlowButton href="/contact" variant="primary">Get in Touch</GlowButton>
                <GlowButton href="/about" variant="outline">Our Story</GlowButton>
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="animate-float"
            >
              <AvatarPlaceholder />
              <div className="text-center mt-6">
                <div className="text-white/30 text-xs tracking-widest uppercase mb-1">Madurai, Tamil Nadu</div>
                <div className="font-tamil text-[#f5c242]/60 text-sm tamil-glow">சடுகுடு தொடங்கட்டும்!</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 grid-lines opacity-10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-4">The Journey</span>
            <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              From <span className="gradient-text">Madurai</span> to the World
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#f5c242]/30 via-[#ff7a18]/20 to-transparent" />

            {timelineItems.map((item, i) => (
              <motion.div
                key={item.era}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative flex gap-8 mb-10 last:mb-0 group"
              >
                {/* Dot */}
                <div
                  className="absolute left-6 -translate-x-1/2 mt-2 w-4 h-4 rounded-full border-2 flex-shrink-0 z-10 group-hover:scale-125 transition-transform"
                  style={{ borderColor: item.color, background: `${item.color}30`, boxShadow: `0 0 10px ${item.color}50` }}
                />
                {/* Content */}
                <div className="ml-16 glass rounded-2xl p-6 border border-white/5 group-hover:border-white/10 transition-all duration-300 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: item.color }}>
                      {item.era}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section ref={achievementsRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-4">Skills</span>
            <h2 className="text-3xl md:text-5xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              What I <span className="gradient-text">Bring</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <item.icon size={22} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.label}</h3>
                    <p className="text-white/45 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isAchievementsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Core <span className="gradient-text">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isAchievementsVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.07 + 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 text-center transition-all duration-300 group cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}
                >
                  <v.icon size={18} style={{ color: v.color }} />
                </div>
                <p className="text-sm font-semibold text-white">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
