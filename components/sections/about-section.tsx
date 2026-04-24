"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeartHandshake, Mail, Phone } from "lucide-react";
import { siteContact } from "@/lib/types";
import { imagePlaceholderBlur } from "@/lib/image-blur";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/motion/fade-in-view";
import { homeTransition, homeViewport } from "@/lib/motion-home";
import { useReducedMotion } from "framer-motion";

export function AboutSection() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section
      id="a-propos"
      className="scroll-mt-20 border-t border-white/60 section-padding-y"
    >
      <div className="page-container">
        <FadeInView>
          <SectionHeader
            eyebrow="Votre interlocuteur"
            title="Une relation de confiance, pas un numéro de dossier"
          />
        </FadeInView>
        <div className="mt-16 grid w-full min-w-0 grid-cols-1 items-start gap-12 sm:mt-20 md:grid-cols-2 md:gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full min-w-0 max-w-md pb-14 sm:pb-16 lg:max-w-lg"
          >
            <div className="absolute -right-3 -top-3 h-32 w-32 rounded-full bg-brand-pink/20 blur-2xl" />
            <div className="relative">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-brand-pink/50 via-brand-violet/30 to-brand-violet/50 p-[2px]">
                <div className="h-full w-full rounded-[2.4rem] bg-brand-dark/5" />
              </div>
              <div className="relative aspect-[3/4] w-[88%] overflow-hidden rounded-[2.2rem] shadow-card">
                <Image
                  src="/aurelien-sabe.png"
                  alt="Aurélien Sabé, agent immobilier indépendant à Marcq-en-Barœul"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={imagePlaceholderBlur}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1035]/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/95 p-4 text-center text-sm text-text-primary shadow-soft backdrop-blur sm:text-base">
                <p className="font-display text-lg font-bold text-brand-violet sm:text-xl">Aurélien Sabé</p>
                <p className="mt-0.5 text-text-muted-custom">Mandataire indépendant · Expert Habitat</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="min-w-0 space-y-6"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition(0.08, reduced, 0.5)}
          >
            <h3 className="font-display text-3xl font-bold leading-tight text-brand-violet sm:text-4xl">
              20 ans sur le terrain, le même fil conducteur
            </h3>
            <blockquote className="border-l-4 border-brand-pink/80 pl-5 text-lg italic leading-[1.75] text-text-primary/90 sm:pl-6 sm:text-xl">
              « Je crois que l’immobilier, c’est d’abord des humains, des vies qui bougent, des doutes
              qu’on démonte un par un. Mon rôle : vous donner des repères clairs, des chiffres
              justes, et le calme qu’il faut quand la signature approche. »
            </blockquote>
            <p className="text-base leading-[1.8] text-text-muted-custom sm:text-lg">
              Un seul interlocuteur, du premier échange à la signature, partout en métropole. Des
              repères concrets, du terrain, sans blabla inutile.
            </p>
            <ul className="flex flex-wrap gap-2">
              {["RSAC Lille Métropole", "Réseau Expertimo", "20 ans d’expérience"].map((x) => (
                <li
                  key={x}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-violet/15 bg-brand-light/80 px-3.5 py-1.5 text-sm font-medium text-brand-violet"
                >
                  <HeartHandshake className="h-3.5 w-3.5 text-brand-pink" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`tel:${siteContact.phoneE164}`}
                className="inline-flex items-center gap-2 text-base font-semibold text-brand-pink transition hover:underline"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pink/10">
                  <Phone className="h-4 w-4" />
                </span>
                {siteContact.phone}
              </a>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center gap-2 text-base font-medium text-brand-violet transition hover:underline"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-violet/10">
                  <Mail className="h-4 w-4" />
                </span>
                {siteContact.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
