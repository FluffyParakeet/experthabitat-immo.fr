"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/motion/fade-in-view";
import { homeTransition, homeViewport } from "@/lib/motion-home";
import { cn } from "@/lib/utils";

export function PropertyGallerySection({ items }: { items: Property[] }) {
  const list = items;
  const reduced = useReducedMotion() ?? false;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: false },
    [],
  );

  return (
    <section className="border-t border-white/50 section-padding-y">
      <div className="page-container">
        <FadeInView>
          <SectionHeader
            eyebrow="Sélection"
            title="Nos biens en exclusivité"
            description="Un aperçu concret de ce qu’on met en scène aujourd’hui sur la Métropole, côté vendeur comme côté acheteur."
          />
        </FadeInView>
        <motion.div
          className="mt-16 w-full min-w-0 sm:mt-20"
          initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={homeViewport}
          transition={homeTransition(0.06, reduced, 0.6)}
        >
          <div
            className="flex w-full min-w-0 max-w-7xl items-center justify-center gap-2 sm:mx-auto sm:gap-2.5 md:gap-3"
            role="region"
            aria-roledescription="carrousel"
            aria-label="Aperçu de nos annonces"
          >
            <button
              type="button"
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-violet/20 bg-white text-brand-violet shadow-sm transition",
                "hover:border-brand-pink/30 hover:text-brand-pink sm:h-10 sm:w-10",
                "disabled:pointer-events-none disabled:opacity-30",
              )}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={list.length <= 1}
              aria-label="Annonce précédente"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div
              className="min-w-0 flex-1 touch-pan-y overflow-hidden"
              ref={emblaRef}
            >
              <div className="flex" style={{ marginLeft: "-0.75rem" }}>
                {list.map((p) => (
                  <div
                    key={p.slug}
                    className="min-w-0 max-w-full shrink-0 pl-3 [flex:0_0_100%] min-[500px]:[flex:0_0_50%] lg:[flex:0_0_33%]"
                  >
                    <PropertyCard p={p} />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-violet/20 bg-white text-brand-violet shadow-sm transition",
                "hover:border-brand-pink/30 hover:text-brand-pink sm:h-10 sm:w-10",
                "disabled:pointer-events-none disabled:opacity-30",
              )}
              onClick={() => emblaApi?.scrollNext()}
              disabled={list.length <= 1}
              aria-label="Annonce suivante"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </motion.div>
        <FadeInView className="mt-12 text-center sm:mt-14" delay={0.04} y={10}>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-2 border-brand-violet/25 bg-white px-8 text-base text-brand-violet transition hover:border-brand-pink/40 hover:bg-brand-light/80"
          >
            <Link href="/biens">Voir tous nos biens</Link>
          </Button>
        </FadeInView>
      </div>
    </section>
  );
}
