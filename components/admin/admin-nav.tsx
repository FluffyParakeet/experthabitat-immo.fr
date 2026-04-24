"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, ExternalLink, KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/biens", label: "Annonces", icon: Building2, exact: false },
  { href: "/admin/compte", label: "Compte", icon: KeyRound, exact: true },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Administration">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition",
              active
                ? "bg-brand-violet/10 text-brand-violet ring-1 ring-brand-violet/15"
                : "text-brand-violet/80 hover:bg-white/60 hover:text-brand-pink",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-brand-violet/80 transition hover:bg-white/60 hover:text-brand-pink"
      >
        <span className="sr-only sm:not-sr-only sm:inline">Voir le site</span>
        <span className="sm:hidden">Site</span>
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    </nav>
  );
}
