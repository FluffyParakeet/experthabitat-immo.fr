import { logServerError } from "@/lib/dev-log";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPropertiesForAdmin } from "@/lib/property-db";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminBiensList, type AdminBienRow } from "@/components/admin/biens-list";

function StaticNotice() {
  return (
    <div className="mb-6 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 shadow-sm">
      <p>
        <strong>Base de données requise.</strong> Renseignez <code className="rounded bg-white/80 px-1 font-mono text-xs">DATABASE_URL</code>{" "}
        (Neon), puis <code className="rounded bg-white/80 px-1 font-mono text-xs">npm run db:push</code> et le seed
        compte <code className="rounded bg-white/80 px-1 font-mono text-xs">db:seed</code> si besoin.
      </p>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function AdminBiensListPage() {
  let rows: AdminBienRow[] = [];
  let hasDb = false;
  if (process.env.DATABASE_URL?.length) {
    try {
      const list = await getAllPropertiesForAdmin();
      rows = list.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        published: r.published,
        image: r.image,
        city: r.city,
      }));
      hasDb = true;
    } catch (e) {
      logServerError("admin/biens", e);
    }
  }

  return (
    <div>
      <AdminPageHeader
        backHref="/admin"
        backLabel="Tableau de bord"
        eyebrow="Biens"
        title="Annonces"
        description="Publiez, modifiez ou retirez les fiches visibles sur le site public. Les brouillons n’apparaissent pas pour les visiteurs."
      >
        {hasDb && (
          <Button
            asChild
            className="h-11 w-full shrink-0 rounded-full bg-brand-pink px-6 text-white shadow-sm sm:w-auto"
          >
            <Link
              href="/admin/biens/nouveau"
              className="inline-flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Nouvelle annonce
            </Link>
          </Button>
        )}
      </AdminPageHeader>
      {!hasDb && <StaticNotice />}
      {hasDb && (
        <div>
          {rows.length > 0 && (
            <p className="mb-4 text-sm text-text-muted-custom">
              <span className="font-semibold text-text-primary">{rows.length}</span> annonce
              {rows.length !== 1 ? "s" : ""} au catalogue
            </p>
          )}
          <AdminBiensList items={rows} />
        </div>
      )}
    </div>
  );
}
