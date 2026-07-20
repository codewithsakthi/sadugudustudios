"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gamepad2, Monitor, Zap, Palette, Globe, Mic, Box, Smartphone, MessageSquare, BookOpen, Layers, Users } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

const services = [
  { icon: Gamepad2, title: "Roblox Games", desc: "Immersive Roblox experiences with Tamil storytelling, rich gameplay, and community-driven design.", color: "#d62828", tag: "Live 2026" },
  { icon: Monitor, title: "Steam Games", desc: "Narrative RPGs and adventure games built for PC gamers who crave emotional depth and authentic Tamil culture.", color: "#66c0f4", tag: "Coming 2027" },
  { icon: Zap, title: "Epic Games", desc: "High-quality UE5-powered titles designed to compete with global AAA studios, featuring stunning Tamil worlds.", color: "#2d2d2d", tag: "Coming 2028" },
  { icon: Layers, title: "Game Development", desc: "Full-cycle game development from concept to launch. Story design, mechanics, art, programming, and publishing.", color: "#f5c242", tag: "Studio Service" },
  { icon: BookOpen, title: "Game Publishing", desc: "We help indie Tamil developers get their games to market on Roblox, Steam, and beyond.", color: "#ff7a18", tag: "Studio Service" },
  { icon: Palette, title: "UI/UX Design", desc: "Game UI systems, HUD design, menus, loading screens, and in-game interfaces with cinematic quality.", color: "#9b59b6", tag: "Design" },
  { icon: MessageSquare, title: "Game Consulting", desc: "Story design, monetization strategy, platform optimization, and market positioning for game studios.", color: "#f5c242", tag: "Consulting" },
  { icon: Globe, title: "Game Localization", desc: "Translating and culturally adapting games into Tamil — making global titles feel local.", color: "#27ae60", tag: "Localization" },
  { icon: Mic, title: "Tamil Voice-Over", desc: "Professional Tamil voice acting for games, trailers, and in-game cutscenes with native talent.", color: "#d62828", tag: "Voice" },
  { icon: Box, title: "3D Assets", desc: "Custom 3D models, environments, and character designs inspired by Tamil architecture and mythology.", color: "#ff7a18", tag: "3D Art" },
  { icon: Smartphone, title: "Future Mobile Games", desc: "Affordable, premium Tamil mobile games coming to iOS and Android — storytelling for everyone.", color: "#f5c242", tag: "Future" },
  { icon: Users, title: "Community Building", desc: "Creating Tamil gaming communities, Discord servers, and content creator programs for our ecosystem.", color: "#66c0f4", tag: "Community" },
];

const timeline = [
  { year: "2026", platform: "Roblox", desc: "Launch our first story-driven Tamil Roblox game. Build the community.", color: "#d62828", icon: "🎮" },
  { year: "2027", platform: "Steam", desc: "Release our debut Steam RPG — a full narrative Tamil adventure.", color: "#66c0f4", icon: "🖥" },
  { year: "2028", platform: "Epic Games", desc: "Enter the Epic Games Store with an UE5-powered Tamil epic.", color: "#f5c242", icon: "⚡" },
  { year: "Future", platform: "Console & Global", desc: "PlayStation, Xbox, and global expansion. Tamil stories for the world.", color: "#27ae60", icon: "🌍" },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.08 + 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative h-full"
    >
      {/* Glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ background: `${service.color}20` }}
      />
      {/* Card */}
      <div className="relative glass rounded-2xl p-5 sm:p-6 h-full border border-white/5 group-hover:border-white/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Tag */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
            >
              <service.icon size={18} style={{ color: service.color }} />
            </div>
            <span
              className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ color: service.color, background: `${service.color}15` }}
            >
              {service.tag}
            </span>
          </div>
          {/* Title */}
          <h3
            className="text-base sm:text-lg font-bold text-white mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {service.title}
          </h3>
          {/* Desc */}
          <p className="text-white/55 text-xs sm:text-sm leading-relaxed mb-4">{service.desc}</p>
        </div>

        {/* Learn More */}
        <div className="pt-2">
          <button
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-2"
            style={{ color: service.color }}
          >
            Learn More <span>→</span>
          </button>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-b-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function GamesContent() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineVisible = useInView(timelineRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-20 sm:pt-24">
      {/* Hero */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#08060a] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-[#9b59b6]/4 blur-[100px] sm:blur-[150px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3 sm:mb-4"
          >
            What We Build
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Games, Services &{" "}
            <span className="gradient-text">Dreams</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto"
          >
            From Roblox to Epic Games — we build worlds, craft stories, and push Tamil gaming to every screen.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0805] to-[#050505]" />
        <div ref={timelineRef} className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3">
              The Roadmap
            </span>
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Platform <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#f5c242]/30 via-[#ff7a18]/20 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 25 }}
                animate={isTimelineVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                className={`relative flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex-shrink-0 z-10 mt-2"
                  style={{ borderColor: item.color, background: `${item.color}30`, boxShadow: `0 0 12px ${item.color}50` }}
                />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] w-full ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:ml-auto"}`}>
                  <div className="glass rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-xl sm:text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-black text-lg sm:text-xl" style={{ color: item.color, fontFamily: "Space Grotesk, sans-serif" }}>
                          {item.year}
                        </div>
                        <div className="font-bold text-white text-xs sm:text-sm">{item.platform}</div>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Want to collaborate or{" "}
            <span className="gradient-text">follow our journey?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <GlowButton href="/contact" variant="primary" size="md" className="w-full sm:w-auto">Get in Touch</GlowButton>
            <GlowButton href="/about" variant="outline" size="md" className="w-full sm:w-auto">Read Our Story</GlowButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
