import type { Metadata } from "next";

const site = "https://expert-habitat-marcq.vercel.app";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/short-logo.svg", type: "image/svg+xml" }],
    apple: "/short-logo.svg",
  },
  title: "Expert Habitat · Aurélien Sabé | Agent immobilier Marcq-en-Barœul",
  description:
    "Votre expert immobilier dans la métropole lilloise. Vente, achat, estimation à Marcq-en-Barœul, Mouvaux, Lambersart et alentours. 20 ans d’expérience. Contactez Aurelien Sabé.",
  keywords: [
    "agent immobilier Marcq-en-Barœul",
    "estimation immobilière Lille",
    "vente maison Mouvaux",
    "Expert Habitat",
    "Aurelien Sabé immobilier",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Expert Habitat",
    title: "Expert Habitat · Aurélien Sabé | Agent immobilier",
    description:
      "Vente, achat et estimation dans la métropole lilloise. La persévérance au cœur de l’immobilier.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Habitat · Aurélien Sabé | Agent immobilier",
    description:
      "Accompagnement personnalisé à Marcq, Mouvaux, Lambersart, Croix, Lille et toute la métropole lilloise.",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  authors: [{ name: "Aurélien Sabé", url: siteUrl.replace(/\/$/, "") }],
};

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#localbusiness`,
      name: "Expert Habitat · Aurélien Sabé",
      image: `${siteUrl}/logo.svg`,
      telephone: "+33 6 03 12 37 16",
      email: "aurelien@experthabitat-immo.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "52 rue Gabriel Péri",
        addressLocality: "Marcq-en-Barœul",
        postalCode: "59700",
        addressCountry: "FR",
      },
      areaServed: {
        "@type": "Place",
        name: "Lille Métropole, Hauts-de-France",
      },
      priceRange: "€€",
      parentOrganization: {
        "@type": "Organization",
        name: "Réseau Expertimo / Expert Habitat",
      },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}#agent`,
      name: "Aurélien Sabé",
      jobTitle: "Agent immobilier mandataire",
      worksFor: { "@id": `${siteUrl}#localbusiness` },
      telephone: "+33 6 03 12 37 16",
      email: "aurelien@experthabitat-immo.fr",
      areaServed: "Marcq-en-Barœul, Mouvaux, Lambersart, Croix, Lille, Wasquehal",
      knowsLanguage: "French",
      description:
        "Mandataire immobilier inscrit au RSAC. La persévérance au cœur de l’immobilier, accompagnement vente, achat et estimation.",
    },
  ],
} as const;
