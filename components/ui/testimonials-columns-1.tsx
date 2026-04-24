"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialColumnItem = {
  text: string;
  image: string;
  name: string;
  role: string;
};

function TestimonialCard({
  text,
  image,
  name,
  role,
}: TestimonialColumnItem) {
  return (
    <article className="w-full rounded-3xl border border-brand-violet/[0.08] bg-white p-6 shadow-soft sm:p-7">
      <Quote className="mb-1 h-5 w-5 text-brand-pink/35" aria-hidden />
      <p className="text-base leading-[1.7] text-text-primary/95">« {text} »</p>
      <div className="mt-4 flex items-center gap-3 border-t border-brand-violet/10 pt-4">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
          <Image
            width={44}
            height={44}
            src={image}
            alt={name}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-base font-bold leading-snug text-brand-violet">{name}</p>
          <p className="text-sm leading-snug text-text-muted-custom">{role}</p>
        </div>
      </div>
    </article>
  );
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialColumnItem[];
  duration?: number;
}) => {
  const reduced = useReducedMotion() ?? false;
  const duration = props.duration ?? 10;
  const list = props.testimonials;

  if (reduced) {
    return (
      <div className={cn("w-full min-w-0 max-w-[min(18rem,100%)]", props.className)}>
        <div className="flex flex-col gap-4 bg-transparent pb-6 sm:gap-5">
          {list.map((t, i) => (
            <TestimonialCard key={`static-${i}`} {...t} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full min-w-0 max-w-[min(18rem,100%)]", props.className)}>
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 bg-transparent pb-6 sm:gap-5"
      >
        {Array.from({ length: 2 }, (_, block) => (
          <Fragment key={block}>
            {list.map(({ text, image, name, role }, i) => (
              <TestimonialCard
                key={`${block}-${i}-${name}`}
                text={text}
                image={image}
                name={name}
                role={role}
              />
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
};
