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
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub", color: "#fff" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "#ff0000" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "#e1306c" },
  { icon: FaDiscord, href: "https://discord.com", label: "Discord", color: "#5865f2" },
  { icon: FaXTwitter, href: "https://x.com", label: "X", color: "#fff" },
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#f5c242]/30 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-[#f5c242]/3 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Sadugudu Studios"
                  fill
                  className="object-contain group-hover:drop-shadow-[0_0_12px_rgba(245,194,66,0.7)] transition-all duration-300"
                />
              </div>
              <div>
                <div
                  className="text-base font-bold tracking-[0.2em] uppercase gradient-text"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Sadugudu Studios
                </div>
                <div className="text-xs text-white/40 tracking-wider font-tamil">
                  சடுகுடு தொடங்கட்டும்!
                </div>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Building unforgettable story-driven Tamil games for Roblox, Steam,
              and Epic Games. Where every game begins with a story.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200 hover:border-[#f5c242]/30"
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs font-bold tracking-[0.3em] uppercase text-[#f5c242]/70 mb-5"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200 hover:translate-x-1 inline-block"
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
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/25 text-center md:text-left">
            © {new Date().getFullYear()} Sadugudu Studios. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-xs text-white/25">
            <span>Made with</span>
            <span className="text-[#d62828] text-sm">❤</span>
            <span>in Tamil Nadu</span>
            <span className="mx-2 text-white/10">|</span>
            <span className="font-tamil text-[#f5c242]/40 tamil-glow">
              சடுகுடு தொடங்கட்டும்!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
