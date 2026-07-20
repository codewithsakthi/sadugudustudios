"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECRET_CODE = "sadugudu";

export default function EasterEgg() {
  const [typed, setTyped] = useState("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key.length !== 1 || !/[a-z]/.test(key)) {
        setTyped("");
        return;
      }

      setTyped((prev) => {
        const next = (prev + key).slice(-SECRET_CODE.length);
        if (next === SECRET_CODE) {
          setShow(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setShow(false), 4000);
        }
        return next;
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99990] pointer-events-none flex items-center justify-center"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Burst particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? "#f5c242" : i % 3 === 1 ? "#ff7a18" : "#d62828",
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i / 20) * Math.PI * 2) * (100 + Math.random() * 200),
                y: Math.sin((i / 20) * Math.PI * 2) * (100 + Math.random() * 200),
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}

          {/* Main message */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
            className="relative z-10 text-center px-8"
          >
            {/* Glow bg */}
            <div className="absolute inset-0 bg-[#f5c242]/10 rounded-3xl blur-3xl scale-150" />

            <div className="relative glass-gold rounded-3xl p-10 border border-[#f5c242]/30">
              {/* Tamil header */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-tamil text-5xl md:text-7xl font-black text-[#f5c242] tamil-glow mb-4"
              >
                சடுகுடு தொடங்கட்டும்!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 text-lg font-medium mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                🎮 You found the secret! You&apos;re one of us.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-[#f5c242] to-transparent rounded-full"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-white/30 text-xs tracking-widest uppercase mt-4"
              >
                Where Every Game Begins With A Story
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
