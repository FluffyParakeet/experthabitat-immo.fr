import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPropertyBySlug } from "@/lib/property-db";
import { absoluteUrl, propertyDescriptionForSeo } from "@/lib/seo";
import { PropertyFiche } from "@/components/property/property-fiche";
import { JsonLd } from "@/components/seo/json-ld";
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
  const title = `${p.title} | Expert Habitat`;
  const description = propertyDescriptionForSeo(p);
  const imageUrl = absoluteUrl(p.image);
  return {
    title,
    description,
    alternates: { canonical: `/biens/${slug}` },
    openGraph: {
      type: "website",
      title: p.title,
      description,
      url: absoluteUrl(`/biens/${slug}`),
      images: [
        { url: imageUrl, width: 1200, height: 630, alt: p.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug, { onlyPublished: true });
  if (!p) notFound();
  const pageUrl = absoluteUrl(`/biens/${slug}`);
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: propertyDescriptionForSeo(p),
    image: p.images.length > 0 ? p.images.map((u) => absoluteUrl(u)) : [absoluteUrl(p.image)],
    category: p.type,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      price: p.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/OnlineOnly",
    },
  };
  return (
    <div className={cn("section-padding-y", "page-container")}>
      <PropertyFiche p={p} />
      <JsonLd data={listingJsonLd} />
    </div>
  );
}
