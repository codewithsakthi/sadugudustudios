"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#f5c242]/5 blur-[120px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-[#ff7a18]/5 blur-[80px]" />
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 grid-lines opacity-30" />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-8 z-10"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.png"
                alt="Sadugudu Studios Logo"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(245,194,66,0.5)]"
                priority
              />
            </div>
            {/* Rotating ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border border-[#f5c242]/20 animate-spin-slow" />
            </div>
          </motion.div>

          {/* Studio name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="z-10 text-center mb-2"
          >
            <h1
              className="text-2xl md:text-3xl font-bold tracking-[0.4em] uppercase"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="gradient-text">SADUGUDU</span>
              <span className="text-white/60 ml-2">STUDIOS</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-tamil text-[#f5c242]/70 text-sm mb-12 z-10"
          >
            சடுகுடு தொடங்கட்டும்!
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-64 md:w-80 z-10"
          >
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full loading-bar rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/30 tracking-widest uppercase">
                Loading
              </span>
              <span className="text-xs text-[#f5c242]/70 font-mono">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f5c242]/20 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
