"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Property } from "@/lib/types";
import { imagePlaceholderBlur } from "@/lib/image-blur";
import { Button } from "./button";

export function PropertyCard({ p }: { p: Property }) {
  const badge =
    p.badge === "exclusivite"
      ? { t: "Exclusivité", c: "from-brand-pink to-rose-500" }
      : { t: "Nouveau", c: "from-brand-violet to-indigo-600" };
  const listing = p.listing ?? "vente";
  const price =
    listing === "location"
      ? `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(p.price)} €/mois`
      : new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(p.price);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-card"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 85vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          placeholder="blur"
          blurDataURL={imagePlaceholderBlur}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1035]/85 via-[#1A1035]/10 to-transparent opacity-80 transition group-hover:opacity-95" />
        <span
          className={`absolute left-3 top-3 rounded-full bg-gradient-to-r ${badge.c} px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md sm:px-3 sm:text-sm`}
        >
          {badge.t}
        </span>
        <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition group-hover:opacity-100">
          <Button
            asChild
            size="sm"
            className="rounded-full border-0 bg-white px-5 text-sm font-semibold text-brand-violet shadow-lg"
          >
            <Link href={`/biens/${p.slug}`}>Voir le bien</Link>
          </Button>
        </div>
      </div>
      <div className="relative p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-text-primary line-clamp-2 sm:text-xl">
          {p.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted-custom sm:text-base">
          <MapPin className="h-4 w-4 shrink-0 text-brand-pink" />
          {p.city}
        </p>
        <div className="mt-3.5 flex items-baseline justify-between gap-2">
          <p className="font-display text-xl font-bold text-brand-violet sm:text-2xl">{price}</p>
          {listing === "vente" ? (
            <span className="text-xs text-text-muted-custom sm:text-sm">Hors notaire</span>
          ) : (
            <span className="text-xs text-text-muted-custom sm:text-sm">Loyer</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
