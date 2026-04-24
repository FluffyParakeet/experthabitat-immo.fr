"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { SectionHeader } from "@/components/ui/section-header";
import { columnTestimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const firstColumn = columnTestimonials.slice(0, 3);
const secondColumn = columnTestimonials.slice(3, 6);
const thirdColumn = columnTestimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="relative scroll-mt-20 border-t border-white/50 bg-gradient-to-b from-white/95 via-brand-light/45 to-[#faf9fc] section-padding-y">
      <div className="absolute left-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-pink/10 blur-[80px] md:left-[5%] md:w-80" />
      <div
        className="absolute right-0 top-[20%] h-56 w-56 rounded-full bg-brand-violet/[0.08] blur-[64px] md:top-1/4"
        aria-hidden
      />
      <div className="page-container relative z-10 w-full min-w-0">
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            eyebrow="Témoignages"
            title="Ils nous ont fait confiance"
            description="Des retours de clients après des ventes et des achats qu’on a menés ensemble, pas des notes anonymes sur Internet."
          />
        </motion.div>

        <div
          className={cn(
            "relative z-0 mt-12 flex w-full min-w-0 max-w-6xl flex-row justify-center gap-3 sm:mt-16 sm:gap-4 md:mx-auto md:mt-20 md:gap-6",
            "max-h-[min(700px,72svh)] overflow-x-hidden overflow-y-hidden",
            "[mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_90%,transparent_100%)]",
          )}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
