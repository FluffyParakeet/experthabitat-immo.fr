import { AdminPropertyForm } from "@/components/admin/property-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminNewPropertyPage() {
  const hasDb = Boolean(process.env.DATABASE_URL);
  if (!hasDb) {
    return (
      <div>
        <AdminPageHeader
          backHref="/admin/biens"
          backLabel="Toutes les annonces"
          eyebrow="Nouveau"
          title="Créer une annonce"
        />
        <div className="mt-2 rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          Renseignez <code className="rounded bg-white/90 px-1.5 font-mono text-xs">DATABASE_URL</code>{" "}
          (Neon), puis <code className="rounded bg-white/90 px-1.5 font-mono text-xs">npm run db:push</code>.
        </div>
      </div>
    );
  }
  try {
    getDb();
  } catch {
    return (
      <div>
        <AdminPageHeader
          backHref="/admin/biens"
          backLabel="Toutes les annonces"
          title="Nouvelle annonce"
        />
        <p className="text-destructive">Impossible de joindre la base. Vérifiez DATABASE_URL.</p>
      </div>
    );
  }
  return (
    <div>
      <AdminPageHeader
        backHref="/admin/biens"
        backLabel="Toutes les annonces"
        eyebrow="Nouveau"
        title="Créer une annonce"
        description="Remplissez la fiche puis enregistrez. Vous serez redirigé vers la liste des annonces."
      />
      <AdminPropertyForm mode="create" />
    </div>
  );
}
