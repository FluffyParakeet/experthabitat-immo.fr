import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-8 sm:mb-10", className)}>
      {backHref && backLabel && (
        <p className="mb-2">
          <Link
            href={backHref}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-pink transition hover:underline"
          >
            <ChevronLeft
              className="h-4 w-4 transition group-hover:-translate-x-0.5"
              aria-hidden
            />
            {backLabel}
          </Link>
        </p>
      )}
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink/90">
          {eyebrow}
        </p>
      )}
      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-violet sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-text-muted-custom">{description}</p>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
