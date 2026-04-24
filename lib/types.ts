export type PropertyBadge = "exclusivite" | "nouveau";

export type PropertyType =
  | "Maison"
  | "Appartement"
  | "Studio"
  | "Terrain"
  | "Local professionnel"
  | "Autre";

export type PropertyListing = "vente" | "location";

export interface Property {
  slug: string;
  title: string;
  type: PropertyType;
  /** Vente (€) ou location (€ / mois) selon `listing`. */
  price: number;
  /** Par défaut vente. */
  listing?: PropertyListing;
  /** Référence annonce (Expertimo / La Boîte Immo). */
  ref?: string;
  surface: number;
  /** 0 = non concerné (terrain, local…) — affichage adapté. */
  rooms: number;
  city: string;
  badge: PropertyBadge;
  description: string;
  features: string[];
  image: string;
  images: string[];
}

export type BlogCategory = "Vendre" | "Acheter" | "Investir";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  readMinutes: number;
  date: string;
  cover: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  avatar: string;
}

export const SECTEURS = [
  "Marcq-en-Barœul",
  "Mouvaux",
  "Lambersart",
  "Croix",
  "Wasquehal",
  "La Madeleine",
  "Loos",
  "Lomme",
  "Lille (Sud, Fives, Lille-Sud, Saint-Maurice, centre)",
  "Mons-en-Barœul",
  "Wambrechies",
  "Bondues",
] as const;

export const siteContact = {
  address: "52 rue Gabriel Péri, 59700 Marcq-en-Barœul",
  phone: "06 03 12 37 16",
  phoneE164: "+33603123716",
  email: "aurelien@experthabitat-immo.fr",
  hours: "Lun–Sam 9h–19h",
  instagram: "https://www.instagram.com/expert.habitat_",
  facebook: "https://www.facebook.com",
  tagline: "La persévérance au cœur de l’immobilier",
} as const;

export const legal = {
  rsac: "439 52 639",
} as const;
