"use client";

import { createPortal } from "react-dom";
import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { ExpertLogo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { siteContact } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Accueil" },
  { href: "/biens", label: "Nos biens" },
  { href: "/estimation", label: "Estimation" },
  { href: "/contact", label: "Contact" },
];

type SearchGet = { get: (name: string) => string | null };

/** Lien actif (menu principal). Préfère pathname seul : pas d’`useSearchParams` sur toute la nav. */
function isActiveLink(pathname: string, href: string, sp?: SearchGet) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  const qIdx = href.indexOf("?");
  if (qIdx !== -1) {
    if (!sp) return false;
    const path = href.slice(0, qIdx);
    if (pathname !== path) return false;
    const want = new URLSearchParams(href.slice(qIdx + 1));
    let match = true;
    want.forEach((v, k) => {
      if (sp.get(k) !== v) match = false;
    });
    return match;
  }
  if (href === "/contact") {
    return pathname === "/contact";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Pages intérieures : pas de changement de teinte au survol, seul le soulignement rose compte. */
const linkInnerBase =
  "group relative inline-flex items-center py-1.5 px-2 text-sm font-semibold tracking-tight text-white/90 " +
  "after:pointer-events-none after:absolute after:bottom-0 after:left-0 " +
  "after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-brand-pink after:to-rose-400 " +
  "after:content-[''] after:transition-[width] after:duration-300 " +
  "hover:after:w-full sm:text-base lg:px-2.5";
const linkInnerActive = "after:w-full after:from-brand-pink after:to-rose-400/90";

/** Accueil : même logique, halo léger seulement pour lire sur la vidéo — pas de pilule / pas de chgmt de teinte au survol. */
const linkHomeBase =
  "group relative inline-flex items-center rounded-lg py-1.5 px-2 text-sm font-semibold tracking-tight " +
  "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)] " +
  "after:pointer-events-none after:absolute after:bottom-0 after:left-0 " +
  "after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-brand-pink after:to-rose-400 " +
  "after:content-[''] after:transition-[width] after:duration-300 " +
  "hover:after:w-full sm:text-base lg:px-2.5";
const linkHomeActive = "after:w-full after:from-brand-pink after:to-rose-400/90";

function MobileMenuPortal({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const el = useSyncExternalStore(
    () => () => {},
    () => (typeof document !== "undefined" ? document.body : null),
    () => null,
  );
  if (!el || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex min-h-0 min-h-dvh flex-col overflow-hidden bg-[#faf9fc] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <div
        className="relative flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4"
        style={{
          background: "linear-gradient(135deg, #2d1f6e 0%, #1a0f3d 55%, #1e1548 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 0% 0%, rgba(229,48,91,0.35) 0%, transparent 50%)",
          }}
        />
        <div className="relative min-w-0 text-white">
          <ExpertLogo variant="onDark" size="sm" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="relative inline-flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Fermer le menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav
        className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-4 py-4"
        aria-label="Principale"
      >
        {links.map((l, i) => {
          const active = isActiveLink(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              prefetch
              onClick={onClose}
              className={cn(
                "flex min-h-[2.75rem] items-center justify-between rounded-2xl border border-transparent px-3 py-2.5 pl-2 transition",
                active
                  ? "border-brand-pink/25 bg-gradient-to-r from-brand-light/90 to-white shadow-sm"
                  : "active:bg-brand-light/50",
              )}
            >
              <span className="w-5 shrink-0 text-right font-display text-xs font-bold text-brand-pink/50 tabular-nums">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span
                className={cn(
                  "flex-1 pl-2 font-display text-base font-bold tracking-tight",
                  active ? "text-brand-violet" : "text-text-primary",
                )}
              >
                {l.label}
              </span>
              <ArrowUpRight
                className={cn("h-4 w-4 shrink-0", active ? "text-brand-pink" : "text-text-muted-custom/50")}
                aria-hidden
              />
            </Link>
          );
        })}
      </nav>
      <div
        className="shrink-0 space-y-4 border-t border-brand-violet/10 bg-white px-4 py-5 shadow-[0_-8px_32px_rgba(26,16,53,0.06)]"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <a
          href={`tel:${siteContact.phoneE164}`}
          className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-2xl border-2 border-brand-pink/25 bg-gradient-to-b from-white to-brand-light/40 py-2.5 font-display text-base font-bold text-brand-violet shadow-sm"
        >
          <Phone className="h-5 w-5 text-brand-pink" />
          {siteContact.phone}
        </a>
        <Button
          asChild
          className="h-12 w-full rounded-2xl bg-brand-pink text-base font-semibold text-white shadow-lg shadow-brand-pink/20 hover:bg-brand-pink/92"
        >
          <Link href="/contact" onClick={onClose} className="font-display">
            Nous contacter
          </Link>
        </Button>
        <p className="text-center text-xs text-text-muted-custom sm:text-sm">{siteContact.hours}</p>
      </div>
    </div>,
    el,
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const navLinks = (
    <nav
      className="flex w-full min-w-0 max-w-4xl flex-wrap items-center justify-center gap-0.5 sm:gap-1 lg:gap-1.5"
      aria-label="Principale"
    >
      {links.map((l) => {
        const active = isActiveLink(pathname, l.href);
        return (
          <Link
            key={l.label}
            href={l.href}
            prefetch
            className={cn(
              isHome ? linkHomeBase : linkInnerBase,
              "shrink-0 rounded-md px-2.5",
              active && (isHome ? linkHomeActive : linkInnerActive),
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  // Même repère visuel partout. Accueil = fixed pour se superposer au hero ;
  // ailleurs = sticky pour ne pas recouvrir le contenu (hors flux pour fixed).
  return (
    <header
      className={cn(
        "z-50 w-full",
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0",
      )}
    >
      <div
        className={cn(
          "border-b backdrop-blur-md",
          isHome
            ? "border-white/25 bg-gradient-to-b from-[#050210]/96 via-[#0c071a]/94 to-[#0a0a1c]/92 shadow-[0_8px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-white/10 bg-gradient-to-b from-[#100c1a] via-[#0a0812] to-[#06050c] shadow-[0_4px_28px_rgba(0,0,0,0.25)]",
        )}
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
      >
        <div
          className={cn(
            "page-container flex w-full max-w-7xl min-h-14 items-center justify-between",
            "gap-3 py-2.5 sm:min-h-[4rem] sm:gap-4 sm:py-3 lg:gap-6",
          )}
        >
          <div className="min-w-0 shrink-0 self-center">
            <ExpertLogo variant="onDark" className="block" />
          </div>

          <div className="hidden min-w-0 flex-1 self-center py-0.5 md:flex md:items-center md:justify-center">
            {navLinks}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 self-center sm:gap-2.5">
            <a
              href={`tel:${siteContact.phoneE164}`}
              className={cn(
                "hidden h-10 min-h-10 min-w-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 text-xs font-semibold tabular-nums sm:inline-flex sm:px-4 sm:text-sm",
                isHome
                  ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]"
                  : "text-white/90",
              )}
            >
              <Phone className="h-4 w-4 shrink-0 text-brand-pink" aria-hidden />
              {siteContact.phone}
            </a>
            <Button
              asChild
              className="h-10 min-h-10 shrink-0 rounded-full bg-gradient-to-b from-brand-pink to-[#c91d4a] px-2.5 text-[11px] font-bold leading-tight text-white shadow-md shadow-brand-pink/25 transition hover:from-brand-pink/95 hover:to-[#b81842] sm:px-4 sm:text-sm sm:leading-none"
            >
              <Link href="/contact" className="font-display">
                Nous contacter
              </Link>
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border text-white shadow-sm transition md:hidden",
                isHome
                  ? "border-white/35 bg-white/18 hover:border-white/50 hover:bg-white/24"
                  : "border-white/25 bg-white/10 hover:border-white/40 hover:bg-white/15",
              )}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenuPortal open={open} onClose={close} pathname={pathname} />
    </header>
  );
}
