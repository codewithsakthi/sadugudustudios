"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaInstagram,
  FaDiscord,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
];

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/about" },
      { label: "Games", href: "/games" },
      { label: "Founder", href: "/founder" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#f5c242]/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[200px] sm:h-[300px] rounded-full bg-[#f5c242]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src="/logo.png"
                  alt="Sadugudu Studios"
                  fill
                  className="object-contain group-hover:drop-shadow-[0_0_12px_rgba(245,194,66,0.7)] transition-all duration-300"
                />
              </div>
              <div>
                <div
                  className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase gradient-text"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Sadugudu Studios
                </div>
                <div className="text-[11px] sm:text-xs text-white/40 tracking-wider font-tamil">
                  சடுகுடு தொடங்கட்டும்!
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-sm mb-5">
              Building unforgettable story-driven Tamil games for Roblox, Steam,
              and Epic Games. Where every game begins with a story.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg glass flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 hover:border-[#f5c242]/30"
                >
                  <s.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[11px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#f5c242]/80 mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="text-xs text-white/30">
            © {new Date().getFullYear()} Sadugudu Studios. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40 flex-wrap justify-center">
            <span>Made with</span>
            <span className="text-[#d62828] text-sm">❤</span>
            <span>in Tamil Nadu</span>
            <span className="mx-1.5 text-white/10 hidden sm:inline">|</span>
            <span className="font-tamil text-[#f5c242]/60 tamil-glow text-xs">
              சடுகுடு தொடங்கட்டும்!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
