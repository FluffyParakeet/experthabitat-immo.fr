"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

/**
 * Le site public utilise la barre de navigation classique.
 * L’espace d’authentification et l’admin ont leurs propres en-têtes.
 * (on évite un simple /auth* ou /admin* ambigu, ex. /author)
 */
function isAuthRoute(pathname: string | null) {
  if (pathname == null) return false;
  return pathname === "/auth" || pathname.startsWith("/auth/");
}

function isAdminRoute(pathname: string | null) {
  if (pathname == null) return false;
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (isAuthRoute(pathname) || isAdminRoute(pathname)) {
    return null;
  }
  return <Navbar />;
}
