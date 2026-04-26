"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroFormSelectOption = { value: string; label: string };

const controlClass = cn(
  "flex h-12 w-full min-h-12 items-center justify-between gap-2 rounded-2xl border border-brand-violet/15",
  "bg-white px-3.5 pl-3.5 pr-2.5 text-left text-base text-text-primary shadow-inner",
  "transition",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/30 focus-visible:border-brand-pink/40",
);

const chevronClass =
  "pointer-events-none h-[1.15rem] w-[1.15rem] shrink-0 text-brand-violet/50 transition-transform duration-200";

export function HeroFormSelect({
  id,
  name,
  fieldLabel,
  options,
  defaultValue = "",
  value: valueProp,
  onValueChange,
  showLabel = true,
  labelClassName,
  className,
}: {
  id: string;
  name: string;
  fieldLabel: string;
  options: readonly HeroFormSelectOption[];
  defaultValue?: string;
  /** Quand fourni, le select est contrôlé (synchro URL, etc.). */
  value?: string;
  onValueChange?: (value: string) => void;
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
}) {
  const isControlled = valueProp !== undefined;
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? (valueProp as string) : internalValue;
  const setValue = useCallback(
    (next: string) => {
      if (isControlled) {
        onValueChange?.(next);
      } else {
        setInternalValue(next);
      }
    },
    [isControlled, onValueChange],
  );
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
  const current: HeroFormSelectOption = options.find((o) => o.value === value) ?? options[0]!;

  return (
    <div ref={containerRef} className={cn("relative w-full min-w-0", className)}>
      <input type="hidden" name={name} value={value} />
      {showLabel && (
        <label
          htmlFor={id}
          className={cn("mb-1.5 block text-xs font-medium", labelClassName ?? "text-white/55")}
        >
          {fieldLabel}
        </label>
      )}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(controlClass, open && "border-brand-pink/40")}
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
          aria-label={fieldLabel}
          className="absolute z-50 mt-1.5 w-full min-w-0 max-h-60 origin-top overflow-y-auto overflow-x-hidden rounded-2xl border border-brand-violet/12 bg-white p-1.5 shadow-[0_16px_50px_rgba(26,16,53,0.18),0_0_0_1px_rgba(61,43,142,0.06)]"
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li key={opt.value || "__all"} className="list-none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium",
                    "text-text-primary",
                    "transition-colors",
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
