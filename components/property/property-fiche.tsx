import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Hash,
  Key,
  MapPin,
  Maximize2,
  PanelsTopLeft,
} from "lucide-react";
import type { Property, PropertyListing } from "@/lib/types";
import { siteContact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { imagePlaceholderBlur } from "@/lib/data";

function listingLabel(listing: PropertyListing) {
  return listing === "location" ? "Location" : "Vente";
}

function specIconClass() {
  return "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet/10 to-brand-pink/5 ring-1 ring-brand-violet/10";
}

type Spec = { key: string; label: string; value: string; icon: ReactNode };

export function PropertyFiche({ p }: { p: Property }) {
  const listing = p.listing ?? "vente";
  const contactProjet = listing === "location" ? "autre" : "acheter";
  const priceLabel =
    listing === "location"
      ? `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(p.price)} € / mois`
      : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(p.price);

  const specs: Spec[] = [
    {
      key: "type",
      label: "Type de bien",
      value: p.type,
      icon: <Building2 className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    },
    {
      key: "surface",
      label: "Surface",
      value: `${p.surface} m²`,
      icon: <Maximize2 className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    },
    {
      key: "city",
      label: "Secteur",
      value: p.city,
      icon: <MapPin className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    },
    {
      key: "listing",
      label: "Offre",
      value: listingLabel(listing),
      icon: <Key className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    },
  ];
  if (p.rooms > 0) {
    specs.splice(2, 0, {
      key: "rooms",
      label: "Pièces",
      value: `${p.rooms}`,
      icon: <PanelsTopLeft className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    });
  }
  if (p.ref) {
    specs.push({
      key: "ref",
      label: "Référence",
      value: p.ref,
      icon: <Hash className="h-5 w-5 text-brand-violet" strokeWidth={1.75} />,
    });
  }

  return (
    <article className="mx-auto w-full max-w-4xl">
      <nav className="text-sm sm:text-base">
        <Link
          href="/biens"
          className="group inline-flex items-center gap-2 font-medium text-brand-pink transition hover:text-brand-pink/85"
        >
          <span className="inline-block transition group-hover:-translate-x-0.5">←</span>
          Tous les biens
        </Link>
      </nav>

      <div className="mt-5 sm:mt-6">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{
            boxShadow:
              "0 24px 48px -12px rgba(26, 16, 53, 0.2), 0 0 0 1px rgba(61, 43, 142, 0.08)",
          }}
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            placeholder="blur"
            blurDataURL={imagePlaceholderBlur}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1035]/50 via-transparent to-[#0a0a1c]/25" />
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md sm:px-3.5 sm:text-sm",
                p.badge === "exclusivite"
                  ? "bg-gradient-to-r from-brand-pink to-rose-500"
                  : "bg-gradient-to-r from-brand-violet to-indigo-600",
              )}
            >
              {p.badge === "exclusivite" ? "Exclusivité" : "Nouveau"}
            </span>
          </div>
        </div>
      </div>

      <header className="mt-6 space-y-4 sm:mt-8">
        <h1 className="text-balance font-display text-2xl font-bold text-brand-violet sm:text-3xl sm:leading-tight md:text-4xl">
          {p.title}
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <p className="order-2 text-lg text-text-primary sm:order-1 sm:pt-1 sm:text-xl">
            <span className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink" aria-hidden />
              <span className="leading-snug">{p.city}</span>
            </span>
          </p>
          <div className="order-1 w-full min-w-0 sm:order-2 sm:max-w-md sm:text-right" aria-label={listing === "location" ? "Loyer" : "Prix"}>
            <p className="font-display text-2xl font-bold text-text-primary sm:text-3xl sm:leading-tight">
              {priceLabel}
            </p>
            {listing === "vente" && (
              <p className="mt-0.5 text-sm font-medium text-text-muted-custom sm:text-base">Hors notaire</p>
            )}
            {listing === "location" && (
              <p className="mt-0.5 text-sm font-medium text-text-muted-custom sm:text-base">Loyer mensuel</p>
            )}
          </div>
        </div>
      </header>

      <section
        className="mt-8 sm:mt-10"
        aria-label="Caractéristiques principales"
      >
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-pink/80">
          Caractéristiques
        </h2>
        <ul className="mt-3 grid list-none gap-2.5 p-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {specs.map((s) => (
            <li
              key={s.key}
              className="flex min-h-[4.5rem] gap-3.5 rounded-2xl border border-white/80 bg-gradient-to-b from-white to-gray-soft/60 p-3.5 shadow-sm ring-1 ring-brand-violet/[0.07]"
            >
              <div className={specIconClass()} aria-hidden>
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted-custom">
                  {s.label}
                </p>
                <p className="mt-0.5 font-display text-base font-bold text-text-primary sm:text-lg">
                  {s.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {p.description?.trim() ? (
        <section className="mt-10 sm:mt-12">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-pink/80">
            Description
          </h2>
          <p className="mt-3 text-balance text-base leading-[1.75] text-text-primary sm:text-lg sm:leading-[1.8]">
            {p.description}
          </p>
        </section>
      ) : null}

      {p.features.length > 0 && (
        <section className="mt-10 sm:mt-12" aria-label="Détails et atouts">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-pink/80">
            Les points forts
          </h2>
          <ul className="mt-3 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 sm:gap-3">
            {p.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-2xl border border-brand-violet/10 bg-gradient-to-b from-white to-[#f7f5ff]/30 p-3.5 shadow-sm"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <span className="text-[15px] leading-snug text-text-primary sm:text-base">{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div
        className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap"
        style={{ marginBottom: "min(0.5rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <Button
          asChild
          className="h-12 w-full rounded-full bg-brand-pink px-8 text-base text-white sm:w-auto"
        >
          <Link href={`/contact?projet=${contactProjet}&bien=${p.slug}`}>
            {listing === "location" ? "Contacter le conseiller" : "Nous contacter sur ce bien"}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 w-full rounded-full border-2 border-brand-violet px-8 text-base sm:w-auto"
        >
          <a href={`tel:${siteContact.phoneE164}`}>Appeler {siteContact.phone}</a>
        </Button>
      </div>
    </article>
  );
}
