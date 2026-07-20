"use client";

import { motion } from "framer-motion";
import Chapter from "@/components/about/Chapter";

// ── Reusable visual blocks ──────────────────────────────────

function MaduraiVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0800] via-[#0d0500] to-[#050505]" />
      {/* House silhouette */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={20 + Math.random() * 360}
            cy={20 + Math.random() * 180}
            r={Math.random() * 1.5 + 0.5}
            fill="white"
            opacity={Math.random() * 0.6 + 0.2}
          />
        ))}
        {/* Moon */}
        <circle cx="340" cy="50" r="20" fill="#f5c242" opacity="0.5" />
        <circle cx="350" cy="45" r="18" fill="#0d0500" />
        {/* Ground */}
        <rect x="0" y="320" width="400" height="80" fill="#0a0300" />
        {/* House body */}
        <rect x="130" y="220" width="140" height="100" fill="#150800" />
        {/* Roof */}
        <polygon points="110,220 200,140 290,220" fill="#1a0a00" />
        {/* Door */}
        <rect x="178" y="268" width="44" height="52" rx="22" fill="#0a0300" />
        {/* Windows */}
        <rect x="145" y="240" width="28" height="24" rx="4" fill="#ff7a18" opacity="0.3" />
        <rect x="227" y="240" width="28" height="24" rx="4" fill="#ff7a18" opacity="0.3" />
        {/* Warm light glow from window */}
        <ellipse cx="159" cy="252" rx="20" ry="15" fill="#ff7a18" opacity="0.05" />
        <ellipse cx="241" cy="252" rx="20" ry="15" fill="#ff7a18" opacity="0.05" />
        {/* Tree */}
        <rect x="60" y="260" width="8" height="60" fill="#0f0500" />
        <ellipse cx="64" cy="240" rx="30" ry="40" fill="#0a0f00" opacity="0.8" />
        <rect x="320" y="270" width="6" height="50" fill="#0f0500" />
        <ellipse cx="323" cy="252" rx="22" ry="30" fill="#0a0f00" opacity="0.8" />
      </svg>
      {/* Warm light overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#ff7a18]/10 blur-3xl" />
      {/* Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-xs text-white/30 tracking-widest uppercase font-tamil">மதுரை — Madurai</span>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
    </div>
  );
}

function TechVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a1a] to-[#050505]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Circuit lines */}
        <line x1="50" y1="200" x2="180" y2="200" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="180" y1="200" x2="180" y2="120" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="220" y1="200" x2="350" y2="200" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="200" y1="280" x2="200" y2="360" stroke="#ff7a18" strokeWidth="1" opacity="0.15" />
        {/* Old Nokia phone */}
        <rect x="155" y="130" width="90" height="150" rx="12" fill="#1a1a2e" />
        <rect x="162" y="140" width="76" height="55" rx="4" fill="#0f3460" />
        {/* Screen glow */}
        <rect x="162" y="140" width="76" height="55" rx="4" fill="#16213e" />
        <text x="200" y="172" textAnchor="middle" fill="#f5c242" fontSize="10" opacity="0.7">Nokia</text>
        <text x="200" y="185" textAnchor="middle" fill="#f5c242" fontSize="8" opacity="0.5">3310</text>
        {/* Keypad dots */}
        {[0,1,2].map((col) =>
          [0,1,2,3].map((row) => (
            <circle
              key={`${col}-${row}`}
              cx={170 + col * 20}
              cy={210 + row * 18}
              r="6"
              fill="#2a2a4a"
            />
          ))
        )}
        {/* Internet waves */}
        <path d="M 100 80 Q 200 50 300 80" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.2" />
        <path d="M 120 100 Q 200 70 280 100" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.15" />
        <path d="M 140 120 Q 200 95 260 120" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.1" />
      </svg>
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
      <div className="absolute top-4 left-0 right-0 text-center">
        <span className="text-xs text-[#f5c242]/30 tracking-widest uppercase">The Digital Dawn</span>
      </div>
    </div>
  );
}

