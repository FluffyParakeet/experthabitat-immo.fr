import type { Property, PropertyListing, PropertyType } from "./types";
import type { PropertyRow } from "./db/schema";

const TYPES: PropertyType[] = [
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local professionnel",
  "Autre",
];
const TYPES_SET = new Set(TYPES);
const BADGES = new Set(["exclusivite", "nouveau"] as const);

function parseListing(s: string): PropertyListing {
  if (s === "location" || s === "vente") return s;
  return "vente";
}

function parseType(s: string): PropertyType {
  return (TYPES_SET.has(s as PropertyType) ? s : "Autre") as PropertyType;
}

function parseBadge(
  s: string,
): "exclusivite" | "nouveau" {
  return (BADGES.has(s as "exclusivite" | "nouveau")
    ? s
    : "nouveau") as "exclusivite" | "nouveau";
}

export function propertyRowToProperty(row: PropertyRow): Property {
  return {
    slug: row.slug,
    title: row.title,
    type: parseType(row.type),
    price: row.price,
    listing: parseListing(row.listing),
    ref: row.ref ?? undefined,
    surface: row.surface,
    rooms: row.rooms,
    city: row.city,
    badge: parseBadge(row.badge),
    description: row.description,
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    image: row.image,
    images: Array.isArray(row.images) ? (row.images as string[]) : [],
  };
}
