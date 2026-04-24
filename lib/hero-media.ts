/**
 * Vidéo d’en-tête : `/public/hero-background.mp4`.
 * Le cadrage à l’écran est ajusté dans le hero via `object-[center_36%]` (évite un ciel trop
 * clair derrière le menu) ; recadrer le fichier plutôt que d’ajouter des calques.
 */
export const HERO_VIDEO = "/hero-background.mp4" as const;

/** Aperçu (réduit mouvement, chargement) : même cadrage vertical implicite que `object-center`+offset via classe Image. */
export const HERO_POSTER =
  "https://images.unsplash.com/photo-1517946968724-fbbaf8ffb77b?w=1920&h=1080&fit=crop&q=75&auto=format" as const;