function PixelGameVisual() {
  const colors = ["#f5c242", "#ff7a18", "#d62828", "#4a90d9", "#27ae60"];
  const grid = Array.from({ length: 16 }, (_, row) =>
    Array.from({ length: 16 }, (_, col) => {
      const val = Math.sin(row * 0.5) * Math.cos(col * 0.3) + Math.random() * 0.3;
      return val > 0.2 ? colors[Math.floor(Math.random() * colors.length)] : null;
    })
  );

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-[#020208]" />
      {/* Old phone frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-48 h-72 bg-[#1a1a2e] rounded-2xl border border-[#f5c242]/20 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(245,194,66,0.1)]">
          {/* Screen */}
          <div className="w-36 h-44 bg-[#0a0f1a] rounded-lg border border-[#f5c242]/10 p-1 mb-3 overflow-hidden">
            {/* Pixel art grid */}
            <div className="grid grid-cols-16 gap-0 w-full h-full" style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)" }}>
              {grid.flat().map((color, i) => (
                <div
                  key={i}
                  className="aspect-square"
                  style={{ background: color || "transparent" }}
                />
              ))}
            </div>
          </div>
          {/* Keys */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-7 h-6 bg-[#2a2a4a] rounded" />
            ))}
          </div>
          {/* JAD label */}
          <div className="absolute top-2 left-0 right-0 text-center">
            <span className="text-[8px] text-[#f5c242]/40 tracking-widest">JAR GAME</span>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-[#f5c242]/5 blur-3xl" />
      </div>
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
    </div>
  );
}

function RPGVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0518] via-[#050505] to-[#0a0208]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Moon / dark atmosphere */}
        <circle cx="320" cy="60" r="40" fill="#1a0a30" stroke="#6a0dad" strokeWidth="1" opacity="0.6" />
        <circle cx="315" cy="55" r="36" fill="#0a0518" />
        {/* Dead trees */}
        <line x1="60" y1="350" x2="60" y2="200" stroke="#1a1a2e" strokeWidth="6" />
        <line x1="60" y1="220" x2="30" y2="190" stroke="#1a1a2e" strokeWidth="3" />
        <line x1="60" y1="240" x2="90" y2="210" stroke="#1a1a2e" strokeWidth="3" />
        <line x1="340" y1="350" x2="340" y2="210" stroke="#1a1a2e" strokeWidth="5" />
        <line x1="340" y1="230" x2="310" y2="205" stroke="#1a1a2e" strokeWidth="2.5" />
        {/* Castle silhouette */}
        <rect x="150" y="180" width="100" height="170" fill="#0f0a20" />
        <rect x="140" y="160" width="30" height="40" fill="#0f0a20" />
        <rect x="230" y="155" width="30" height="45" fill="#0f0a20" />
        <polygon points="140,160 155,130 170,160" fill="#0f0a20" />
        <polygon points="230,155 245,122 260,155" fill="#0f0a20" />
        {/* Glowing windows */}
        <rect x="178" y="220" width="20" height="30" rx="10" fill="#6a0dad" opacity="0.5" />
        <rect x="202" y="220" width="20" height="30" rx="10" fill="#6a0dad" opacity="0.5" />
        {/* Ground mist */}
        <ellipse cx="200" cy="350" rx="200" ry="20" fill="#6a0dad" opacity="0.04" />
        {/* Title text */}
        <text x="200" y="380" textAnchor="middle" fill="#6a0dad" fontSize="14" opacity="0.5" fontFamily="serif">VAMPIRES DAWN</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      <div className="absolute inset-0 rounded-2xl border border-[#6a0dad]/20" />
    </div>
  );
}

