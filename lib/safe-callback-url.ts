/**
 * Évite les redirections vers un autre hôte (ex. //evil.com ou https://...).
 * Ne garde qu’un chemin relatif commençant par un seul /.
 */
export function safeAppPath(candidate: string | null | undefined, fallback = "/admin") {
  const c = (candidate ?? "").trim();
  if (!c || !c.startsWith("/") || c.startsWith("//")) return fallback;
  if (c.includes("://") || c.includes("\\")) return fallback;
  return c;
}
