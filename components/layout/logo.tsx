import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "onDark";

export function ExpertLogo({
  className = "",
  variant = "default",
  size = "md",
}: {
  className?: string;
  variant?: LogoVariant;
  /** Taille d’affichage (fichier : 655×218). */
  size?: "sm" | "md" | "lg";
}) {
  const isDark = variant === "onDark";
  const hClass =
    size === "sm"
      ? "h-7 w-auto sm:h-8"
      : size === "lg"
        ? "h-11 w-auto sm:h-12"
        : "h-8 w-auto sm:h-9 md:h-10";

  return (
    <Link
      href="/"
      className={cn("group inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/50 focus-visible:ring-offset-2", className)}
    >
      <span
        className={cn(
          "inline-flex overflow-hidden rounded-md transition-opacity duration-200 group-hover:opacity-[0.97]",
          isDark && "shadow-sm ring-1 ring-white/15",
        )}
      >
        <Image
          src="/logo.svg"
          alt="Expert Habitat — la persévérance au cœur de l’immobilier"
          width={655}
          height={218}
          priority
          unoptimized
          className={cn("w-auto", hClass)}
          sizes="(max-width: 640px) 200px, 240px"
        />
      </span>
    </Link>
  );
}