function TamilLettersVisual() {
  const letters = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0505] to-[#050505]" />
      {/* Scattered Tamil letters */}
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          className="absolute font-tamil font-black"
          style={{
            left: `${10 + (i % 4) * 24}%`,
            top: `${10 + Math.floor(i / 4) * 30}%`,
            color: i % 3 === 0 ? "#f5c242" : i % 3 === 1 ? "#ff7a18" : "#d62828",
            fontSize: `${2 + Math.random() * 1.5}rem`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
          animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, delay: i * 0.2, repeat: Infinity }}
        >
          {letter}
        </motion.div>
      ))}
      {/* Dialogue box */}
      <div className="absolute bottom-8 left-6 right-6 glass-gold rounded-xl p-4 border border-[#f5c242]/20">
        <p className="font-tamil text-[#f5c242] text-sm leading-relaxed">
          &ldquo;உங்கள் கதை தொடங்குகிறது...&rdquo;
        </p>
        <p className="text-white/30 text-xs mt-1">Your story begins...</p>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a10] to-[#050505]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Monitor */}
        <rect x="80" y="100" width="240" height="160" rx="8" fill="#0f1923" stroke="#1a2a3a" strokeWidth="2" />
        <rect x="90" y="110" width="220" height="140" rx="4" fill="#0a1520" />
        {/* Screen content - streaming */}
        <rect x="95" y="115" width="210" height="130" rx="3" fill="#040d18" />
        <text x="200" y="190" textAnchor="middle" fill="#ff7a18" fontSize="28" opacity="0.7">▶</text>
        {/* Live badge */}
        <rect x="100" y="118" width="30" height="12" rx="3" fill="#d62828" />
        <text x="115" y="127" textAnchor="middle" fill="white" fontSize="7">LIVE</text>
        {/* Chat messages */}
        <rect x="250" y="120" width="50" height="8" rx="3" fill="#1a3a2a" opacity="0.8" />
        <rect x="255" y="132" width="40" height="8" rx="3" fill="#1a2a3a" opacity="0.8" />
        <rect x="248" y="144" width="52" height="8" rx="3" fill="#1a3a2a" opacity="0.8" />
        {/* Stand */}
        <rect x="185" y="260" width="30" height="20" fill="#0f1923" />
        <rect x="160" y="278" width="80" height="8" rx="4" fill="#0f1923" />
        {/* People */}
        {[-80, -30, 20, 70].map((x, i) => (
          <g key={i} transform={`translate(${200 + x}, 330)`}>
            <circle cx="0" cy="-20" r="12" fill={i % 2 === 0 ? "#1a3a5a" : "#2a1a3a"} />
            <rect x="-8" y="-8" width="16" height="20" rx="4" fill={i % 2 === 0 ? "#1a2a4a" : "#2a1a4a"} />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
    </div>
  );
}

function RoadmapVisual() {
  const platforms = [
    { name: "Roblox", year: "2026", color: "#d62828", icon: "🎮" },
    { name: "Steam", year: "2027", color: "#1b2838", iconColor: "#66c0f4", icon: "🖥" },
    { name: "Epic Games", year: "2028", color: "#2d2d2d", icon: "⚡" },
    { name: "Console", year: "Near", color: "#003791", icon: "🎯" },
    { name: "Global", year: "Future", color: "#f5c242", icon: "🌍" },
  ];

  return (
    <div className="relative rounded-2xl p-6 max-w-md mx-auto glass border border-white/5">
      <div className="relative">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            className="flex items-center gap-4 mb-4 last:mb-0 group"
          >
            {/* Line */}
            {i < platforms.length - 1 && (
              <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-[#f5c242]/30 to-transparent" style={{ top: `${i * 72 + 40}px`, height: "48px" }} />
            )}
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border group-hover:scale-110 transition-transform duration-300"
              style={{ borderColor: `${p.color}40`, background: `${p.color}15` }}
            >
              {p.icon}
            </div>
            {/* Info */}
            <div>
              <div className="font-bold text-white text-base" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {p.name}
              </div>
              <div className="text-xs text-white/40">{p.year}</div>
            </div>
            {/* Year badge */}
            <div className="ml-auto">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ color: p.color === "#f5c242" ? "#050505" : p.color === "#66c0f4" ? "#66c0f4" : "#f5c242", background: `${p.color}20` }}
              >
                {p.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VisionFinalVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0500] to-[#050505]" />
      {/* World/Globe concept */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 rounded-full border border-[#f5c242]/20 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border border-[#f5c242]/10 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#f5c242]/5 flex items-center justify-center">
                <span className="font-tamil text-[#f5c242] text-4xl font-black tamil-glow">ச</span>
              </div>
            </div>
          </div>
          {/* Orbiting dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: i % 2 === 0 ? "#f5c242" : "#ff7a18",
                top: "50%",
                left: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  transform: `rotate(${deg}deg) translateX(100px)`,
                  background: i % 2 === 0 ? "#f5c242" : "#ff7a18",
                  boxShadow: `0 0 8px ${i % 2 === 0 ? "#f5c242" : "#ff7a18"}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-xs text-[#f5c242]/30 tracking-widest uppercase">Global Vision</span>
      </div>
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
    </div>
  );
}

// ── Chapters data ────────────────────────────────────────────

const chapters = [
  {
    number: "01",
    title: "Every Great Adventure Begins Somewhere",
    subtitle: "Madurai, Tamil Nadu",
    body: "In the warm streets of Madurai, under the shadow of ancient temples, a child grew up with a heart full of stories. No fancy gadgets, no gaming PC — just imagination, endless curiosity, and a deep love for tales of heroes and worlds beyond. Every childhood game played in those narrow streets was a universe unto itself. The first adventure didn't need a screen.",
    visual: <MaduraiVisual />,
    reverse: false,
    bgClass: "chapter-bg-madurai",
    accentColor: "#ff7a18",
  },
  {
    number: "02",
    title: "Technology Arrives at the Doorstep",
    subtitle: "The Digital Awakening",
    body: "Then came the day a father brought home a phone — not just any phone, but a gateway to the future. The early internet was mysterious and magical. Web pages loaded slowly on a thin GPRS connection, but every page was a revelation. This was the moment curiosity became something bigger — a hunger to understand how technology worked, and what it could create.",
    visual: <TechVisual />,
    reverse: true,
    bgClass: "chapter-bg-tech",
    accentColor: "#f5c242",
  },
  {
    number: "03",
    title: "The Keypad Era",
    subtitle: "JAR Games & Pixel Dreams",
    body: "On the old Nokia keypad phone lived tiny worlds — JAR and JAD games with pixel characters, chiptune music, and gameplay that demanded everything from a T9 keypad. Those 128x160 pixel screens contained universes. The first experience of interactive storytelling happened not on a console, but on a Nokia. Those tiny games planted a giant seed.",
    visual: <PixelGameVisual />,
    reverse: false,
    bgClass: "",
    accentColor: "#f5c242",
  },
  {
    number: "04",
    title: "Vampires Dawn",
    subtitle: "The RPG That Changed Everything",
    body: "Then came Vampires Dawn — an old RPG that completely rewired the brain. Not because of graphics, not because of spectacle, but because of story. A narrative so gripping, characters so human, choices that actually mattered. It proved that games could be more than entertainment. They could be literature. They could make you feel things words alone could not.",
    visual: <RPGVisual />,
    reverse: true,
    bgClass: "",
    accentColor: "#9b59b6",
  },
  {
    number: "05",
    title: "Why Tamil Games?",
    subtitle: "A Question That Became a Mission",
    body: "Playing games in English, navigating worlds built for someone else's culture — and realizing something was missing. Tamil culture is rich with mythology, folklore, and emotion. Tamil people feel deeply. Tamil stories deserve to be told. The question became: why are there no games that speak our language, feature our heroes, and reflect our world? That question had no good answer. So we decided to build one.",
    visual: <TamilLettersVisual />,
    reverse: false,
    bgClass: "chapter-bg-madurai",
    accentColor: "#d62828",
  },
  {
    number: "06",
    title: "Tamil Gaming Inspiration",
    subtitle: "A Community Waiting to Be Born",
    body: "Watching Tamil gaming streamers, seeing Tamil players consume content with joy but no homegrown games to call their own — this was the fuel. A vibrant community existed, hungry for games that spoke to them. Tamil Nadu has millions of gamers. They play. They stream. They love games. But they've never had a studio that truly built for them, in their language, about their world.",
    visual: <CommunityVisual />,
    reverse: true,
    bgClass: "chapter-bg-tech",
    accentColor: "#ff7a18",
  },
  {
    number: "07",
    title: "Why Sadugudu Exists",
    subtitle: "Affordable. Emotional. Tamil.",
    body: "Sadugudu Studios was born from a single belief: every Tamil player deserves a game they can afford, understand, and feel proud of. Not a clone of western games. Not a cheap mobile title. Real games — story-driven, emotionally resonant, culturally proud — that happen to cost less than a meal. We exist to prove that great games don't need a billion-dollar budget. They need heart.",
    visual: (
      <div className="relative rounded-2xl p-8 glass border border-[#f5c242]/15 max-w-md mx-auto">
        {[
          { icon: "💰", label: "Affordable Pricing", desc: "Games for every pocket" },
          { icon: "❤️", label: "Emotional Stories", desc: "Built to make you feel" },
          { icon: "🏛️", label: "Tamil Identity", desc: "Proudly rooted in culture" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 + 0.3 }}
            className="flex items-center gap-4 mb-6 last:mb-0"
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.label}</div>
              <div className="text-white/40 text-xs">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    ),
    reverse: false,
    bgClass: "",
    accentColor: "#f5c242",
  },
  {
    number: "08",
    title: "Our Vision",
    subtitle: "Roblox → Steam → Epic → Console → Global",
    body: "The journey doesn't end at one platform. Sadugudu Studios is building a ladder — from Roblox to Steam, from Steam to Epic Games, from Epic to consoles, and ultimately to global recognition. Each platform is a chapter. Each game is a proof of concept. Each Tamil player who finds us is a validation. The goal is nothing less than putting Tamil storytelling on every gaming screen in the world.",
    visual: <RoadmapVisual />,
    reverse: true,
    bgClass: "chapter-bg-vision",
    accentColor: "#f5c242",
  },
];

export default function AboutContent() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0503] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#f5c242]/4 blur-[120px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.4em] uppercase text-[#f5c242]/60 block mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Every Great{" "}
            <span className="gradient-text">Adventure</span>
            <br />
            Begins Somewhere.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            This is the story of Sadugudu Studios — from a small house in Madurai
            to building games for the world.
          </motion.p>
        </div>
      </section>

      {/* Chapters */}
      {chapters.map((chapter) => (
        <Chapter key={chapter.number} {...chapter} />
      ))}

      {/* Final Tamil section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#080205]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#d62828]/5 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-[#f5c242]/4 blur-[100px]" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-tamil text-6xl md:text-8xl lg:text-9xl font-black text-[#f5c242] tamil-glow"
          >
            சடுகுடு தொடங்கட்டும்!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-white/30 text-lg mt-6 tracking-widest uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let the Game Begin
          </motion.p>
        </div>
      </section>
    </div>
  );
}
