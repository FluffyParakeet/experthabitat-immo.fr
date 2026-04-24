import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const pages = [1, 2, 3];
const all = [];
for (const p of pages) {
  const html = fs.readFileSync(`/tmp/expertimo-${p}.html`, "utf8");
  for (const ch of html.match(
    /<article class="property-listing-v1__item item"[\s\S]*?<\/article>/g,
  ) || []) {
    const imgM = ch.match(
      /src="(\/\/expertimo\.staticlbi\.com\/original\/images\/biens\/[^"]+\.(?:jpg|jpeg|png|webp))"/i,
    );
    const c1 = ch.match(/<span class="title__content-1">([^<]+)<\/span>/);
    const c2 = ch.match(/class="title__content-2"[^>]*>([^<]+)<\/span>/);
    const priceM = ch.match(
      /<span class="mandatory-perso-details-v1__price-value">([^<]+)<\/span>/,
    );
    const ref = ch.match(
      /item__reference">Réf\s*:\s*[\r\n\t ]*(\d+)\s*<\/div>/,
    )?.[1];
    const descM = ch.match(
      /<div class="item__text-block text-block [^"]*">\s*([^<]+?)\s*<\/div>/,
    );
    if (!imgM || !c1 || !c2) continue;
    all.push({
      page: p,
      image: "https:" + imgM[1],
      cityLine: c1[1].trim(),
      title: c2[1].replace(/\s+/g, " ").trim(),
      priceLabel: priceM ? priceM[1].replace(/\s+/g, " ").trim() : "",
      ref,
      desc: descM
        ? descM[1].replace(/\s+/g, " ").replace(/&amp;/g, "&").trim()
        : "",
    });
  }
}
const byRef = new Map();
for (const x of all) {
  if (x.ref && !byRef.has(x.ref)) byRef.set(x.ref, x);
}
const list = [...byRef.values()];

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
}

function parseSurface(title, desc) {
  const tM = title.match(/T[1-9]\s*(\d[\d\s]*)\s*m²/i);
  if (tM) return parseInt(tM[1].replace(/\s/g, ""), 10);
  const terr = title.match(/TERRAIN\s+([0-9\ ]+)\s*M²/i);
  if (terr) return parseInt(terr[1].replace(/\s/g, ""), 10);
  const m = title.match(/(\d{2,4}|[1-9]\d*)\s*m²/i);
  if (m) return parseInt(m[1], 10);
  const d = (desc || "").match(/(\d{2,4})\s*m²/i);
  if (d) return parseInt(d[1], 10);
  return 0;
}

function parseRooms(title) {
  const t = title.match(/\bT([1-9]|10)\b/i);
  if (t) return parseInt(t[1], 10);
  const ch = title.match(/(\d)\s*CHAMB/i);
  if (ch) return Math.min(12, parseInt(ch[1], 10) + 1);
  if (/\bT3\b/i.test(title)) return 3;
  if (/\bT2\b|deux pièces/i.test(title)) return 2;
  if (/maison|duplex|colocation/i.test(title) && /m²/.test(title)) return 4;
  if (/TERRAIN|murs|entrepot|LOCAL|Fonds|fonds/i.test(title)) return 0;
  return 3;
}

function inferType(title) {
  const t = title.toLowerCase();
  if (/terrain/i.test(t)) return "Terrain";
  if (
    /murs commerc|entrepot|fonds de commerce|fonds|local commercial|^à louer|local –|^local /i.test(
      t,
    ) &&
    !/maison/i.test(t)
  ) {
    return "Local professionnel";
  }
  if (/duplex|immeuble|colocation/i.test(t)) return "Maison";
  if (
    /appartement|t2|t3|t4|\bt[1-4]\b|deux pièces/i.test(t) &&
    !/terrain|entrepot|murs|fonds/i.test(t)
  ) {
    return "Appartement";
  }
  if (/^studio|studio|\bt1\b/i.test(t)) return "Studio";
  if (/maison/i.test(t)) return "Maison";
  return "Autre";
}

function parsePriceEuros(label) {
  const s = String(label).replace(/\s/g, " ");
  const n = s.match(/(\d[\d ]*)\s*€/);
  if (!n) return 0;
  return parseInt(n[1].replace(/ /g, ""), 10);
}

function isRental(x) {
  if (/\/\s*mois/i.test(x.priceLabel)) return true;
  if (/à louer|À LOUER|à la location|à LOUER/i.test(x.title)) return true;
  if (
    /LOCAL COMMERCIAL|Local commercial à louer|Local.*louer|OPPORTUNITÉ – LOCAL|EMPLACEMENT PREMIUM|local 90|WAMBRECHIES – Local/i.test(
      x.title,
    ) &&
    !/vente|Fonds|fonds|à vendre/i.test(x.title)
  ) {
    const p = parsePriceEuros(x.priceLabel);
    if (p < 200_000) return true;
  }
  return false;
}

const items = list.map((x) => {
  const ref = x.ref;
  const slug = `ref-${ref}-${slugify(x.title)}`.replace(/-+$/, "");
  const city = x.cityLine.replace(/\s*\(\d{5}\)\s*$/, "").trim();
  const rental = isRental(x);
  const price = parsePriceEuros(x.priceLabel);
  let surface = parseSurface(x.title, x.desc);
  if (ref === "104237" && surface < 2) surface = 500;
  if (ref === "104084" && surface < 2) surface = 90;
  if (ref === "103238" && !surface) surface = 1200;
  if (!surface) surface = 1;
  let rooms = parseRooms(x.title);
  const typ = inferType(x.title);
  if (typ === "Local professionnel" || typ === "Terrain") rooms = 0;
  if (ref === "83487") rooms = 3;
  const badge = /exclusivité|exclusivite|EXCLUSIVITÉ|EXCLUSIVITE/i.test(
    x.title,
  )
    ? "exclusivite"
    : "nouveau";
  const description = x.desc
    .replace(/\.{3}\s*Annonce.*$/i, "")
    .replace(/Annonce\.*$/i, "")
    .trim();
  const fe = [
    `Réf. ${ref} — Annonce reprise du portail réseau Expertimo (conseiller Aurélien Sabé, mandataire).`,
  ];
  return {
    slug,
    ref,
    title: x.title.replace(/\.{3}\s*$/, "").trim(),
    type: typ,
    price,
    listing: rental ? "location" : "vente",
    surface,
    rooms,
    city,
    badge,
    description:
      description +
      (description.endsWith("…") || description.endsWith("...") ? "" : "."),
    features: fe,
    image: x.image,
    images: [x.image],
  };
});

const dataDir = join(root, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const out = join(dataDir, "expertimo-snapshot.json");
fs.writeFileSync(out, JSON.stringify(items, null, 2), "utf8");
process.stderr.write(
  `Wrote ${items.length} annonces to ${out} (import en base : script ou admin ; fichier ignoré par git)\n`,
);
