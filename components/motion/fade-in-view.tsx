"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { homeTransition, homeViewport } from "@/lib/motion-home";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  scale?: boolean;
};

/**
 * Bloc ou titre qui apparaît à l’entrée dans le viewport (page d’accueil).
 * Respecte prefers-reduced-motion.
 */
export function FadeInView({ children, className, y = 18, delay = 0, duration = 0.5, scale = false }: Props) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale: scale ? 0.98 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={homeViewport}
      transition={homeTransition(delay, reduced, duration)}
    >
      {children}
    </motion.div>
  );
}
