import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientIpFromHeaders, isOverRateLimit } from "@/lib/rate-limit";
import { isComingSoonEnabled } from "@/lib/coming-soon";

/**
 * Bordure réseau (coming soon, auth, rate limit) (convention `proxy` Next 16+).
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
const STATIC_EXT = /\.(mp4|webm|ico|png|jpe?g|gif|svg|webp|avif|txt|xml|map|json|woff2?|ttf|eot|webmanifest)$/i;

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

function publicProtocol(forwardedProto: string | undefined, hasForwardedHost: boolean, fallback: string) {
  if (forwardedProto === "http" || forwardedProto === "https") {
    return forwardedProto;
  }
  if (hasForwardedHost) {
    return "https";
  }
  return fallback.replace(":", "") || "https";
}

function redirectUrl(req: Pick<NextRequest, "headers" | "nextUrl">, pathname: string) {
  const forwardedHost = firstHeaderValue(req.headers.get("x-forwarded-host"));
  const host = forwardedHost || firstHeaderValue(req.headers.get("host"));
  const forwardedProto = firstHeaderValue(req.headers.get("x-forwarded-proto"));
  const protocol = publicProtocol(forwardedProto, Boolean(forwardedHost), req.nextUrl.protocol);

  if (!host) {
    return new URL(pathname, req.nextUrl);
  }

  return new URL(pathname, `${protocol}://${host}`);
}

function isComingSoonExempt(pathname: string) {
  if (pathname === "/coming-soon") return true;
  if (pathname === "/favicon.ico" || pathname.startsWith("/favicon.")) return true;
  if (STATIC_EXT.test(pathname)) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/auth")) return true;
  if (pathname === "/opengraph-image" || pathname === "/twitter-image") return true;
  return false;
}

export const config = { matcher: ["/:path*"] };

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }
  if (isComingSoonEnabled() && !isComingSoonExempt(pathname)) {
    return NextResponse.redirect(redirectUrl(req, "/coming-soon"));
  }
  const ip = clientIpFromHeaders(req.headers);
  if (pathname === "/api/contact" && req.method === "POST") {
    if (isOverRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 },
      );
    }
  }
  if (pathname === "/api/auth/forgot-password" && req.method === "POST") {
    if (isOverRateLimit(`forgot:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 },
      );
    }
  }
  if (pathname === "/api/auth/reset-password" && req.method === "POST") {
    if (isOverRateLimit(`reset:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 },
      );
    }
  }
  if (pathname === "/api/admin/change-password" && req.method === "POST") {
    if (isOverRateLimit(`chgpwd:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 },
      );
    }
    if (!req.auth) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
  }
  if (pathname === "/api/admin/change-email" && req.method === "POST") {
    if (isOverRateLimit(`chgeml:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 },
      );
    }
    if (!req.auth) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
  }
  if (pathname.startsWith("/admin") && !req.auth) {
    const u = redirectUrl(req, "/auth/login");
    u.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(u);
  }
  return NextResponse.next();
});
