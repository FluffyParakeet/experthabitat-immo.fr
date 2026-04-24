"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormSelectOption = { value: string; label: string };

const controlClass = (open: boolean) =>
  cn(
    "flex h-10 w-full min-h-10 items-center justify-between gap-2 rounded-2xl border border-brand-violet/20",
    "bg-white/90 px-3.5 pl-3.5 pr-2.5 text-left text-sm text-text-primary sm:h-11 sm:text-base",
    "shadow-sm shadow-brand-violet/[0.06] transition",
    "hover:border-brand-violet/30",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/25 focus-visible:border-brand-pink/30",
    open && "border-brand-pink/40",
  );

const chevronClass =
  "pointer-events-none h-4 w-4 shrink-0 text-brand-violet/45 transition-transform duration-200";

/**
 * Liste déroulante entièrement en HTML (pas de `<select>`) : le panneau ouvert suit le design du site.
 * `name` via champ caché — compatible FormData / server actions.
 */
export function FormSelect({
  id,
  name,
  options,
  defaultValue,
  listAriaLabel,
  className,
}: {
  id: string;
  name: string;
  options: readonly FormSelectOption[];
  defaultValue: string;
  /** Titre du listbox pour l’accessibilité (ex. « Type ») */
  listAriaLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Node && !containerRef.current?.contains(t)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (options.length === 0) {
    return null;
  }
  const current: FormSelectOption = options.find((o) => o.value === value) ?? options[0]!;

  return (
    <div ref={containerRef} className={cn("relative w-full min-w-0", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={controlClass(open)}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="min-w-0 truncate text-text-primary">{current.label}</span>
        <ChevronDown
          className={cn(chevronClass, open && "rotate-180")}
          strokeWidth={2.25}
          aria-hidden
        />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={listAriaLabel}
          className="absolute z-[200] mt-1.5 w-full min-w-0 max-h-60 origin-top overflow-y-auto overflow-x-hidden rounded-2xl border border-brand-violet/12 bg-white p-1.5 shadow-[0_16px_50px_rgba(26,16,53,0.16),0_0_0_1px_rgba(61,43,142,0.06)]"
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li key={opt.value} className="list-none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium",
                    "text-text-primary transition-colors",
                    selected
                      ? "bg-brand-pink/10 text-brand-violet"
                      : "text-text-primary/90 hover:bg-gray-soft/90 active:bg-gray-soft",
                  )}
                  onClick={() => {
                    setValue(opt.value);
                    setOpen(false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{opt.label}</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-brand-pink" aria-hidden strokeWidth={2.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
