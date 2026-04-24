import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPropertyBySlug } from "@/lib/property-db";
import { PropertyFiche } from "@/components/property/property-fiche";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const rows = await getAllSlugs();
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug, { onlyPublished: true });
  if (!p) return {};
  return { title: `${p.title} | Expert Habitat` };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug, { onlyPublished: true });
  if (!p) notFound();
  return (
    <div className={cn("section-padding-y", "page-container")}>
      <PropertyFiche p={p} />
    </div>
  );
}
