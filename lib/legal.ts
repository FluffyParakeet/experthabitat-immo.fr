import { siteUrl } from "@/lib/metadata";
import { legal, siteContact } from "@/lib/types";

/** Contenu des pages Mentions légales & confidentialité (à tenir à jour). */
export const legalCopy = {
  siteUrl,
  brand: "Expert Habitat",
  editor: "Aurélien Sabé",
  role: "Mandataire immobilier indépendant, réseau Expertimo",
  rsac: legal.rsac,
  address: siteContact.address,
  email: siteContact.email,
  phone: siteContact.phone,
  phoneE164: siteContact.phoneE164,
  /** Hébergeur du site (Vercel — ajustez si le site est hébergé ailleurs). */
  hosting: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    site: "https://vercel.com",
  },
} as const;
