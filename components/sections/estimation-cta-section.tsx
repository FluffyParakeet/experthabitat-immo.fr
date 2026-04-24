"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/motion/fade-in-view";

export function EstimationCtaSection() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f5c] via-brand-violet to-brand-pink" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, white 0%, transparent 25%), radial-gradient(circle at 80% 80%, white 0%, transparent 22%)`,
        }}
      />
      <motion.div
        className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand-pink/30 blur-3xl"
        animate={
          reduced ? { scale: 1, opacity: 0.55 } : { scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }
        }
        transition={
          reduced
            ? { duration: 0.01 }
            : { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        animate={reduced ? { y: 0 } : { y: [0, 20, 0] }}
        transition={
          reduced
            ? { duration: 0.01 }
            : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      <FadeInView
        className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-7"
        y={20}
        duration={0.55}
      >
        <p className="mb-3 inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 sm:mb-4 sm:text-base">
          <Sparkles className="h-4 w-4 text-white/90" />
          Estimation offerte
        </p>
        <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Combien vaut vraiment votre bien ?
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/92 sm:mt-6 sm:text-lg">
          Comparaison avec le terrain, visite si c’est utile, chiffrage clair, sans pression
          inutile.
        </p>
        <Button
          asChild
          className="mt-9 h-12 rounded-full bg-white px-8 text-base font-semibold text-brand-violet shadow-xl transition hover:scale-[1.02] hover:bg-white/95"
        >
          <Link href="/estimation">Demander mon estimation</Link>
        </Button>
      </FadeInView>
    </section>
  );
}
