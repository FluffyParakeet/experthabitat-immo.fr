"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { HERO_POSTER, HERO_VIDEO } from "@/lib/hero-media";
import { ExpertLogo } from "@/components/layout/logo";
import { siteContact } from "@/lib/types";

export function ComingSoonView() {
  const preferReduced = useReducedMotion() ?? false;

  return (
    <section
      className="relative flex min-h-dvh flex-col overflow-hidden"
      role="status"
      aria-label="Bientôt disponible"
    >
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

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 via-black/20 to-transparent sm:h-44"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a0518]/90 via-[#1a0f3d]/56 to-[#0d1420]/92"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_70%_at_50%_40%,rgba(4,1,12,0.6),rgba(5,2,10,0.12)_50%,transparent_70%)]"
          aria-hidden
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center px-5 py-10 text-center sm:px-8">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <div className="[filter:drop-shadow(0_8px_32px_rgba(0,0,0,0.45))]">
            <ExpertLogo variant="onDark" size="lg" className="pointer-events-none" />
          </div>
          <div>
            <h1 className="text-balance font-display text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
              Bientôt en ligne
            </h1>
            <p className="mx-auto mt-4 max-w-md text-balance text-base text-white/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)] sm:text-lg">
              Notre site fait peau neuve. En attendant, vous pouvez aussi nous contacter autrement.
            </p>
            <p className="mt-2 text-sm text-white/60 sm:text-base [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              {siteContact.phone} · {siteContact.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
