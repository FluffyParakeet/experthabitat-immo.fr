import { AdminPropertyForm } from "@/components/admin/property-form";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getPropertyRowById } from "@/lib/property-db";
import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminEditPropertyPage({ params }: Props) {
  try {
    getDb();
  } catch {
    notFound();
  }
  const { id } = await params;
  const row = await getPropertyRowById(id);
  if (!row) notFound();
  return (
    <div>
      <AdminPageHeader
        backHref="/admin/biens"
        backLabel="Toutes les annonces"
        eyebrow="Édition"
        title="Modifier l’annonce"
        description={
          <span className="break-all font-mono text-sm text-text-muted-custom">{row.slug}</span>
        }
      />
      <AdminPropertyForm mode="edit" id={id} initial={row} />
    </div>
  );
}
