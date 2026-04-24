"use client";

import { FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroFormSelect } from "@/components/hero/hero-form-select";
import {
  PROPERTY_TYPE_OPTIONS,
  buildBiensQueryString,
  type BiensQuery,
} from "@/lib/biens-filters";
import { cn } from "@/lib/utils";

const controlClass = "h-12 min-h-12 rounded-2xl border border-brand-violet/15 text-base";
const fieldWrap = "min-w-0 sm:w-[11.5rem] sm:shrink-0 lg:w-44";

const txSelectOptions = [
  { value: "", label: "Toutes" },
  { value: "vente", label: "Vente" },
  { value: "location", label: "Location" },
] as const;

export function HeroPropertySearch({
  className,
  /** Sans contour : à placer à l’intérieur d’un `hero-surface` parent. */
  embedded = false,
}: {
  className?: string;
  embedded?: boolean;
}) {
  const router = useRouter();
  const typeOptions = useMemo(
    () => [
      { value: "", label: "Tous types" },
      ...PROPERTY_TYPE_OPTIONS.map((t) => ({ value: t, label: t })),
    ],
    [],
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const typeRaw = String(data.get("type") ?? "");
    const type =
      typeRaw && PROPERTY_TYPE_OPTIONS.includes(typeRaw as (typeof PROPERTY_TYPE_OPTIONS)[number])
        ? typeRaw
        : "";
    const txRaw = String(data.get("tx") ?? "");
    const tx = txRaw === "vente" || txRaw === "location" ? txRaw : ("" as BiensQuery["tx"]);
    const f: BiensQuery = {
      q: String(data.get("q") ?? "").trim(),
      type,
      tx,
      min: "",
      max: "",
    };
    router.push(`/biens${buildBiensQueryString(f)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full text-left", !embedded && "hero-surface p-5 sm:p-7 md:p-8", className)}
      role="search"
      aria-label="Rechercher un bien"
    >
      <div className="mb-5 sm:mb-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[0.8125rem]">
          Recherche
        </h2>
        <p className="mt-2 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5 text-base font-medium leading-snug text-white sm:text-lg">
          <MapPin
            className="h-5 w-5 shrink-0 text-brand-pink"
            strokeWidth={2.2}
            aria-hidden
          />
          <span>Parcourez le catalogue sur la métropole</span>
        </p>
      </div>
      <div className="flex flex-col gap-3.5 lg:flex-row lg:flex-nowrap lg:items-end lg:gap-3.5">
        <div className="min-w-0 flex-1 lg:min-w-[16rem]">
          <label htmlFor="hero-biens-q" className="mb-1.5 block text-xs font-medium text-white/55">
            Où
          </label>
          <div className="relative min-h-12">
            <span
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] flex w-[3.25rem] items-center justify-center"
              aria-hidden
            >
              <MapPin className="h-[1.15rem] w-[1.15rem] text-brand-pink/80" strokeWidth={2.1} />
            </span>
            <Input
              id="hero-biens-q"
              name="q"
              type="search"
              placeholder="Ville, secteur, quartier…"
              autoComplete="off"
              className={cn(controlClass, "border-brand-violet/12 pl-[3.25rem] shadow-sm placeholder:text-text-muted-custom/80")}
            />
          </div>
        </div>
        <div className={fieldWrap}>
          <HeroFormSelect
            id="hero-biens-type"
            name="type"
            fieldLabel="Type"
            defaultValue=""
            options={typeOptions}
          />
        </div>
        <div className={fieldWrap}>
          <HeroFormSelect
            id="hero-biens-tx"
            name="tx"
            fieldLabel="Offre"
            defaultValue=""
            options={txSelectOptions}
          />
        </div>
        <div className="w-full lg:ml-auto lg:w-auto lg:shrink-0 lg:pt-6">
          <Button
            type="submit"
            className="h-12 w-full min-h-12 rounded-2xl bg-brand-pink px-8 text-base font-semibold text-white shadow-[0_8px_32px_rgba(229,48,91,0.35)] transition hover:bg-brand-pink/95 sm:min-w-[11.5rem]"
          >
            <Search className="mr-2 h-[1.1rem] w-[1.1rem] shrink-0" aria-hidden />
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  );
}
