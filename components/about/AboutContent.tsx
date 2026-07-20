"use client";

import { motion } from "framer-motion";
import Chapter from "@/components/about/Chapter";

// ── Reusable visual blocks ──────────────────────────────────

function MaduraiVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0800] via-[#0d0500] to-[#050505]" />
      {/* House silhouette */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={i}
            cx={20 + (i * 13) % 360}
            cy={20 + (i * 7) % 180}
            r={1.2}
            fill="white"
            opacity={0.4}
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
        <rect x="145" y="240" width="28" height="24" rx="4" fill="#ff7a18" opacity="0.4" />
        <rect x="227" y="240" width="28" height="24" rx="4" fill="#ff7a18" opacity="0.4" />
        {/* Warm light glow from window */}
        <ellipse cx="159" cy="252" rx="20" ry="15" fill="#ff7a18" opacity="0.08" />
        <ellipse cx="241" cy="252" rx="20" ry="15" fill="#ff7a18" opacity="0.08" />
        {/* Tree */}
        <rect x="60" y="260" width="8" height="60" fill="#0f0500" />
        <ellipse cx="64" cy="240" rx="30" ry="40" fill="#0a0f00" opacity="0.8" />
        <rect x="320" y="270" width="6" height="50" fill="#0f0500" />
        <ellipse cx="323" cy="252" rx="22" ry="30" fill="#0a0f00" opacity="0.8" />
      </svg>
      {/* Warm light overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#ff7a18]/10 blur-3xl pointer-events-none" />
      {/* Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[10px] sm:text-xs text-white/50 tracking-widest uppercase font-tamil bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
          மதுரை — Madurai
        </span>
      </div>
    </div>
  );
}

function TechVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a1a] to-[#050505]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <line x1="50" y1="200" x2="180" y2="200" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="180" y1="200" x2="180" y2="120" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="220" y1="200" x2="350" y2="200" stroke="#f5c242" strokeWidth="1" opacity="0.15" />
        <line x1="200" y1="280" x2="200" y2="360" stroke="#ff7a18" strokeWidth="1" opacity="0.15" />
        <rect x="155" y="130" width="90" height="150" rx="12" fill="#1a1a2e" />
        <rect x="162" y="140" width="76" height="55" rx="4" fill="#16213e" />
        <text x="200" y="172" textAnchor="middle" fill="#f5c242" fontSize="11" fontWeight="bold" opacity="0.8">NOKIA</text>
        <text x="200" y="185" textAnchor="middle" fill="#f5c242" fontSize="8" opacity="0.6">CONNECTING</text>
        {[0,1,2].map((col) =>
          [0,1,2,3].map((row) => (
            <circle
              key={`${col}-${row}`}
              cx={170 + col * 20}
              cy={210 + row * 18}
              r="5"
              fill="#2a2a4a"
            />
          ))
        )}
        <path d="M 100 80 Q 200 50 300 80" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.2" />
        <path d="M 120 100 Q 200 70 280 100" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.15" />
        <path d="M 140 120 Q 200 95 260 120" stroke="#f5c242" strokeWidth="1.5" fill="none" opacity="0.1" />
      </svg>
      <div className="absolute top-4 left-0 right-0 text-center">
        <span className="text-[10px] sm:text-xs text-[#f5c242]/70 tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
          The Digital Dawn
        </span>
      </div>
    </div>
  );
}

function PixelGameVisual() {
  const colors = ["#f5c242", "#ff7a18", "#d62828", "#4a90d9", "#27ae60"];
  const grid = Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 12 }, (_, col) => {
      const val = Math.sin(row * 0.5) * Math.cos(col * 0.3) + (row % 2 === 0 ? 0.3 : 0);
      return val > 0.3 ? colors[(row + col) % colors.length] : null;
    })
  );

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl flex items-center justify-center bg-[#020208]">
      <div className="relative w-40 sm:w-48 h-64 sm:h-72 bg-[#1a1a2e] rounded-2xl border border-[#f5c242]/20 flex flex-col items-center justify-center p-3 shadow-lg">
        <div className="w-32 sm:w-36 h-40 sm:h-44 bg-[#0a0f1a] rounded-lg border border-[#f5c242]/20 p-1 mb-3 overflow-hidden">
          <div className="grid grid-cols-12 gap-0.5 w-full h-full">
            {grid.flat().map((color, i) => (
              <div
                key={i}
                className="aspect-square rounded-[1px]"
                style={{ background: color || "transparent" }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-6 sm:w-7 h-5 sm:h-6 bg-[#2a2a4a] rounded" />
          ))}
        </div>
        <div className="absolute top-2 left-0 right-0 text-center">
          <span className="text-[8px] text-[#f5c242]/60 tracking-widest uppercase font-bold">JAR GAME</span>
        </div>
      </div>
    </div>
  );
}

function RPGVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-[#6a0dad]/30 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0518] via-[#050505] to-[#0a0208]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <circle cx="320" cy="60" r="40" fill="#1a0a30" stroke="#6a0dad" strokeWidth="1" opacity="0.6" />
        <circle cx="315" cy="55" r="36" fill="#0a0518" />
        <line x1="60" y1="350" x2="60" y2="200" stroke="#1a1a2e" strokeWidth="6" />
        <line x1="60" y1="220" x2="30" y2="190" stroke="#1a1a2e" strokeWidth="3" />
        <line x1="60" y1="240" x2="90" y2="210" stroke="#1a1a2e" strokeWidth="3" />
        <line x1="340" y1="350" x2="340" y2="210" stroke="#1a1a2e" strokeWidth="5" />
        <rect x="150" y="180" width="100" height="170" fill="#0f0a20" />
        <rect x="140" y="160" width="30" height="40" fill="#0f0a20" />
        <rect x="230" y="155" width="30" height="45" fill="#0f0a20" />
        <polygon points="140,160 155,130 170,160" fill="#0f0a20" />
        <polygon points="230,155 245,122 260,155" fill="#0f0a20" />
        <rect x="178" y="220" width="20" height="30" rx="10" fill="#6a0dad" opacity="0.6" />
        <rect x="202" y="220" width="20" height="30" rx="10" fill="#6a0dad" opacity="0.6" />
        <text x="200" y="375" textAnchor="middle" fill="#9b59b6" fontSize="13" fontWeight="bold" letterSpacing="2">VAMPIRES DAWN</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function TamilLettersVisual() {
  const letters = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl p-4 flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0505] to-[#050505]" />
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          className="absolute font-tamil font-black pointer-events-none"
          style={{
            left: `${10 + (i % 4) * 22}%`,
            top: `${10 + Math.floor(i / 4) * 26}%`,
            color: i % 3 === 0 ? "#f5c242" : i % 3 === 1 ? "#ff7a18" : "#d62828",
            fontSize: "1.8rem",
            opacity: 0.5,
          }}
          animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.15, repeat: Infinity }}
        >
          {letter}
        </motion.div>
      ))}
      <div className="relative z-10 mt-auto glass-gold rounded-xl p-3 sm:p-4 border border-[#f5c242]/30">
        <p className="font-tamil text-[#f5c242] text-xs sm:text-sm leading-relaxed font-semibold">
          &ldquo;உங்கள் கதை தொடங்குகிறது...&rdquo;
        </p>
        <p className="text-white/40 text-[10px] sm:text-xs mt-1">Your story begins...</p>
      </div>
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050a10] to-[#050505]" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <rect x="80" y="100" width="240" height="160" rx="8" fill="#0f1923" stroke="#1a2a3a" strokeWidth="2" />
        <rect x="90" y="110" width="220" height="140" rx="4" fill="#040d18" />
        <text x="200" y="190" textAnchor="middle" fill="#ff7a18" fontSize="28" opacity="0.8">▶</text>
        <rect x="100" y="118" width="32" height="14" rx="3" fill="#d62828" />
        <text x="116" y="128" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">LIVE</text>
        <rect x="185" y="260" width="30" height="20" fill="#0f1923" />
        <rect x="160" y="278" width="80" height="8" rx="4" fill="#0f1923" />
        {[-80, -30, 20, 70].map((x, i) => (
          <g key={i} transform={`translate(${200 + x}, 330)`}>
            <circle cx="0" cy="-20" r="12" fill={i % 2 === 0 ? "#1a3a5a" : "#2a1a3a"} />
            <rect x="-8" y="-8" width="16" height="20" rx="4" fill={i % 2 === 0 ? "#1a2a4a" : "#2a1a4a"} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function RoadmapVisual() {
  const platforms = [
    { name: "Roblox", year: "2026", color: "#d62828", icon: "🎮" },
    { name: "Steam", year: "2027", color: "#1b2838", icon: "🖥" },
    { name: "Epic Games", year: "2028", color: "#2d2d2d", icon: "⚡" },
    { name: "Console", year: "Near", color: "#003791", icon: "🎯" },
    { name: "Global", year: "Future", color: "#f5c242", icon: "🌍" },
  ];

  return (
    <div className="relative rounded-2xl p-4 sm:p-6 max-w-[300px] sm:max-w-sm md:max-w-md mx-auto w-full glass border border-white/10 shadow-2xl">
      <div className="space-y-3">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 + 0.1, duration: 0.4 }}
            className="flex items-center gap-3 p-2.5 rounded-xl glass hover:border-white/20 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 border"
              style={{ borderColor: `${p.color}50`, background: `${p.color}20` }}
            >
              {p.icon}
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {p.name}
              </div>
              <div className="text-[10px] text-white/40">{p.year}</div>
            </div>
            <div className="ml-auto">
              <span
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                style={{ color: "#f5c242", background: "rgba(245,194,66,0.15)" }}
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
    <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full border border-white/10 shadow-2xl flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0500] to-[#050505]" />
      <div className="relative flex items-center justify-center">
        <div className="w-36 sm:w-44 h-36 sm:h-44 rounded-full border border-[#f5c242]/30 flex items-center justify-center">
          <div className="w-24 sm:w-30 h-24 sm:h-30 rounded-full border border-[#f5c242]/20 flex items-center justify-center">
            <span className="font-tamil text-[#f5c242] text-3xl sm:text-4xl font-black tamil-glow">ச</span>
          </div>
        </div>
      </div>
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
      <div className="relative rounded-2xl p-5 sm:p-6 glass border border-[#f5c242]/20 max-w-[280px] sm:max-w-sm md:max-w-md mx-auto w-full shadow-2xl">
        {[
          { icon: "💰", label: "Affordable Pricing", desc: "Games for every pocket" },
          { icon: "❤️", label: "Emotional Stories", desc: "Built to make you feel" },
          { icon: "🏛️", label: "Tamil Identity", desc: "Proudly rooted in culture" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="flex items-center gap-3.5 mb-4 last:mb-0"
          >
            <span className="text-2xl sm:text-3xl">{item.icon}</span>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.label}</div>
              <div className="text-white/50 text-[10px] sm:text-xs">{item.desc}</div>
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
    <div className="pt-20 sm:pt-24">
      {/* Hero */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0503] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-[#f5c242]/4 blur-[100px] sm:blur-[120px]" />
        <div className="grid-lines absolute inset-0 opacity-15" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#f5c242]/70 font-semibold block mb-3 sm:mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 sm:mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Every Great{" "}
            <span className="gradient-text">Adventure</span>
            <br />
            Begins Somewhere.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto"
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
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#080205]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-[#d62828]/5 blur-[120px] sm:blur-[150px]" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="font-tamil text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#f5c242] tamil-glow"
          >
            சடுகுடு தொடங்கட்டும்!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/40 text-xs sm:text-sm md:text-base mt-4 sm:mt-6 tracking-widest uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Let the Game Begin
          </motion.p>
        </div>
      </section>
    </div>
  );
}
