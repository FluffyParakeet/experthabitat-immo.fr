import type { Property, PropertyType } from "./types";

export const PROPERTY_TYPE_OPTIONS: readonly PropertyType[] = [
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local professionnel",
  "Autre",
] as const;

export type BiensQuery = {
  q: string;
  type: string;
  /** "" = toutes les offres */
  tx: "" | "vente" | "location";
  min: string;
  max: string;
};

const TX_SET = new Set<string>(["", "vente", "location"]);

function parseIntSafe(s: string | null): string {
  if (s == null || s === "") return "";
  const n = Number.parseInt(s, 10);
  if (Number.isNaN(n) || n < 0) return "";
  return String(n);
}

export function parseBiensQuery(sp: URLSearchParams): BiensQuery {
  const typeRaw = sp.get("type") ?? "";
  const type =
    typeRaw && PROPERTY_TYPE_OPTIONS.includes(typeRaw as PropertyType) ? typeRaw : "";
  const txRaw = (sp.get("tx") ?? "") as string;
  const tx = (TX_SET.has(txRaw) ? txRaw : "") as BiensQuery["tx"];
  let min = parseIntSafe(sp.get("min"));
  let max = parseIntSafe(sp.get("max"));
  if (tx !== "vente" && tx !== "location") {
    min = "";
    max = "";
  }
  return {
    q: (sp.get("q") ?? "").trim(),
    type,
    tx,
    min,
    max,
  };
}

export function buildBiensQueryString(f: BiensQuery): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.type) p.set("type", f.type);
  if (f.tx) p.set("tx", f.tx);
  if (f.min) p.set("min", f.min);
  if (f.max) p.set("max", f.max);
  const s = p.toString();
  return s ? `?${s}` : "";
}

/**
 * Filtre: localisation (ville ou titre), type, transaction, fourchette de prix
 * (min/max seulement si l’utilisateur a choisi Vente ou Location).
 */
export function filterBiens(
  items: readonly Property[],
  f: BiensQuery,
): Property[] {
  const qLower = f.q.toLowerCase().trim();

  let minN: number | undefined;
  let maxN: number | undefined;
  let applyPrice = false;
  if (f.tx === "vente" || f.tx === "location") {
    if (f.min) minN = Number.parseInt(f.min, 10);
    if (f.max) maxN = Number.parseInt(f.max, 10);
    if (
      minN !== undefined &&
      maxN !== undefined &&
      !Number.isNaN(minN) &&
      !Number.isNaN(maxN) &&
      minN > maxN
    ) {
      applyPrice = false;
    } else {
      applyPrice = minN !== undefined || maxN !== undefined;
    }
  }

  return items.filter((p) => {
    if (qLower) {
      const matchLoc =
        p.city.toLowerCase().includes(qLower) ||
        p.title.toLowerCase().includes(qLower);
      if (!matchLoc) return false;
    }
    if (f.type && p.type !== f.type) return false;
    const listing = p.listing ?? "vente";
    if (f.tx === "vente" && listing !== "vente") return false;
    if (f.tx === "location" && listing !== "location") return false;
    if (applyPrice) {
      if (minN !== undefined && !Number.isNaN(minN) && p.price < minN) return false;
      if (maxN !== undefined && !Number.isNaN(maxN) && p.price > maxN) return false;
    }
    return true;
  });
}
