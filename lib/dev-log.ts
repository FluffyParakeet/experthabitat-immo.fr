/**
 * Logs réservés au mode développement. Ne jamais y mettre de secrets, jetons, mots de passe
 * ni d’autres données sensibles (journaux d’hébergeur, etc.).
 */
export function devWarn(context: string, message: string): void {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[${context}] ${message}`);
  }
}

/**
 * Erreur côté serveur (API / server actions) : en prod, message d’exception seulement,
 * jamais la stack ni d’objets arbitraires.
 */
export function logServerError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error);
  } else {
    const message = error instanceof Error ? error.message : "Erreur";
    console.error(`[${context}]`, message);
  }
}
