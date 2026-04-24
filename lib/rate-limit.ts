const buckets = new Map<string, number[]>();
const WIN = 60_000;
const MAX = 5;

export function isOverRateLimit(ip: string) {
  const t = Date.now();
  const arr = (buckets.get(ip) || []).filter((n) => t - n < WIN);
  if (arr.length >= MAX) return true;
  arr.push(t);
  buckets.set(ip, arr);
  return false;
}

export function clientIpFromHeaders(
  h: { get: (k: string) => string | null } | Map<string, string> | null,
) {
  if (!h) return "0";
  if ("get" in h && typeof h.get === "function") {
    // Sur Vercel, l’IP client fiable (évite de se fier à un X-Forwarded-For forgé côté client)
    const vercel = h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
    if (vercel) return vercel;
    const v =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "0";
    return v;
  }
  return "0";
}
