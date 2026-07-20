"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const trailSpringConfig = { damping: 30, stiffness: 200 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothTrailX = useSpring(trailX, trailSpringConfig);
  const smoothTrailY = useSpring(trailY, trailSpringConfig);

  const isHovering = useRef(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      );
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[99998] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[#f5c242] mix-blend-difference" />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[99997] hidden md:block"
        style={{
          x: smoothTrailX,
          y: smoothTrailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-8 h-8 rounded-full border border-[#f5c242]/40 bg-transparent" />
      </motion.div>

      {/* Mouse glow spotlight */}
      <motion.div
        className="fixed pointer-events-none z-[99996] hidden md:block"
        style={{
          x: smoothTrailX,
          y: smoothTrailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-[300px] h-[300px] rounded-full bg-[#f5c242]/3 blur-[80px]" />
      </motion.div>
    </>
  );
}
