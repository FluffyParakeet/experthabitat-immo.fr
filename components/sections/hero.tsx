"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { HERO_POSTER, HERO_VIDEO } from "@/lib/hero-media";
import { HeroPropertySearch } from "@/components/hero/hero-property-search";

const statTargets = [
  { kind: "y" as const, target: 20, label1: "ans d’expérience" },
  { kind: "n" as const, target: 200, label1: "transactions réalisées", plus: true as const },
  { kind: "p" as const, target: 98, label1: "de clients satisfaits" },
] as const;

function useCountTo(tar: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t = 0;
    const step = Math.max(1, Math.floor(tar / 30));
    const id = setInterval(() => {
      t = Math.min(tar, t + step);
      setV(t);
      if (t >= tar) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [active, tar]);
  return v;
}

function StatItem({ kind, target, label1, plus }: (typeof statTargets)[number] & { plus?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [a, setA] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setA(true)),
      { threshold: 0.15 },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const c = useCountTo(target, a);
  if (kind === "y") {
    return (
      <div ref={ref} className="text-center">
        <p className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl">
          {c}
        </p>
        <p className="mt-2 text-xs font-medium text-white/70 sm:text-sm md:text-base">{label1}</p>
      </div>
    );
  }
  const num = kind === "p" ? `${c}%` : plus ? (c >= target ? `${c}+` : c) : c;
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl md:text-4xl">{num}</p>
      <p className="mt-2 text-xs font-medium text-white/70 sm:text-sm md:text-base">{label1}</p>
    </div>
  );
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export function HeroSection() {
  const preferReduced = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        {preferReduced ? (
          <Image
            src={HERO_POSTER}
            alt=""
            fill
            className="object-cover object-[center_35%]"
            priority
            sizes="100vw"
          />
        ) : (
          <video
            className="absolute left-1/2 top-1/2 h-[110%] min-h-full w-[110%] min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-[center_36%]"
            style={{ filter: "brightness(0.72) saturate(0.9)" }}
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_POSTER}
            aria-hidden
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}

        {/** Scrim haut : zone sous le menu (fixed) moins sujette aux hautes lumières de la vidéo. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 via-black/20 to-transparent sm:h-44"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0518]/90 via-[#1a0f3d]/56 to-[#0d1420]/92"
          aria-hidden
        />
        {/** Un seul voile radial pour le centre (titres) — moins de calques = contraste plus stable. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_92%_68%_at_50%_42%,rgba(4,1,12,0.55),rgba(5,2,10,0.1)_50%,transparent_70%)]"
          aria-hidden
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
        {/** Fondation vers le corps de page : hauteur large + .hero-fade-to-page (globals.css) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] min-h-[9rem] h-[min(38vh,26rem)] max-h-[32rem] hero-fade-to-page"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5 pb-8 pt-[max(4.5rem,env(safe-area-inset-top,0px)+3rem)] text-center sm:max-w-5xl sm:px-8 sm:pb-12 sm:pt-28">
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.5)] sm:text-5xl sm:leading-[1.06] md:text-6xl md:leading-[1.05] lg:text-[3.4rem] lg:tracking-[-0.035em]">
            <motion.span
              className="block"
              {...fadeUp}
              transition={{ duration: preferReduced ? 0.01 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Votre projet immobilier,
            </motion.span>
            <motion.span
              className="mt-1 block sm:mt-1.5"
              {...fadeUp}
              transition={{
                delay: preferReduced ? 0 : 0.12,
                duration: preferReduced ? 0.01 : 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              notre engagement personnel.
            </motion.span>
          </h1>
          <motion.p
            {...fadeUp}
            transition={{
              delay: preferReduced ? 0 : 0.22,
              duration: preferReduced ? 0.01 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/70 sm:mt-10 sm:text-base"
          >
            <Link
              href="/estimation"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-medium text-white/95 transition hover:border-white/35 hover:bg-white/10"
            >
              Estimer mon bien
            </Link>
            <span className="text-white/30" aria-hidden>
              |
            </span>
            <Link
              href="/biens"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-medium text-white/95 transition hover:border-white/35 hover:bg-white/10"
            >
              Tous les biens
            </Link>
          </motion.p>
        </div>

        <div className="relative z-10 mt-auto w-full px-5 pb-8 sm:px-7 sm:pb-10">
          <div className="mx-auto w-full max-w-5xl">
            <motion.div
              className="hero-surface"
              initial={preferReduced ? false : { opacity: 0, y: 40 }}
              animate={preferReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                delay: preferReduced ? 0 : 0.22,
                duration: preferReduced ? 0 : 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-9">
                <HeroPropertySearch embedded />
              </div>
              <div
                className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                aria-hidden
              />
              <div className="px-5 py-6 sm:px-7 sm:py-7 md:px-9">
                <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/45 sm:mb-6 sm:text-sm">
                  En quelques chiffres
                </p>
                <div className="grid grid-cols-2 items-start justify-items-center gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 md:gap-6">
                  {statTargets.map((s) => (
                    <StatItem key={s.label1} {...s} />
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="mt-6 flex flex-col items-center justify-center gap-1.5 sm:mt-7">
              <span className="text-xs font-medium text-white/55 sm:text-sm">Découvrir la suite</span>
              <motion.a
                href="#services"
                aria-label="Aller aux services"
                animate={!preferReduced ? { y: [0, 6, 0] } : { y: 0 }}
                transition={
                  !preferReduced
                    ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                    : { duration: 0 }
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <ChevronDown className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
