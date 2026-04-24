import type { PropertyFormValues } from "./schemas";
import type { PropertyRow } from "./db/schema";

export function propertyToFormValues(p: PropertyRow): PropertyFormValues {
  const fe = Array.isArray(p.features)
    ? (p.features as string[]).join("\n")
    : String(p.features ?? "");
  const im = Array.isArray(p.images)
    ? (p.images as string[]).join("\n")
    : String(p.images ?? "");
  return {
    slug: p.slug,
    ref: p.ref ?? undefined,
    title: p.title,
    type: p.type as PropertyFormValues["type"],
    price: p.price,
    listing: (p.listing === "location" ? "location" : "vente") as
      | "vente"
      | "location",
    surface: p.surface,
    rooms: p.rooms,
    city: p.city,
    badge: p.badge as "exclusivite" | "nouveau",
    description: p.description,
    features: fe,
    image: p.image,
    images: im,
    published: p.published,
  };
}
