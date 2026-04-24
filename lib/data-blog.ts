import { contentEtapesAchat } from "./blog/etapes-achat";
import { contentInvestirMarcq } from "./blog/investir-marcq";
import { contentPreparerVente } from "./blog/preparer-vente";
import { unSplash } from "./image-blur";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "preparer-vente-rapide",
    title: "Comment préparer son bien pour une vente rapide ?",
    excerpt:
      "Espace, pièces d’eau, toiture, énergie et dossier : chaque point influence visite, négociation et sérénité. Archiver et transmettre honnêtement pour vendre plus vite.",
    content: contentPreparerVente,
    category: "Vendre",
    readMinutes: 5,
    date: "2026-03-10",
    cover: unSplash.modern2,
  },
  {
    slug: "investir-marcq-quartiers",
    title: "Investir à Marcq-en-Barœul : les quartiers à suivre",
    excerpt:
      "Revenu locatif, DPE, revente, charges : cartographier avant toute offre, avec l’accompagnement d’un mandataire du réseau Expertimo.",
    content: contentInvestirMarcq,
    category: "Investir",
    readMinutes: 4,
    date: "2026-04-01",
    cover: unSplash.villa,
  },
  {
    slug: "etapes-cles-achat",
    title: "Les étapes clés d’un achat immobilier réussi",
    excerpt:
      "Budget, visites, offre, compromis, prêt, acte notarié : chaque phase mérite de la clarté jusqu’au jour de la signature.",
    content: contentEtapesAchat,
    category: "Acheter",
    readMinutes: 6,
    date: "2026-01-20",
    cover: unSplash.interieur,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((b) => b.slug === slug);
}
