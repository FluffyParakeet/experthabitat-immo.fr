import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Conteneur commun (connexion, mot de passe oublié, reset) : carte + repères visuels.
 */
export function AuthPageShell({
  title,
  description,
  children,
  notice,
  afterCard,
  className,
}: {
  title: string;
  description: string;
  children: ReactNode;
  notice?: ReactNode;
  afterCard?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-padding-y",
        "min-h-[55vh] sm:min-h-[60vh]",
        className,
      )}
    >
      <div className="page-container max-w-md">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-center sm:mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet/12 to-brand-pink/10 ring-1 ring-brand-violet/10">
              <Lock className="h-5 w-5 text-brand-violet" aria-hidden />
            </div>
          </div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink/90">
            Espace pro
          </p>
          <h1 className="mt-2 text-balance text-center font-display text-2xl font-bold text-brand-violet sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-balance text-center text-sm leading-relaxed text-text-muted-custom sm:text-base">
            {description}
          </p>
          {notice}
          <div className="mt-8 rounded-3xl border border-white/90 bg-white/90 p-6 shadow-card backdrop-blur-sm sm:p-8">
            {children}
          </div>
          {afterCard}
        </div>
      </div>
    </div>
  );
}
