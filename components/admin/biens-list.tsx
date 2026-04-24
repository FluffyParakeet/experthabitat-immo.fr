import Link from "next/link";
import { MapPin, Pencil, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteForm } from "@/app/admin/biens/delete-form";
import { cn } from "@/lib/utils";

export type AdminBienRow = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  image: string;
  city: string;
};

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        published
          ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/15"
          : "bg-amber-50 text-amber-900 ring-1 ring-amber-600/20",
      )}
    >
      {published ? "Publié" : "Brouillon"}
    </span>
  );
}

function BienCard({ p }: { p: AdminBienRow }) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm transition hover:border-brand-violet/20 hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
        <div className="relative h-40 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-soft/90 to-brand-light/30 ring-1 ring-gray-200/50 sm:h-28 sm:w-36 sm:min-w-[9rem]">
          {/* Toute URL https : pas de domaines en dur next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- URLs externes, pas d’optim hébergé */}
          <img
            src={p.image}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="line-clamp-2 min-w-0 flex-1 font-display text-base font-bold text-text-primary sm:text-lg">
              {p.title}
            </h2>
            <StatusBadge published={p.published} />
          </div>
          <p className="mt-1.5 break-all font-mono text-xs text-text-muted-custom sm:text-sm">
            {p.slug}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted-custom">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-pink" aria-hidden />
            {p.city}
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center justify-end gap-2 border-t border-gray-100 pt-3 sm:flex-col sm:border-0 sm:pt-0 sm:pl-2">
          <Button
            asChild
            className="h-10 w-full rounded-full bg-brand-pink text-white shadow-sm hover:bg-brand-pink/90 sm:w-auto sm:min-w-[8.5rem]"
          >
            <Link href={`/admin/biens/${p.id}`} className="inline-flex items-center justify-center gap-1.5">
              <Pencil className="h-4 w-4" aria-hidden />
              Modifier
            </Link>
          </Button>
          <DeleteForm id={p.id} slug={p.slug} />
        </div>
      </div>
    </li>
  );
}

export function AdminBiensList({ items }: { items: AdminBienRow[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-violet/20 bg-gradient-to-b from-white to-brand-light/30 px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-brand-violet/10">
          <Building2 className="h-7 w-7 text-brand-violet/70" aria-hidden />
        </div>
        <p className="mt-4 font-display text-lg font-semibold text-brand-violet">
          Aucune annonce
        </p>
        <p className="mt-2 text-sm text-text-muted-custom">
          Créez une première fiche pour qu’elle apparaisse sur le site.
        </p>
        <Button
          asChild
          className="mt-6 h-11 rounded-full bg-brand-pink px-8 text-white"
        >
          <Link href="/admin/biens/nouveau">Nouvelle annonce</Link>
        </Button>
        <p className="mt-4 text-xs text-text-muted-custom">
          Besoin d’un jeu de test ? Un script de seed peut alimenter la base en local.
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-4" aria-label="Liste des annonces">
      {items.map((p) => (
        <BienCard key={p.id} p={p} />
      ))}
    </ul>
  );
}
