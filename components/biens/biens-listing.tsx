"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Euro, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "@/components/ui/property-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { siteContact } from "@/lib/types";
import {
  buildBiensQueryString,
  filterBiens,
  parseBiensQuery,
  PROPERTY_TYPE_OPTIONS,
  type BiensQuery,
} from "@/lib/biens-filters";

const selectClass =
  "h-11 w-full min-h-11 rounded-xl border border-brand-violet/15 bg-white/90 px-3.5 pr-3 text-base text-text-primary shadow-sm " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/25 focus-visible:border-brand-pink/30 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function hasActiveFilters(f: BiensQuery): boolean {
  return Boolean(f.q || f.type || f.tx || f.min || f.max);
}

export function BiensListing({ properties }: { properties: Property[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const spString = searchParams.toString();
  const f = useMemo(
    () => parseBiensQuery(new URLSearchParams(spString)),
    [spString],
  );
  const filtered = useMemo(
    () => filterBiens(properties, f),
    [properties, f],
  );
  const fRef = useRef(f);
  useEffect(() => {
    fRef.current = f;
  }, [f]);

  const [qInput, setQInput] = useState(f.q);
  useEffect(() => {
    // Sync when URL `q` changes (back/forward, external navigation).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQInput(f.q);
  }, [f.q]);

  useEffect(() => {
    if (qInput === fRef.current.q) return;
    const t = window.setTimeout(() => {
      const next: BiensQuery = { ...fRef.current, q: qInput.trim() };
      const qs = buildBiensQueryString(next);
      router.replace(`${pathname}${qs}`, { scroll: false });
    }, 400);
    return () => clearTimeout(t);
  }, [qInput, pathname, router]);

  const setFilters = useCallback(
    (patch: Partial<BiensQuery>) => {
      const cur = fRef.current;
      const next: BiensQuery = {
        q: patch.q !== undefined ? patch.q : cur.q,
        type: patch.type !== undefined ? patch.type : cur.type,
        tx: patch.tx !== undefined ? (patch.tx as BiensQuery["tx"]) : cur.tx,
        min: patch.min !== undefined ? patch.min : cur.min,
        max: patch.max !== undefined ? patch.max : cur.max,
      };
      if (next.tx !== "vente" && next.tx !== "location") {
        next.min = "";
        next.max = "";
      }
      const qs = buildBiensQueryString(next);
      router.replace(`${pathname}${qs}`, { scroll: false });
    },
    [pathname, router],
  );

  const clearAll = useCallback(() => {
    setQInput("");
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const showPrice = f.tx === "vente" || f.tx === "location";
  const priceIncoherent =
    showPrice && f.min && f.max && Number(f.min) > Number(f.max);

  const [minDraft, setMinDraft] = useState(f.min);
  const [maxDraft, setMaxDraft] = useState(f.max);
  useEffect(() => {
    // Sync from URL when filters or transaction type change.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMinDraft(f.min);
    setMaxDraft(f.max);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [f.min, f.max]);

  const commitPrice = useCallback(() => {
    const a = (minDraft || "").replace(/\D/g, "");
    const b = (maxDraft || "").replace(/\D/g, "");
    if (a === fRef.current.min && b === fRef.current.max) return;
    setFilters({
      min: a,
      max: b,
    });
  }, [minDraft, maxDraft, setFilters]);

  const count = filtered.length;
  const n = properties.length;
  return (
    <>
      <div
        className="mb-8 rounded-2xl border border-white/80 bg-gradient-to-b from-white to-gray-soft/40 p-4 shadow-sm ring-1 ring-brand-violet/8 sm:mb-10 sm:p-6"
        id="recherche-biens"
        role="search"
        aria-label="Recherche et filtres des annonces"
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet sm:h-9 sm:w-9">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
          </div>
          <h2 className="font-display text-base font-bold text-text-primary sm:text-lg">
            Affiner la sélection
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Label
              htmlFor="biens-q"
              className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted-custom"
            >
              Ville, secteur…
            </Label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-pink/80"
                aria-hidden
              />
              <Input
                id="biens-q"
                name="q"
                type="search"
                value={qInput}
                onChange={(e) => setQInput(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="Ex. Marcq, Lomme, centre-ville…"
                className="h-11 pl-10"
                aria-describedby="biens-hint"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="biens-type"
              className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted-custom"
            >
              Type de bien
            </Label>
            <div className="relative">
              <select
                id="biens-type"
                className={selectClass}
                value={f.type}
                onChange={(e) => setFilters({ type: e.target.value })}
                aria-label="Type de bien"
              >
                <option value="">Tous les types</option>
                {PROPERTY_TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label
              htmlFor="biens-tx"
              className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted-custom"
            >
              Offre
            </Label>
            <select
              id="biens-tx"
              className={selectClass}
              value={f.tx}
              onChange={(e) => {
                setFilters({ tx: e.target.value as BiensQuery["tx"] });
              }}
              aria-label="Vente, location ou toutes les offres"
            >
              <option value="">Toutes les offres</option>
              <option value="vente">Vente</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        {showPrice && (
          <div className="mt-4 grid gap-4 sm:max-w-2xl sm:grid-cols-2 sm:items-end">
            <div>
              <Label
                htmlFor="biens-min"
                className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted-custom"
              >
                {f.tx === "location" ? "Loyer min. (€ / mois)" : "Prix min. (€)"}
              </Label>
              <div className="relative">
                <Euro
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-violet/60"
                  aria-hidden
                />
                <Input
                  id="biens-min"
                  type="text"
                  inputMode="numeric"
                  value={minDraft}
                  onChange={(e) => {
                    setMinDraft(e.target.value.replace(/[^\d]/g, ""));
                  }}
                  onBlur={commitPrice}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="h-11 pl-10"
                  placeholder="Min."
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="biens-max"
                className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted-custom"
              >
                {f.tx === "location" ? "Loyer max. (€ / mois)" : "Prix max. (€)"}
              </Label>
              <div className="relative">
                <Euro
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-violet/60"
                  aria-hidden
                />
                <Input
                  id="biens-max"
                  type="text"
                  inputMode="numeric"
                  value={maxDraft}
                  onChange={(e) => {
                    setMaxDraft(e.target.value.replace(/[^\d]/g, ""));
                  }}
                  onBlur={commitPrice}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  }}
                  className="h-11 pl-10"
                  placeholder="Max."
                />
              </div>
            </div>
          </div>
        )}

        {priceIncoherent && (
          <p className="mt-3 text-sm text-destructive" role="alert">
            Indiquez un minimum inférieur au maximum, ou ne renseignez qu’un seul
            plafond.
          </p>
        )}

        <p className="sr-only" id="biens-hint">
          Vous pouvez combiner localisation, type, offre (vente ou location) et
          fourchette de prix. Choisissez d’abord l’offre pour activer les champs
          de prix.
        </p>

        {hasActiveFilters(f) && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-brand-violet/15 pt-3">
            <p className="text-sm text-text-muted-custom">
              <span className="font-semibold text-text-primary" aria-live="polite">
                {count} bien{count > 1 ? "s" : ""}
              </span>
              {` sur ${n} `}
              correspond{count > 1 ? "ent" : "ent"} à vos critères
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={clearAll}
              className="h-9 rounded-full border-brand-violet/25 px-3.5 text-sm text-brand-violet hover:bg-brand-light/50"
            >
              <X className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              Réinitialiser
            </Button>
          </div>
        )}
        {!hasActiveFilters(f) && n > 0 && (
          <p className="mt-2 text-sm text-text-muted-custom">
            <Search className="mb-0.5 mr-1.5 inline h-3.5 w-3.5 text-brand-pink/60" />
            {n} annonce{n > 1 ? "s" : ""} disponible{n > 1 ? "s" : ""} — saisissez
            un lieu ou un filtre pour restreindre l’affichage.
          </p>
        )}
      </div>

      {count > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border border-brand-violet/10 bg-white/60 px-6 py-12 text-center shadow-sm"
          role="status"
        >
          <p className="font-display text-lg font-bold text-text-primary sm:text-xl">
            Aucun résultat pour ces critères
          </p>
          <p className="mx-auto mt-2 max-w-md text-pretty text-text-muted-custom">
            Ajustez la localisation, le type ou le budget, ou effacez les filtres
            pour voir l’ensemble du catalogue.
          </p>
          {hasActiveFilters(f) && (
            <Button
              type="button"
              onClick={clearAll}
              className="mt-5 rounded-full bg-brand-pink px-6"
            >
              Tout afficher
            </Button>
          )}
        </div>
      )}

      <p className="mt-12 text-center text-base text-text-muted-custom sm:mt-14 sm:text-lg">
        Un projet précis ?{" "}
        <Link href="/contact" className="font-medium text-brand-pink">
          Contactez-nous
        </Link>
        {" · "}
        {siteContact.tagline}
      </p>
    </>
  );
}
