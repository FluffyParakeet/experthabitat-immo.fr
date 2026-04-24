import type { Testimonial } from "./types";
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Camille R.",
    city: "Lambersart",
    text: "Aurélien a su rassurer toute notre famille pendant des semaines d’hésitation. Il connaissait vraiment le secteur, n’a jamais cherché à bâcler une visite et a obtenu un compromis proche de l’estimation dès la seconde offre. L’entourage Expert Habitat est réactif et pro.",
    avatar: "https://i.pravatar.cc/160?u=expert1",
  },
  {
    id: "2",
    name: "Thomas & Lina K.",
    city: "Croix",
    text: "Achat d’un T5 dans une résidence côtée : Aurélien a coordonné les diagnostics, négocié auprès de la prometteuse et tenu toutes les agences impliquées informées. On se sent vraiment suivis, pas seulement en copie d’e-mail. Nous recommandons vivement.",
    avatar: "https://i.pravatar.cc/160?u=expert2",
  },
  {
    id: "3",
    name: "Hélène D.",
    city: "Mouvaux",
    text: "Estimation réaliste : pas d’inflation artificielle, de la comparaison solide, du ressenti terrain et du contexte de marché du trimestre. L’acquéreur a repris l’estimation telle quelle. Un accompagnement humain et rassurant.",
    avatar: "https://i.pravatar.cc/160?u=expert3",
  },
];

/** Avis pour la section en colonnes défilantes (9 entrées, 3 par colonne). */
export const columnTestimonials = [
  {
    text: "Aurélien a rassuré toute notre famille pendant des semaines d’hésitation. Il connaît le secteur, n’a jamais bâclé une visite et a obtenu un compromis proche de l’estimation dès la seconde offre.",
    image: "https://i.pravatar.cc/160?u=expert1",
    name: "Camille R.",
    role: "Lambersart",
  },
  {
    text: "Pour l’achat d’un T5, il a coordonné diagnostics, négociation et toutes les parties. On se sent vraiment suivis, pas seulement en copie. Je recommande sans hésiter.",
    image: "https://i.pravatar.cc/160?u=expert2",
    name: "Thomas & Lina K.",
    role: "Croix",
  },
  {
    text: "Estimation réaliste, pas d’inflation artificielle, comparaisons solides et ressenti terrain. L’acquéreur a validé l’estimation telle quelle. Humain et rassurant.",
    image: "https://i.pravatar.cc/160?u=expert3",
    name: "Hélène D.",
    role: "Mouvaux",
  },
  {
    text: "Vente en six semaines, photos et annonce soignées, filtre sur les visiteurs sérieux. On a évité les pertes de temps. Merci pour le calme et la clarté des échanges.",
    image: "https://i.pravatar.cc/160?u=expert4",
    name: "Pierre M.",
    role: "Wasquehal",
  },
  {
    text: "Premier achat, beaucoup d’inconnues : le dossier de financement, les clauses, le timing. Chaque étape m’a été expliquée, sans jargon inutile.",
    image: "https://i.pravatar.cc/160?u=expert5",
    name: "Sarah B.",
    role: "Lille (Sud)",
  },
  {
    text: "Estimation d’un well-house avec travaux : les fourchettes étaient documentées, avec des exemples de biens proches. La vente a eu lieu dans la fourchette haute annoncée.",
    image: "https://i.pravatar.cc/160?u=expert6",
    name: "Marc V.",
    role: "Mons-en-Barœul",
  },
  {
    text: "Réactivité vraie : un acheteur pressé, des signatures à caler en urgence, Aurélien a tenu le fil avec le notaire et l’agence côté achat. Soulagement total.",
    image: "https://i.pravatar.cc/160?u=expert7",
    name: "Julie & Alex F.",
    role: "Wambrechies",
  },
  {
    text: "J’hésitais entre monter en surface ou rester sur Marcq. Les visites ont été ciblées selon le budget réel, sans pousser vers un crédit trop serré.",
    image: "https://i.pravatar.cc/160?u=expert8",
    name: "Claire T.",
    role: "La Madeleine",
  },
  {
    text: "Accompagnement de bout en bout pour l’estimation, les travaux de mise en valeur conseillés, puis la négociation. Transparence sur chaque chiffre.",
    image: "https://i.pravatar.cc/160?u=expert9",
    name: "Nicolas L.",
    role: "Loos",
  },
] as const;
