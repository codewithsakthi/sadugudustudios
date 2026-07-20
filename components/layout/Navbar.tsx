"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/games", label: "Games" },
  { href: "/founder", label: "Founder" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/10 py-3 backdrop-blur-md"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/logo.png"
                alt="Sadugudu Studios"
                fill
                className="object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(245,194,66,0.7)]"
              />
            </div>
            <div>
              <div
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase gradient-text"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Sadugudu
              </div>
              <div className="text-[9px] sm:text-[10px] text-white/40 tracking-[0.25em] uppercase -mt-0.5">
                Studios
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs lg:text-sm font-semibold tracking-wider uppercase transition-all duration-300 group ${
                  pathname === link.href
                    ? "text-[#f5c242]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[#ff7a18] to-[#f5c242] transition-all duration-300 ${
                    pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-semibold text-black bg-gradient-to-r from-[#ff7a18] to-[#f5c242] hover:shadow-[0_0_20px_rgba(245,194,66,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Let&apos;s Talk
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white glass hover:border-white/20 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[8999] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 px-6 md:hidden overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg glass text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <div className="relative w-14 h-14 mb-2">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-xl sm:text-2xl font-bold tracking-widest uppercase transition-colors ${
                    pathname === link.href
                      ? "gradient-text"
                      : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <Link
                href="/contact"
                className="px-7 py-3 rounded-full font-bold text-black bg-gradient-to-r from-[#ff7a18] to-[#f5c242] text-base"
                onClick={() => setMobileOpen(false)}
              >
                Let&apos;s Talk
              </Link>
            </motion.div>

            <p className="font-tamil text-[#f5c242]/70 text-xs sm:text-sm mt-2">
              சடுகுடு தொடங்கட்டும்!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
