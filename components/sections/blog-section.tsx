"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { imagePlaceholderBlur } from "@/lib/image-blur";
import { SectionHeader } from "@/components/ui/section-header";
import { FadeInView } from "@/components/motion/fade-in-view";
import { homeStaggerContainer, homeStaggerItem, homeViewport } from "@/lib/motion-home";

export function BlogSection() {
  const posts = blogPosts.slice(0, 3);
  const reduced = useReducedMotion() ?? false;
  return (
    <section className="border-t border-white/50 section-padding-y">
      <div className="page-container">
        <FadeInView>
          <SectionHeader eyebrow="Lecture" title="Nos conseils immobiliers" />
        </FadeInView>
        <motion.div
          className="mt-16 grid w-full min-w-0 grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={homeStaggerContainer(reduced, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={homeViewport}
        >
          {posts.map((a) => (
            <motion.article
              key={a.slug}
              variants={homeStaggerItem(reduced, 20)}
              className="group flex min-w-0 h-full flex-col overflow-hidden rounded-3xl border border-white/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow-pink"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.cover}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={imagePlaceholderBlur}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1035]/30 to-transparent opacity-40" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-violet shadow-md backdrop-blur">
                  {a.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted-custom sm:text-base">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(a.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readMinutes} min
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold leading-snug text-brand-violet group-hover:text-brand-pink sm:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-base leading-[1.65] text-text-muted-custom line-clamp-3">
                  {a.excerpt}
                </p>
                <Link
                  href={`/blog/${a.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-base font-semibold text-brand-pink"
                >
                  Lire l’article
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
