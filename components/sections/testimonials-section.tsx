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
    <section className="scroll-mt-20 border-t border-white/50 section-padding-y">
      <div className="page-container w-full min-w-0">
        <motion.div
          className="relative"
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
