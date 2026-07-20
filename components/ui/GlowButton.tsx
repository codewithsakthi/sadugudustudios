"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ReactNode, useRef } from "react";

interface GlowButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
}

export default function GlowButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: GlowButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#ff7a18] to-[#f5c242] text-black font-bold hover:shadow-[0_0_30px_rgba(245,194,66,0.5)]",
    secondary:
      "bg-[#1a1a1a] text-white border border-white/10 hover:border-[#f5c242]/40 hover:shadow-[0_0_20px_rgba(245,194,66,0.15)]",
    outline:
      "bg-transparent text-[#f5c242] border border-[#f5c242]/50 hover:bg-[#f5c242]/5 hover:border-[#f5c242] hover:shadow-[0_0_20px_rgba(245,194,66,0.2)]",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={`magnetic-btn inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
    return (
      <Link href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  return content;
}
