import { siteUrl } from "./metadata";
import type { Property } from "./types";

/** URL absolue pour Open Graph, JSON-LD et liens canoniques. */
export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("https://") || pathOrUrl.startsWith("http://")) {
    return pathOrUrl;
  }
  const b = siteUrl.replace(/\/$/, "");
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${b}${p}`;
}

/** Métas Open Graph, JSON-LD, etc. (tronquage doux). */
export function propertyDescriptionForSeo(p: Property) {
  const raw = p.description?.trim();
  if (raw) {
    if (raw.length <= 160) return raw;
    return `${raw.slice(0, 157).trimEnd()}…`;
  }
  return `${p.type} — ${p.surface} m² à ${p.city}. Expert Habitat, mandataire immobilier.`;
}
