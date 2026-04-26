/**
 * Affiche le site en mode « bientôt disponible » (redirections + page dédiée).
 * @see .env.example — `NEXT_PUBLIC_COMING_SOON` (Edge/middleware) ou `COMING_SOON` (serveur).
 */
function parseComingSoonValue(value: string | undefined): boolean {
  if (value == null) return false;
  const t = value.trim();
  if (t === "") return false;
  const n = t.toLowerCase();
  if (n === "0" || n === "false" || n === "no" || n === "off" || n === "disabled" || n === "desactive" || n === "désactivé") {
    return false;
  }
  if (n === "1" || n === "true" || n === "yes" || n === "on" || n === "enabled" || n === "active" || n === "activé") {
    return true;
  }
  return false;
}

export function isComingSoonEnabled(): boolean {
  if (typeof process === "undefined") return false;
  if (parseComingSoonValue(process.env.NEXT_PUBLIC_COMING_SOON)) return true;
  if (parseComingSoonValue(process.env.COMING_SOON)) return true;
  return false;
}
