import { createHmac, timingSafeEqual } from "crypto";

function getSecret() {
  const s = process.env.CSRF_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!s || s.length < 32) {
      throw new Error(
        "CSRF_SECRET manquant ou trop court (min. 32 caractères). Définissez-le en production — voir .env.example",
      );
    }
    return s;
  }
  return s || "expert-habitat-csrf-dev-only";
}

const TOKEN_TTL_MS = 60 * 60 * 1000;

/**
 * Génère un jeton HMAC côté serveur (RSC) pour valider l’origine des soumissions.
 */
export function createCsrfToken(): string {
  const exp = Date.now() + TOKEN_TTL_MS;
  const content = `v1|${exp}`;
  const sig = createHmac("sha256", getSecret())
    .update(content)
    .digest("hex");
  return Buffer.from(`${content}|${sig}`, "utf8").toString("base64url");
}

export function verifyCsrfToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const i = decoded.lastIndexOf("|");
    if (i < 0) return false;
    const sig = decoded.slice(i + 1);
    const content = decoded.slice(0, i);
    const parts = content.split("|");
    if (parts[0] !== "v1" || parts.length !== 2) return false;
    const exp = parseInt(parts[1]!, 10);
    if (Number.isNaN(exp) || Date.now() > exp) return false;
    const expected = createHmac("sha256", getSecret())
      .update(content)
      .digest("hex");
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
