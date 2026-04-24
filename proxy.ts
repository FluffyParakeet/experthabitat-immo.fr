import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { clientIpFromHeaders, isOverRateLimit } from "@/lib/rate-limit";

/**
 * Bordure réseau (auth, rate limit) exécutée en Node (convention `proxy` Next 16+).
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export const config = {
  matcher: [
    "/api/contact",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/admin/change-password",
    "/api/admin/change-email",
    "/admin/:path*",
  ],
};

export default auth((req) => {
  const ip = clientIpFromHeaders(req.headers);
  if (req.nextUrl.pathname === "/api/contact" && req.method === "POST") {
    if (isOverRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez dans une minute." },
        { status: 429 },
      );
    }
  }
  if (req.nextUrl.pathname === "/api/auth/forgot-password" && req.method === "POST") {
    if (isOverRateLimit(`forgot:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 },
      );
    }
  }
  if (req.nextUrl.pathname === "/api/auth/reset-password" && req.method === "POST") {
    if (isOverRateLimit(`reset:${ip}`)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 },
      );
    }
  }
  if (req.nextUrl.pathname === "/api/admin/change-password" && req.method === "POST") {
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
  if (req.nextUrl.pathname === "/api/admin/change-email" && req.method === "POST") {
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
  if (req.nextUrl.pathname.startsWith("/admin") && !req.auth) {
    const u = new URL("/auth/login", req.nextUrl);
    u.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(u);
  }
  return NextResponse.next();
});
