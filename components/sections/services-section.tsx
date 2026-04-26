"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Home, LineChart, Search, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/motion/fade-in-view";
import { homeStaggerContainer, homeStaggerItem, homeViewport } from "@/lib/motion-home";

const list = [
  {
    Icon: Home,
    t: "Vente",
    d: "Mise en valeur, diffusion, négociation : on vous garde la main jusqu’au notaire. Même suivi, du début de mandat à l’acte, sans intermédiaire parallèle.",
    a: "Parler vente",
    href: "/contact",
  },
  {
    Icon: Search,
    t: "Achat",
    d: "Cadrage du besoin, offres ciblées, visites, négociation : on tient le cap. Du premier échange au compromis, un seul interlocuteur, la même exigence partout.",
    a: "Lancer un projet d’achat",
    href: "/contact",
  },
  {
    Icon: LineChart,
    t: "Estimation",
    d: "Aucun chiffre lâché au hasard : marché, immeuble, lumière et comparaisables entrent dans l’étude. Prix lisible, argumentable, sans flou, sans gonfler l’espoir.",
    a: "Obtenir mon étude chiffrée",
    href: "/estimation",
  },
  {
    Icon: TrendingUp,
    t: "Investissement",
    d: "DPE, loyers, fiscalité, revente : l’arbitrage tient l’opération, pas l’éclat d’une fiche. Sur plusieurs années, en phase risque, cash et revente, sans biais d’un seul chiffrage.",
    a: "Un projet patrimonial",
    href: "/contact",
  },
] as const;

export function ServicesSection() {
  const reduced = useReducedMotion() ?? false;
  return (
    <section
      id="services"
      className="scroll-mt-20 border-t border-white/50 section-padding-y"
    >
      <div className="page-container">
        <FadeInView>
          <SectionHeader
            eyebrow="L’accompagnement"
            title="Ce que nous faisons pour vous"
            description="Vente, achat, estimation et patrimoine : le même suivi, la même personne, du premier appel à la signature."
          />
        </FadeInView>
        <motion.div
          className="mt-16 grid w-full min-w-0 grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          variants={homeStaggerContainer(reduced)}
          initial="hidden"
          whileInView="show"
          viewport={homeViewport}
        >
          {list.map((s, i) => (
            <motion.div
              key={s.t}
              className="min-w-0"
              variants={homeStaggerItem(reduced, 22)}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <Card className="group relative h-full overflow-hidden border-0 bg-white shadow-card transition-shadow duration-300 hover:shadow-glow-pink">
                <div className="h-0.5 w-full bg-gradient-to-r from-brand-pink via-brand-violet/80 to-brand-violet" />
                <p className="absolute right-4 top-3 font-display text-4xl font-bold text-brand-violet/[0.08]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <CardContent className="p-6 pt-8 sm:p-7 sm:pt-9">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet/10 to-brand-pink/10 text-brand-violet ring-1 ring-brand-violet/10 sm:mb-5"
                    aria-hidden
                  >
                    <s.Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-violet">{s.t}</h3>
                  <p className="mt-3 min-h-[5.1rem] text-pretty text-base leading-[1.7] text-text-muted-custom">
                    {s.d}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-5 inline-flex items-center gap-1 text-base font-semibold text-brand-pink transition hover:gap-2"
                  >
                    {s.a}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
