import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-pink/90 sm:text-base sm:tracking-[0.2em]">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-3xl font-bold leading-[1.15] tracking-tight text-brand-violet sm:mt-4 sm:text-4xl md:leading-tight lg:text-5xl",
          align === "center" && "text-balance",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-[1.75] text-text-muted-custom sm:mt-6 sm:text-lg sm:leading-relaxed",
            align === "center" && "max-w-2xl md:mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
